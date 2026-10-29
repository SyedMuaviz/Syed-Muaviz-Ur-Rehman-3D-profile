"use client";

import React, { useState, useEffect, useCallback, useTransition } from "react";
import CosmicCanvas, { ProjectedPlanet } from "@/components/CosmicCanvas";
import HUD from "@/components/HUD";
import Hero from "@/components/Hero";
import DetailPanel from "@/components/DetailPanel";
import AboutOverlay from "@/components/AboutOverlay";
import SkillsOverlay from "@/components/SkillsOverlay";
import ContactOverlay from "@/components/ContactOverlay";
import ClassicView from "@/components/ClassicView";
import PlanetTooltip from "@/components/PlanetTooltip";
import PlanetLabelsOverlay from "@/components/PlanetLabelsOverlay";
import { PORTFOLIO_CONTENT, PlanetProject } from "@/lib/content";
import { getNextPlanetId, getPrevPlanetId } from "@/lib/rules";
import { cosmicAudio } from "@/lib/audio";

export default function PortfolioPage() {
  const [currentScene, setCurrentScene] = useState<"hero" | "solar" | "planet">("hero");
  const [activePlanetId, setActivePlanetId] = useState<string | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<"about" | "skills" | "contact" | null>(null);
  const [isClassicView, setIsClassicView] = useState(false);
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetProject | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | undefined>(undefined);
  const [projectedPlanets, setProjectedPlanets] = useState<ProjectedPlanet[]>([]);

  // Check prefers-reduced-motion or webgl availability on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setIsClassicView(true);
      }
    }
  }, []);

  // Wheel / Inertial scroll transition between Hero and Solar views
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout | null = null;
    const handleWheel = (e: WheelEvent) => {
      // Don't trigger if an overlay is open or inside a scrolled panel
      if (activeOverlay || isClassicView) return;

      if (wheelTimeout) return;
      wheelTimeout = setTimeout(() => {
        wheelTimeout = null;
      }, 500);

      if (e.deltaY > 35) {
        // Scrolling down moves from hero to solar view
        if (currentScene === "hero") {
          cosmicAudio.playChirp("whoosh");
          setCurrentScene("solar");
        }
      } else if (e.deltaY < -35) {
        // Scrolling up moves from solar to hero view
        if (currentScene === "solar") {
          cosmicAudio.playChirp("whoosh");
          setCurrentScene("hero");
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentScene, activeOverlay, isClassicView]);

  // Handle planet selection (clicks from 3D or HUD)
  const handleSelectPlanet = useCallback((planetId: string) => {
    cosmicAudio.playChirp("select");
    setActivePlanetId(planetId);
    setCurrentScene("planet");
  }, []);

  // Handle next / prev planet navigation in Detail mode
  const planetIds = PORTFOLIO_CONTENT.planets.map((p) => p.id);

  const handleNextPlanet = useCallback(() => {
    if (!activePlanetId) return;
    const nextId = getNextPlanetId(activePlanetId, planetIds);
    setActivePlanetId(nextId);
  }, [activePlanetId, planetIds]);

  const handlePrevPlanet = useCallback(() => {
    if (!activePlanetId) return;
    const prevId = getPrevPlanetId(activePlanetId, planetIds);
    setActivePlanetId(prevId);
  }, [activePlanetId, planetIds]);

  const handleCloseDetail = useCallback(() => {
    setCurrentScene("solar");
    setActivePlanetId(null);
  }, []);

  const selectedPlanet = PORTFOLIO_CONTENT.planets.find((p) => p.id === activePlanetId) || null;

  return (
    <main className="relative w-full min-h-screen bg-[#070F13] text-[#BAC7D5] overflow-x-hidden font-sans select-none">
      {/* 3D WebGL Canvas Layer (Active unless classic view is toggled) */}
      {!isClassicView && (
        <CosmicCanvas
          currentScene={currentScene}
          activePlanetId={activePlanetId}
          onSelectPlanet={handleSelectPlanet}
          onHoverPlanet={(planet, pos) => {
            setHoveredPlanet(planet);
            setMousePos(pos);
          }}
          onUpdatePlanetPositions={(positions) => {
            setProjectedPlanets(positions);
          }}
        />
      )}

      {/* Orbit labels beneath each planet in Solar view */}
      {!isClassicView && currentScene === "solar" && (
        <PlanetLabelsOverlay
          planets={projectedPlanets}
          onSelectPlanet={handleSelectPlanet}
          activePlanetId={activePlanetId}
        />
      )}

      {/* Hover tooltip for hovered planet in 3D orbit */}
      {!isClassicView && currentScene === "solar" && (
        <PlanetTooltip planet={hoveredPlanet} pos={mousePos} />
      )}

      {/* Main Persistent HUD (Header wordmark, nav, sound toggle, hints) */}
      <HUD
        currentScene={currentScene}
        activePlanetId={activePlanetId}
        onNavigateScene={(scene) => {
          setCurrentScene(scene);
          if (scene === "hero") setActivePlanetId(null);
        }}
        onSelectPlanet={handleSelectPlanet}
        onOpenOverlay={(overlay) => setActiveOverlay(overlay)}
        onToggleClassicView={() => setIsClassicView((prev) => !prev)}
        isClassicView={isClassicView}
      />

      {/* Mode A: 3D Immersive Cosmos Layout */}
      {!isClassicView ? (
        <>
          {/* Scene 1: Hero View (Split layout with Syed on pedestal on right) */}
          {currentScene === "hero" && (
            <Hero
              onExploreWork={() => setCurrentScene("solar")}
              onMoreAboutMe={() => setActiveOverlay("about")}
            />
          )}

          {/* Scene 2 & 3: Planet Detail Panel when a planet is active */}
          {currentScene === "planet" && selectedPlanet && (
            <DetailPanel
              planet={selectedPlanet}
              onClose={handleCloseDetail}
              onPrev={handlePrevPlanet}
              onNext={handleNextPlanet}
            />
          )}
        </>
      ) : (
        /* Mode B: Accessible Classic 2D Grid Layout */
        <ClassicView
          onSelectProject={(id) => {
            setActivePlanetId(id);
            setIsClassicView(false);
            setCurrentScene("planet");
          }}
          onSwitchTo3D={() => setIsClassicView(false)}
        />
      )}

      {/* Scene 4: Modals / Overlays (About, Skills, Contact) */}
      {activeOverlay === "about" && (
        <AboutOverlay onClose={() => setActiveOverlay(null)} />
      )}
      {activeOverlay === "skills" && (
        <SkillsOverlay onClose={() => setActiveOverlay(null)} />
      )}
      {activeOverlay === "contact" && (
        <ContactOverlay onClose={() => setActiveOverlay(null)} />
      )}
    </main>
  );
}
