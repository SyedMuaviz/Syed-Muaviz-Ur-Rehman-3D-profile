"use client";

import React from "react";
import Image from "next/image";
import { PORTFOLIO_CONTENT, PlanetProject } from "@/lib/content";
import {
  ExternalLink,
  Calendar,
  Sparkles,
  Code,
  Award,
  GraduationCap,
  Mail,
  MapPin,
  CheckCircle2,
  Orbit,
} from "lucide-react";

interface ClassicViewProps {
  onSelectProject: (planetId: string) => void;
  onSwitchTo3D: () => void;
}

export default function ClassicView({ onSelectProject, onSwitchTo3D }: ClassicViewProps) {
  const { hero, planets, about, skills, contact } = PORTFOLIO_CONTENT;

  return (
    <div className="relative z-10 w-full min-h-screen bg-[#071013] text-[#BAC7D5] py-20 px-4 sm:px-8 md:px-16 max-w-6xl mx-auto">
      {/* View Switch Banner */}
      <div className="mb-12 p-4 rounded-xl border border-[#16382D] bg-[#0A181E] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14]" />
          <span className="text-sm font-mono text-white">
            Accessible Classic Mode active (2D high-contrast layout)
          </span>
        </div>
        <button
          onClick={onSwitchTo3D}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#D9B45A] hover:bg-[#FFE394] text-[#050B0D] font-heading font-bold text-xs uppercase tracking-wider transition-all"
        >
          <Orbit size={14} />
          <span>Launch 3D Cosmos View</span>
        </button>
      </div>

      {/* Hero Header with Profile Picture */}
      <section className="mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#D9B45A] mb-3">
            {hero.eyebrow}
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-4 leading-tight">
            {hero.headlineLine1}{" "}
            <span className="text-[#D9B45A]">{hero.headlineLine2}</span>
          </h1>
          <p className="text-base md:text-xl text-[#BAC7D5] max-w-2xl font-light leading-relaxed">
            {hero.subCopy}
          </p>
        </div>

        {/* Profile Card */}
        <div className="relative w-36 h-44 sm:w-44 sm:h-52 rounded-2xl overflow-hidden border-2 border-[#39FF14]/80 shadow-[0_0_24px_rgba(57,255,20,0.3)] bg-[#09221A] shrink-0">
          <Image
            src="/assets/aistudio/Muaviz_e241b88f.jpg"
            alt="Syed Muaviz ur Rehman Profile Photo"
            fill
            className="object-cover object-top"
            sizes="176px"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 py-1 bg-[#061814]/90 text-center border-t border-[#16382D]">
            <span className="text-[10px] font-mono text-[#D9B45A]">Syed Muaviz</span>
          </div>
        </div>
      </section>

      {/* Projects Grid (The 6 Projects) */}
      <section className="mb-20" aria-label="Projects">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#142A25]">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Research & Applied Projects
          </h2>
          <span className="text-xs font-mono text-[#D9B45A]">6 Selected Works</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {planets.map((project) => (
            <article
              key={project.id}
              className="p-6 rounded-xl border border-[#17372D] bg-[#0A1A20] hover:border-[#D9B45A] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-[#D9B45A] font-bold">
                    PROJECT {project.serial}
                  </span>
                  <span className="text-[#7A8A8F]">{project.date}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                  {project.name}
                </h3>

                <p className="text-xs font-mono text-[#39FF14] mb-3">
                  {project.type}
                </p>

                <p className="text-sm font-serif italic text-[#D9B45A]/90 bg-[#D9B45A]/5 border-l-2 border-[#D9B45A] pl-3 py-1 mb-4">
                  &ldquo;{project.tagline}&rdquo;
                </p>

                <p className="text-sm text-[#BAC7D5] mb-5 leading-relaxed">
                  {project.overview}
                </p>

                <div className="mb-5">
                  <div className="text-xs font-mono text-[#7A8A8F] uppercase tracking-wider mb-2">
                    Key Highlights:
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#E2E8F0]">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-[#39FF14] font-mono">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs font-mono rounded bg-[#071D17] text-[#A7F3D0] border border-[#144233]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {project.links && project.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[#16382D]">
                    {project.links.map((link, lIdx) =>
                      link.url ? (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-[#D9B45A] hover:bg-[#FFE394] text-[#050B0D] font-semibold text-xs tracking-wider uppercase transition-colors"
                        >
                          <span>{link.label}</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span
                          key={lIdx}
                          className="px-2.5 py-1 rounded border border-dashed border-[#D9B45A]/50 text-xs font-mono text-[#D9B45A]"
                        >
                          {link.label}
                        </span>
                      )
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="mb-20" aria-label="About">
        <div className="mb-8 pb-3 border-b border-[#142A25]">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {about.heading}
          </h2>
        </div>

        <div className="p-6 md:p-8 rounded-xl border border-[#17372D] bg-[#0A1A20] mb-8">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0F3B2E]/70 border border-[#39FF14]/50 text-[#39FF14] text-xs font-mono">
              <Award size={13} />
              <span>{about.honhaarBadge}</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#182618]/70 border border-[#D9B45A]/50 text-[#D9B45A] text-xs font-mono">
              <GraduationCap size={13} />
              <span>{about.cgpaBadge}</span>
            </span>
          </div>

          <p className="text-base text-[#E2E8F0] leading-relaxed mb-6 font-light">
            {about.bio}
          </p>

          <h3 className="text-xs font-mono uppercase tracking-widest text-[#D9B45A] mb-4">
            Core Research Directions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {about.interests.map((interest, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-[#16382D] bg-[#07191E]/60"
              >
                <h4 className="text-sm font-semibold text-white mb-1.5">{interest.title}</h4>
                <p className="text-xs text-[#BAC7D5] leading-relaxed">
                  {interest.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl border border-[#17372D] bg-[#0A1A20]">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#D9B45A] mb-6">
            Education, Honors and Service Timeline
          </h3>
          <div className="space-y-4">
            {about.timeline.map((item, idx) => (
              <div key={idx} className="border-l-2 border-[#D9B45A] pl-4">
                <div className="text-xs font-mono text-[#D9B45A] font-bold">
                  {item.when}
                </div>
                <div className="text-sm text-white mt-0.5">{item.what}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Certifications */}
      <section className="mb-20" aria-label="Skills">
        <div className="mb-8 pb-3 border-b border-[#142A25]">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {skills.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {skills.constellations.map((constellation, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg border border-[#15342A] bg-[#0A1A20]"
            >
              <h3 className="text-sm font-mono uppercase text-[#D9B45A] font-semibold mb-3">
                {constellation.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {constellation.skills.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 text-xs font-mono rounded bg-[#091D17] border border-[#1B4738] text-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-xl border border-[#17372D] bg-[#0A1A20]">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#D9B45A] mb-4">
            Certifications & Credentials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {skills.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-3 rounded border border-[#1A3A30] bg-[#08181D]"
              >
                <div className="text-xs font-semibold text-white">{cert.title}</div>
                <div className="text-[11px] font-mono text-[#7A8A8F] mt-1">{cert.issuer}</div>
                {cert.date && (
                  <div className="text-[10px] font-mono text-[#D9B45A] mt-2">{cert.date}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-16" aria-label="Contact">
        <div className="mb-8 pb-3 border-b border-[#142A25]">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {contact.heading}
          </h2>
        </div>

        <div className="p-6 md:p-8 rounded-xl border border-[#17372D] bg-[#0A1A20]">
          <p className="text-base text-[#E2E8F0] mb-6 font-light">{contact.copy}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg border border-[#183E31] bg-[#081D1B] flex items-center space-x-3">
              <Mail className="text-[#39FF14]" size={20} />
              <div>
                <div className="text-[10px] font-mono text-[#7A8A8F] uppercase">Email</div>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-white font-mono text-sm hover:text-[#D9B45A]"
                >
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-[#183E31] bg-[#081D1B] flex items-center space-x-3">
              <MapPin className="text-[#D9B45A]" size={20} />
              <div>
                <div className="text-[10px] font-mono text-[#7A8A8F] uppercase">Location</div>
                <div className="text-white text-sm">{contact.location}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {contact.links.map((link, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded border border-dashed border-[#1C4135] bg-[#08181D] text-xs font-mono text-[#D9B45A]"
              >
                {link.label}: {link.note}
              </span>
            ))}
          </div>
          <p className="text-xs font-mono text-[#7A8A8F] mt-4">{contact.note}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-[#142A25] text-center text-xs font-mono text-[#7A8A8F]">
        {contact.footer}
      </footer>
    </div>
  );
}
