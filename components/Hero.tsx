"use client";

import React from "react";
import Image from "next/image";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { cosmicAudio } from "@/lib/audio";
import { ArrowRight, ChevronDown, User, Sparkles, Award } from "lucide-react";

interface HeroProps {
  onExploreWork: () => void;
  onMoreAboutMe: () => void;
}

export default function Hero({ onExploreWork, onMoreAboutMe }: HeroProps) {
  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-4 sm:px-6 md:px-16 pt-20 pb-8 pointer-events-none">
      {/* Left-aligned hero content with split layout (right side leaves space for 3D Syed portal) */}
      <div className="max-w-xl md:max-w-2xl mt-4 sm:mt-8 md:mt-12 pointer-events-auto bg-[#071115]/85 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none p-5 sm:p-0 rounded-2xl border border-[#16382D]/70 sm:border-0 shadow-2xl sm:shadow-none">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center space-x-2 text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] text-[#D9B45A] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
          <span>{PORTFOLIO_CONTENT.hero.eyebrow}</span>
        </div>

        {/* Two-tone headline with eye-catching Syne typography */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.98] mb-5 tracking-tight">
          <span className="block text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.15)]">
            {PORTFOLIO_CONTENT.hero.headlineLine1}
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#D9B45A] via-[#FCE38A] to-[#D9B45A] drop-shadow-[0_2px_22px_rgba(217,180,90,0.35)]">
            {PORTFOLIO_CONTENT.hero.headlineLine2}
          </span>
        </h1>

        {/* Sub-copy with Plus Jakarta Sans */}
        <p className="text-sm sm:text-base md:text-lg text-[#BAC7D5] leading-relaxed max-w-lg mb-6 font-sans font-normal">
          {PORTFOLIO_CONTENT.hero.subCopy}
        </p>

        {/* Interactive Profile Picture HUD Mini-Badge */}
        <div className="flex items-center space-x-3.5 p-2.5 pr-4 rounded-xl border border-[#184235] bg-[#08181D]/90 backdrop-blur-md mb-8 max-w-fit shadow-lg">
          <div className="relative w-12 h-14 rounded-lg overflow-hidden border border-[#39FF14]/80 shadow-[0_0_12px_rgba(57,255,20,0.35)] shrink-0 bg-[#09221A]">
            <Image
              src="/assets/aistudio/Muaviz_e241b88f.jpg"
              alt="Syed Muaviz ur Rehman Profile"
              fill
              className="object-cover object-top"
              sizes="48px"
              priority
              referrerPolicy="no-referrer"
            />
            {/* Holographic scanline sheen */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#39FF14]/15 to-transparent pointer-events-none" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-heading font-bold text-white tracking-wide">
                Syed Muaviz ur Rehman
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
            </div>
            <div className="text-[11px] font-mono text-[#7A8A8F] flex items-center space-x-1.5 mt-0.5">
              <Award size={11} className="text-[#D9B45A]" />
              <span className="text-[#D9B45A]">Honhaar Scholar</span>
              <span className="text-[#1D4A3D]">·</span>
              <span>BSCS 3.90</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3.5 mb-8">
          <button
            onClick={() => {
              cosmicAudio.playChirp("whoosh");
              onExploreWork();
            }}
            className="group inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#D9B45A] to-[#E5C368] text-[#050B0D] font-heading font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-200 hover:shadow-[0_0_28px_rgba(217,180,90,0.55)] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]"
          >
            <span>{PORTFOLIO_CONTENT.hero.primaryCTA}</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-150"
            />
          </button>

          <button
            onClick={() => {
              cosmicAudio.playChirp("hover");
              onMoreAboutMe();
            }}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-full border border-[#234A3E] bg-[#081512]/60 hover:border-[#39FF14] text-[#E2E8F0] hover:text-[#39FF14] text-xs md:text-sm font-heading font-medium tracking-wide transition-all duration-150 backdrop-blur-sm"
          >
            <User size={15} />
            <span>{PORTFOLIO_CONTENT.hero.secondaryCTA}</span>
          </button>
        </div>

        {/* Center Portal indicator for mobile */}
        <div className="md:hidden inline-block px-3 py-1.5 rounded border border-[#16382D] bg-[#071511]/80 text-[10px] font-mono text-[#7A8A8F]">
          <span className="text-[#39FF14]">●</span> Center: Syed Muaviz ur Rehman · 6 Orbiting Projects
        </div>
      </div>

      {/* Footer Tags & Scroll hint */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between pt-6 border-t border-[#142A27]/60 pointer-events-auto">
        {/* Footer tags */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-[#7A8A8F]">
          {PORTFOLIO_CONTENT.hero.footerTags.map((tag, idx) => (
            <span key={tag} className="flex items-center space-x-2">
              <span className="text-[#39FF14]/70">#</span>
              <span className="hover:text-white transition-colors">{tag}</span>
              {idx < PORTFOLIO_CONTENT.hero.footerTags.length - 1 && (
                <span className="text-[#203D34] mx-1">·</span>
              )}
            </span>
          ))}
        </div>

        {/* Scroll hint with animated icon */}
        <button
          onClick={() => {
            cosmicAudio.playChirp("whoosh");
            onExploreWork();
          }}
          className="mt-4 md:mt-0 flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-[#BAC7D5] hover:text-[#D9B45A] transition-colors group cursor-pointer"
        >
          <div className="w-4 h-7 rounded-full border border-[#BAC7D5]/40 flex items-start justify-center p-1 group-hover:border-[#D9B45A]">
            <div className="w-1 h-2 rounded-full bg-[#D9B45A] animate-bounce" />
          </div>
          <span>{PORTFOLIO_CONTENT.hero.scrollHint}</span>
          <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
