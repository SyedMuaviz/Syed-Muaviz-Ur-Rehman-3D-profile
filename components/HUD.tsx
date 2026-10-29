"use client";

import React, { useState } from "react";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { cosmicAudio } from "@/lib/audio";
import { Volume2, VolumeX, ArrowUp, Compass, Grid, Sparkles, Orbit } from "lucide-react";

interface HUDProps {
  currentScene: "hero" | "solar" | "planet";
  activePlanetId: string | null;
  onNavigateScene: (scene: "hero" | "solar" | "planet") => void;
  onSelectPlanet: (planetId: string) => void;
  onOpenOverlay: (overlay: "about" | "skills" | "contact" | null) => void;
  onToggleClassicView: () => void;
  isClassicView: boolean;
}

export default function HUD({
  currentScene,
  activePlanetId,
  onNavigateScene,
  onSelectPlanet,
  onOpenOverlay,
  onToggleClassicView,
  isClassicView,
}: HUDProps) {
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  const handleAudioToggle = () => {
    const muted = cosmicAudio.toggleMute();
    setIsAudioMuted(muted);
    if (!muted) {
      cosmicAudio.playChirp("hover");
    }
  };

  return (
    <header className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 md:p-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full">
        {/* Wordmark (top-left) */}
        <button
          onClick={() => {
            onOpenOverlay(null);
            onNavigateScene("hero");
          }}
          className="pointer-events-auto text-left group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D9B45A] shrink-0"
          aria-label="Return to home"
        >
          <div className="text-xs sm:text-sm md:text-base font-display font-bold tracking-tight uppercase text-[#D9B45A] group-hover:text-white transition-colors duration-200">
            {PORTFOLIO_CONTENT.meta.wordmark}
          </div>
          <div className="hidden sm:flex text-[10px] tracking-widest uppercase text-[#7A8A8F] font-mono items-center space-x-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] inline-block" />
            <span>AI Safety & ML Theory · 3D Cosmos HUD</span>
          </div>
        </button>

        {/* Top-Right Nav & Controls */}
        <nav
          className="pointer-events-auto flex items-center space-x-1 sm:space-x-2 md:space-x-4 text-[10px] sm:text-xs font-heading font-semibold uppercase tracking-wider text-[#BAC7D5]"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => {
              cosmicAudio.playChirp("hover");
              onNavigateScene("solar");
              onOpenOverlay(null);
            }}
            className={`px-1.5 sm:px-2.5 py-1 rounded transition-colors duration-150 hover:text-white hover:bg-white/5 ${
              currentScene !== "hero" ? "text-[#D9B45A] border-b border-[#D9B45A]" : ""
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => {
              cosmicAudio.playChirp("hover");
              onOpenOverlay("about");
            }}
            className="px-1.5 sm:px-2.5 py-1 rounded transition-colors duration-150 hover:text-white hover:bg-white/5"
          >
            About
          </button>
          <button
            onClick={() => {
              cosmicAudio.playChirp("hover");
              onOpenOverlay("skills");
            }}
            className="px-1.5 sm:px-2.5 py-1 rounded transition-colors duration-150 hover:text-white hover:bg-white/5"
          >
            Skills
          </button>
          <button
            onClick={() => {
              cosmicAudio.playChirp("hover");
              onOpenOverlay("contact");
            }}
            className="px-1.5 sm:px-2.5 py-1 rounded transition-colors duration-150 hover:text-white hover:bg-white/5"
          >
            Contact
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleAudioToggle}
            className="p-1.5 rounded border border-[#223838] bg-[#0A161A]/80 hover:border-[#D9B45A] text-[#D9B45A] transition-colors"
            title={isAudioMuted ? "Unmute cosmic ambience" : "Mute cosmic ambience"}
            aria-label={isAudioMuted ? "Unmute cosmic ambience" : "Mute cosmic ambience"}
          >
            {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {/* Classic View Toggle */}
          <button
            onClick={onToggleClassicView}
            className="hidden sm:flex items-center space-x-1.5 px-2 py-1 rounded border border-[#223838] bg-[#0A161A]/80 hover:border-[#39FF14] text-[#BAC7D5] hover:text-[#39FF14] transition-colors text-[11px]"
            title="Toggle between 3D Cosmos and Accessible Grid view"
          >
            {isClassicView ? <Orbit size={13} /> : <Grid size={13} />}
            <span>{isClassicView ? "3D Cosmos" : "Classic View"}</span>
          </button>
        </nav>
      </div>

      {/* Bottom Bar / HUD Controls (Only active in 3D Cosmos mode) */}
      {!isClassicView && (
        <div className="flex items-end justify-between w-full">
          {/* Bottom-left: View Mode Indicator or Quick Planet Selector in Orbit mode */}
          <div className="pointer-events-auto">
          {currentScene === "solar" && (
            <div className="bg-[#081216]/90 border border-[#16382D] rounded-md p-2 backdrop-blur-md hidden sm:flex items-center space-x-2">
              <span className="text-[10px] font-mono uppercase text-[#7A8A8F] tracking-wider mr-1">
                Planets:
              </span>
              {PORTFOLIO_CONTENT.planets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    cosmicAudio.playChirp("select");
                    onSelectPlanet(p.id);
                  }}
                  className={`px-2 py-1 text-xs font-mono rounded border transition-all flex items-center space-x-1 ${
                    activePlanetId === p.id
                      ? "border-[#D9B45A] bg-[#D9B45A]/20 text-white font-bold"
                      : "border-transparent hover:border-[#D9B45A] hover:bg-[#D9B45A]/10 text-white/80 hover:text-white"
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ backgroundColor: p.colorHex }}
                  />
                  <span>{p.serial}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bottom-right: Solar System Hint and Return to Hero Button */}
        <div className="pointer-events-auto flex flex-col items-end space-y-3">
          {currentScene !== "hero" && (
            <div className="flex items-center space-x-3">
              <span className="text-[11px] font-mono tracking-wider text-[#BAC7D5] bg-[#081216]/80 px-3 py-1.5 rounded border border-[#18362B] hidden sm:inline-block">
                {PORTFOLIO_CONTENT.hud.solarSystemHint}
              </span>
              <button
                onClick={() => {
                  cosmicAudio.playChirp("whoosh");
                  onNavigateScene("hero");
                }}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-full border border-[#D9B45A]/70 bg-[#081216]/90 hover:bg-[#D9B45A] hover:text-[#050B0D] text-[#D9B45A] transition-all duration-200 shadow-lg text-xs font-mono uppercase tracking-widest"
                aria-label="Return to hero view"
              >
                <ArrowUp size={14} />
                <span>{PORTFOLIO_CONTENT.hud.returnToHero}</span>
              </button>
            </div>
          )}

          {/* Footer View Toggle on mobile */}
          <div className="sm:hidden">
            <button
              onClick={onToggleClassicView}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded border border-[#223838] bg-[#0A161A]/90 text-[#BAC7D5] text-[11px] font-mono"
            >
              {isClassicView ? <Orbit size={13} /> : <Grid size={13} />}
              <span>{isClassicView ? "Cosmic 3D" : "Classic View"}</span>
            </button>
          </div>
        </div>
      </div>
      )}
    </header>
  );
}
