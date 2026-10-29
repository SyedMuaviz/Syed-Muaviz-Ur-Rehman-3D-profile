"use client";

import React from "react";
import { PlanetProject } from "@/lib/content";

interface PlanetTooltipProps {
  planet: PlanetProject | null;
  pos?: { x: number; y: number };
}

export default function PlanetTooltip({ planet, pos }: PlanetTooltipProps) {
  if (!planet || !pos) return null;

  return (
    <div
      className="fixed pointer-events-none z-30 transition-transform duration-75 ease-out"
      style={{
        left: `${pos.x + 16}px`,
        top: `${pos.y - 32}px`,
      }}
    >
      <div className="bg-[#081216]/90 border border-[#D9B45A]/50 px-3 py-1.5 rounded-sm shadow-xl backdrop-blur-md flex items-center space-x-2 text-xs">
        <span className="font-mono text-[#D9B45A] font-bold">{planet.serial}</span>
        <span className="text-white font-medium tracking-wide">{planet.name}</span>
        <span className="text-[#39FF14] text-[10px] tracking-wider uppercase font-mono">
          Click to inspect
        </span>
      </div>
    </div>
  );
}
