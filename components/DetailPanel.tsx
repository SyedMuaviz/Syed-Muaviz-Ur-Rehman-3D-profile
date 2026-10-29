"use client";

import React, { useEffect } from "react";
import { PlanetProject } from "@/lib/content";
import { cosmicAudio } from "@/lib/audio";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Code,
  Calendar,
  Layers,
  Sparkles,
  Bookmark,
} from "lucide-react";

interface DetailPanelProps {
  planet: PlanetProject;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function DetailPanel({
  planet,
  onClose,
  onPrev,
  onNext,
}: DetailPanelProps) {
  // Keyboard navigation for panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <aside
      className="fixed inset-x-0 bottom-0 top-auto max-h-[85vh] md:inset-y-0 md:right-0 md:left-auto md:top-0 md:max-h-full z-30 w-full md:w-[480px] lg:w-[540px] bg-[#071317]/95 border-t md:border-t-0 md:border-l border-[#1D3B33] rounded-t-2xl md:rounded-none backdrop-blur-xl shadow-2xl flex flex-col justify-between p-5 md:p-8 overflow-y-auto animate-in duration-300"
      aria-label={`Project details for ${planet.name}`}
    >
      {/* Mobile drag handle indicator */}
      <div className="md:hidden w-12 h-1 bg-[#1A3830] rounded-full mx-auto mb-3" />

      <div>
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#142A25]">
          <div className="flex items-center space-x-3">
            <span
              className="w-3 h-3 rounded-full inline-block shadow-sm"
              style={{ backgroundColor: planet.colorHex }}
            />
            <span className="font-mono text-sm tracking-widest text-[#D9B45A] font-bold">
              PLANET {planet.serial} / 06
            </span>
            <span className="text-xs font-mono text-[#7A8A8F] uppercase">
              {planet.colorName}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Prev / Next buttons */}
            <button
              onClick={() => {
                cosmicAudio.playChirp("hover");
                onPrev();
              }}
              className="p-1.5 rounded border border-[#1A3830] text-[#BAC7D5] hover:text-[#D9B45A] hover:border-[#D9B45A] transition-colors"
              title="Previous project (Left arrow)"
              aria-label="Previous project"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => {
                cosmicAudio.playChirp("hover");
                onNext();
              }}
              className="p-1.5 rounded border border-[#1A3830] text-[#BAC7D5] hover:text-[#D9B45A] hover:border-[#D9B45A] transition-colors"
              title="Next project (Right arrow)"
              aria-label="Next project"
            >
              <ChevronRight size={16} />
            </button>

            {/* Close button */}
            <button
              onClick={() => {
                cosmicAudio.playChirp("whoosh");
                onClose();
              }}
              className="p-1.5 rounded border border-[#1A3830] text-[#BAC7D5] hover:text-white hover:bg-white/10 transition-colors ml-1"
              title="Close panel (Esc)"
              aria-label="Close project panel"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Date & Type metadata */}
        <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px] font-mono text-[#7A8A8F]">
          <span className="inline-flex items-center space-x-1 bg-[#091D17] text-[#39FF14] px-2.5 py-0.5 rounded border border-[#143B2D]">
            <Calendar size={11} />
            <span>{planet.date}</span>
          </span>
          <span className="bg-[#0A161A] text-[#BAC7D5] px-2.5 py-0.5 rounded border border-[#1B2F38]">
            {planet.type}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mt-4 mb-2 tracking-tight leading-snug">
          {planet.name}
        </h2>

        {/* Tagline */}
        <p className="text-sm md:text-base font-serif italic text-[#D9B45A] border-l-2 border-[#D9B45A] pl-3 py-1.5 my-4 bg-[#D9B45A]/5">
          &ldquo;{planet.tagline}&rdquo;
        </p>

        {/* Overview */}
        <div className="mt-5">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#7A8A8F] mb-2 flex items-center space-x-1.5">
            <Bookmark size={12} className="text-[#39FF14]" />
            <span>Research Overview</span>
          </h3>
          <p className="text-sm text-[#BAC7D5] leading-relaxed font-sans font-light">
            {planet.overview}
          </p>
        </div>

        {/* Key Highlights */}
        <div className="mt-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#7A8A8F] mb-2.5 flex items-center space-x-1.5">
            <Sparkles size={12} className="text-[#D9B45A]" />
            <span>Key Highlights & Contributions</span>
          </h3>
          <ul className="space-y-2 text-sm text-[#E2E8F0]">
            {planet.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start space-x-2.5 leading-relaxed">
                <span className="text-[#39FF14] font-mono text-xs mt-0.5">▸</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies & Frameworks */}
        <div className="mt-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#7A8A8F] mb-2.5 flex items-center space-x-1.5">
            <Code size={12} className="text-[#39FF14]" />
            <span>Methodologies & Stack</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {planet.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-mono rounded bg-[#091C16] text-[#A7F3D0] border border-[#144233]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Project Links & External Resources */}
        {planet.links && planet.links.length > 0 && (
          <div className="mt-8 pt-5 border-t border-[#142A25]">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#7A8A8F] mb-3">
              Publications & Resources
            </h3>
            <div className="flex flex-wrap gap-3">
              {planet.links.map((link, idx) => (
                <div key={idx} className="flex items-center">
                  {link.url ? (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-md bg-[#D9B45A] hover:bg-[#FFE394] text-[#050B0D] font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
                    >
                      <span>{link.label}</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <div
                      className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-md border border-dashed border-[#D9B45A]/50 bg-[#0A161A] text-[#D9B45A] text-xs font-mono"
                      title="Placeholder link — add your actual URL in content.ts"
                    >
                      <span>{link.label}</span>
                      <span className="text-[10px] text-[#7A8A8F] uppercase bg-black/40 px-1 py-0.5 rounded">
                        Placeholder
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="pt-6 mt-6 border-t border-[#142A25] flex items-center justify-between text-xs font-mono text-[#7A8A8F]">
        <span>Use ← / → keys to browse planets</span>
        <button
          onClick={() => {
            cosmicAudio.playChirp("whoosh");
            onClose();
          }}
          className="text-[#D9B45A] hover:underline"
        >
          Return to orbit view [Esc]
        </button>
      </div>
    </aside>
  );
}
