"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { cosmicAudio } from "@/lib/audio";
import { X, Award, GraduationCap, Compass, BookOpen, CheckCircle2, Sparkles } from "lucide-react";

interface AboutOverlayProps {
  onClose: () => void;
}

export default function AboutOverlay({ onClose }: AboutOverlayProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const { about } = PORTFOLIO_CONTENT;

  return (
    <div
      className="fixed inset-0 z-40 bg-[#050B0D]/85 backdrop-blur-md overflow-y-auto flex justify-center p-4 md:p-8 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-heading"
    >
      <div className="relative w-full max-w-4xl bg-[#08151A]/95 border border-[#16382D] rounded-2xl shadow-2xl p-6 md:p-10 my-auto text-[#BAC7D5]">
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-[#142E26]">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#D9B45A] mb-1">
              Researcher Dossier
            </div>
            <h2 id="about-heading" className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight">
              {about.heading}
            </h2>
          </div>
          <button
            onClick={() => {
              cosmicAudio.playChirp("whoosh");
              onClose();
            }}
            className="p-2 rounded-lg border border-[#1A3A30] text-[#BAC7D5] hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close About overlay"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Card & Bio Section */}
        <div className="mt-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Profile Picture Card */}
          <div className="relative shrink-0 mx-auto md:mx-0 group">
            {/* Arched Holographic Frame */}
            <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#39FF14]/80 shadow-[0_0_24px_rgba(57,255,20,0.3)] bg-gradient-to-b from-[#09221A] to-[#040E0B]">
              <Image
                src="/assets/aistudio/Muaviz_e241b88f.jpg"
                alt="Syed Muaviz ur Rehman Portrait"
                fill
                className="object-cover object-top filter contrast-[1.04]"
                sizes="180px"
                priority
                referrerPolicy="no-referrer"
              />
              {/* Soft emerald atmosphere gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#061814] via-transparent to-transparent pointer-events-none" />
              {/* Neon green rim highlight */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-[#39FF14] shadow-[0_0_8px_#39FF14]" />
            </div>

            {/* Central Sun Tag */}
            <div className="mt-2.5 text-center">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#0D241C] border border-[#1E4D3E] text-[10px] font-mono text-[#39FF14]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                <span>Cosmic Sun · Syed</span>
              </span>
            </div>
          </div>

          {/* Bio & Academic Badges */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0F3B2E]/70 border border-[#39FF14]/50 text-[#39FF14] text-xs font-mono font-medium">
                <Award size={13} />
                <span>{about.honhaarBadge}</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#182618]/70 border border-[#D9B45A]/50 text-[#D9B45A] text-xs font-mono font-medium">
                <GraduationCap size={13} />
                <span>{about.cgpaBadge}</span>
              </span>
            </div>

            <p className="text-base md:text-lg text-[#E2E8F0] leading-relaxed font-sans font-light">
              {about.bio}
            </p>
          </div>
        </div>

        {/* Research Interests (4 Cards) */}
        <div className="mt-10">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#D9B45A] mb-4 flex items-center space-x-2">
            <Compass size={14} className="text-[#39FF14]" />
            <span>Core Research Directions</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {about.interests.map((interest, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-[#16382D] bg-[#07191E]/60 hover:border-[#D9B45A]/70 transition-all group"
              >
                <div className="text-xs font-mono text-[#39FF14] mb-1.5 font-bold">0{idx + 1}</div>
                <h4 className="text-base font-heading font-bold text-white mb-2 group-hover:text-[#D9B45A] transition-colors">
                  {interest.title}
                </h4>
                <p className="text-xs md:text-sm text-[#BAC7D5] leading-relaxed font-sans">
                  {interest.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education, Honors & Service Timeline */}
        <div className="mt-10 pt-8 border-t border-[#142E26]">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#D9B45A] mb-6 flex items-center space-x-2">
            <BookOpen size={14} className="text-[#39FF14]" />
            <span>Education, Honors & Academic Service</span>
          </h3>

          <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-[#16382D]">
            {about.timeline.map((item, idx) => (
              <div key={idx} className="relative pl-8 group">
                <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#08151A] border-2 border-[#D9B45A] group-hover:border-[#39FF14] transition-colors" />
                <div className="text-xs font-mono text-[#D9B45A] font-semibold tracking-wider">
                  {item.when}
                </div>
                <div className="text-sm md:text-base text-white font-medium mt-0.5 leading-snug font-sans">
                  {item.what}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button Bottom */}
        <div className="mt-10 pt-6 border-t border-[#142E26] flex justify-end">
          <button
            onClick={() => {
              cosmicAudio.playChirp("whoosh");
              onClose();
            }}
            className="px-6 py-2.5 rounded-full bg-[#16382D] hover:bg-[#D9B45A] hover:text-[#050B0D] text-white text-xs font-heading font-bold uppercase tracking-widest transition-colors"
          >
            Close Profile [Esc]
          </button>
        </div>
      </div>
    </div>
  );
}
