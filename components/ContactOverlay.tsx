"use client";

import React, { useState, useEffect } from "react";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { cosmicAudio } from "@/lib/audio";
import {
  X,
  Mail,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Github,
  Linkedin,
  GraduationCap,
  Sparkles,
} from "lucide-react";

interface ContactOverlayProps {
  onClose: () => void;
}

export default function ContactOverlay({ onClose }: ContactOverlayProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const { contact } = PORTFOLIO_CONTENT;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    cosmicAudio.playChirp("select");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-40 bg-[#050B0D]/85 backdrop-blur-md overflow-y-auto flex justify-center p-4 md:p-8 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-heading"
    >
      <div className="relative w-full max-w-2xl bg-[#08151A]/95 border border-[#16382D] rounded-xl shadow-2xl p-6 md:p-10 my-auto text-[#BAC7D5]">
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-[#142E26]">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#D9B45A] mb-1">
              Communication & Opportunities
            </div>
            <h2 id="contact-heading" className="text-2xl md:text-4xl font-bold text-white tracking-tight">
              {contact.heading}
            </h2>
          </div>
          <button
            onClick={() => {
              cosmicAudio.playChirp("whoosh");
              onClose();
            }}
            className="p-2 rounded-lg border border-[#1A3A30] text-[#BAC7D5] hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close Contact overlay"
          >
            <X size={20} />
          </button>
        </div>

        {/* Copy */}
        <p className="mt-6 text-base md:text-lg text-[#E2E8F0] leading-relaxed font-sans font-light">
          {contact.copy}
        </p>

        {/* Primary Contact Cards */}
        <div className="mt-8 space-y-4">
          {/* Email card */}
          <div className="p-4 rounded-lg border border-[#183E31] bg-[#071B20]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-[#0F352A] text-[#39FF14]">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-[11px] font-mono text-[#7A8A8F] uppercase">Email Address</div>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-white font-mono text-sm md:text-base hover:text-[#D9B45A] transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-md border border-[#1E4D3E] hover:border-[#39FF14] bg-[#09221A] text-xs font-mono text-[#39FF14] flex items-center space-x-1.5 transition-all"
                aria-label="Copy email address"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <a
                href={`mailto:${contact.email}`}
                className="px-3.5 py-1.5 rounded-md bg-[#D9B45A] hover:bg-[#FFE394] text-[#050B0D] font-semibold text-xs font-mono tracking-wider uppercase transition-colors"
              >
                Send Email
              </a>
            </div>
          </div>

          {/* Location card */}
          <div className="p-4 rounded-lg border border-[#16382D] bg-[#07181D]/60 flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-[#0F352A] text-[#D9B45A]">
              <MapPin size={18} />
            </div>
            <div>
              <div className="text-[11px] font-mono text-[#7A8A8F] uppercase">Location</div>
              <div className="text-white font-medium text-sm md:text-base">
                {contact.location}
              </div>
            </div>
          </div>
        </div>

        {/* Profiles & CV Download Links */}
        <div className="mt-8 pt-6 border-t border-[#142E26]">
          <div className="text-xs font-mono uppercase tracking-widest text-[#D9B45A] mb-3">
            Scholarly Profiles & Documents
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contact.links.map((link, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-dashed border-[#1C4135] bg-[#08181D] flex items-center justify-between"
              >
                <div className="flex items-center space-x-2.5">
                  {idx === 0 ? (
                    <Linkedin size={16} className="text-[#39FF14]" />
                  ) : idx === 1 ? (
                    <Github size={16} className="text-[#39FF14]" />
                  ) : idx === 2 ? (
                    <GraduationCap size={16} className="text-[#39FF14]" />
                  ) : (
                    <FileText size={16} className="text-[#39FF14]" />
                  )}
                  <span className="text-xs font-mono text-white">{link.label}</span>
                </div>
                <span className="text-[10px] font-mono text-[#D9B45A] bg-[#0D241C] px-2 py-0.5 rounded border border-[#194637]">
                  {link.note}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs font-mono text-[#7A8A8F]">
            {contact.note}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#142E26] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#7A8A8F]">
          <span>{contact.footer}</span>
          <button
            onClick={() => {
              cosmicAudio.playChirp("whoosh");
              onClose();
            }}
            className="text-[#D9B45A] hover:underline"
          >
            Close Contact [Esc]
          </button>
        </div>
      </div>
    </div>
  );
}
