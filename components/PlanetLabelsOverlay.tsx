"use client";

import React from "react";
import { ProjectedPlanet } from "./CosmicCanvas";
import { cosmicAudio } from "@/lib/audio";

interface PlanetLabelsOverlayProps {
  planets: ProjectedPlanet[];
  onSelectPlanet: (planetId: string) => void;
  activePlanetId: string | null;
}

export default function PlanetLabelsOverlay({
  planets,
  onSelectPlanet,
  activePlanetId,
}: PlanetLabelsOverlayProps) {
  if (!planets || planets.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {planets.map((p) => {
        if (!p.visible) return null;

        const isSelected = activePlanetId === p.id;

        return (
          <div
            key={p.id}
            className="absolute transform -translate-x-1/2 flex flex-col items-center pointer-events-auto cursor-pointer group transition-transform duration-75"
            style={{
              left: `${p.x}px`,
              top: `${p.y + 24}px`, // position beneath planet
            }}
            onClick={() => {
              cosmicAudio.playChirp("select");
              onSelectPlanet(p.id);
            }}
          >
            {/* Small serial number in dim gray (#7A8A8F) */}
            <span className="text-[10px] font-mono text-[#7A8A8F] tracking-widest font-semibold group-hover:text-[#D9B45A] transition-colors">
              {p.serial}
            </span>

            {/* White label beneath it */}
            <span
              className={`text-xs tracking-wide px-2 py-0.5 rounded backdrop-blur-sm transition-all duration-150 whitespace-nowrap ${
                isSelected
                  ? "text-[#D9B45A] font-bold bg-[#0A181E]/80 border border-[#D9B45A]/50 shadow-sm"
                  : "text-white/90 font-medium bg-[#050C0E]/60 border border-transparent group-hover:border-[#39FF14]/40 group-hover:text-white group-hover:bg-[#07151B]/80"
              }`}
            >
              {p.name.length > 28 ? p.name.slice(0, 26) + "…" : p.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
