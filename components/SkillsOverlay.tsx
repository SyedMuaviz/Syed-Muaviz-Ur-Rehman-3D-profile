"use client";

import React, { useEffect } from "react";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { cosmicAudio } from "@/lib/audio";
import { X, Sparkles, Award, CheckCircle2, ShieldCheck } from "lucide-react";

interface SkillsOverlayProps {
  onClose: () => void;
}

export default function SkillsOverlay({ onClose }: SkillsOverlayProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const { skills } = PORTFOLIO_CONTENT;

  return (
    <div
      className="fixed inset-0 z-40 bg-[#050B0D]/85 backdrop-blur-md overflow-y-auto flex justify-center p-4 md:p-8 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="skills-heading"
    >
      <div className="relative w-full max-w-4xl bg-[#08151A]/95 border border-[#16382D] rounded-xl shadow-2xl p-6 md:p-10 my-auto text-[#BAC7D5]">
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-[#142E26]">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#D9B45A] mb-1">
              Methodological Rigor & Technical Stack
            </div>
            <h2 id="skills-heading" className="text-2xl md:text-4xl font-bold text-white tracking-tight">
              {skills.heading}
            </h2>
            <p className="text-sm text-[#BAC7D5] mt-1 font-light">{skills.subheading}</p>
          </div>
          <button
            onClick={() => {
              cosmicAudio.playChirp("whoosh");
              onClose();
            }}
            className="p-2 rounded-lg border border-[#1A3A30] text-[#BAC7D5] hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close Skills overlay"
          >
            <X size={20} />
          </button>
        </div>

        {/* Grouped Constellations */}
        <div className="mt-8 space-y-8">
          {skills.constellations.map((constellation, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg border border-[#15342A] bg-[#07181D]/60 hover:border-[#D9B45A]/50 transition-colors"
            >
              <div className="flex items-center space-x-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#39FF14]" />
                <h3 className="text-sm font-mono uppercase tracking-widest text-[#D9B45A] font-semibold">
                  Constellation {idx + 1} · {constellation.category}
                </h3>
              </div>

              {/* Star Nodes */}
              <div className="flex flex-wrap gap-2.5">
                {constellation.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#091D17] border border-[#1B4738] text-white text-xs font-mono hover:border-[#39FF14] transition-colors"
                  >
                    <span className="text-[#39FF14] text-[10px]">✦</span>
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Badge Row */}
        <div className="mt-10 pt-8 border-t border-[#142E26]">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#D9B45A] mb-4 flex items-center space-x-2">
            <Award size={15} className="text-[#39FF14]" />
            <span>Verified Certifications & Accreditations</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {skills.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-[#1A3A30] bg-[#0A1A20]/70 flex flex-col justify-between"
              >
                <div className="flex items-start space-x-2">
                  <ShieldCheck size={16} className="text-[#39FF14] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-white leading-snug">
                      {cert.title}
                    </h4>
                    <p className="text-[11px] text-[#7A8A8F] font-mono mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
                {cert.date && (
                  <div className="mt-3 text-[10px] font-mono text-[#D9B45A] self-end">
                    {cert.date}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Close */}
        <div className="mt-10 pt-6 border-t border-[#142E26] flex justify-end">
          <button
            onClick={() => {
              cosmicAudio.playChirp("whoosh");
              onClose();
            }}
            className="px-6 py-2.5 rounded-full bg-[#16382D] hover:bg-[#D9B45A] hover:text-[#050B0D] text-white text-xs font-mono uppercase tracking-widest transition-colors"
          >
            Close Skills [Esc]
          </button>
        </div>
      </div>
    </div>
  );
}
