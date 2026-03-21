'use client';

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, DrawSVGPlugin } from "gsap/all";
import { Github, Linkedin, Code2 } from "lucide-react";
import LeftBrace from "./LeftBrace";
import RightBrace from "./RightBrace";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// ── Data ────────────────────────────────────────────────────────────────────
const projects = [
  { label: "Deepfake Detector", href: "https://github.com/Srikar132/deepfake-detection" },
  { label: "E-Commerce Platform", href: "https://github.com/Srikar132" },
];

const teammates = [
  { label: "Teammate One", href: "#" },
  { label: "Teammate Two", href: "#" },
  { label: "Teammate Three", href: "#" },
];

const socials = [
  {
    icon: Github,
    href: "https://github.com/Srikar132",
    label: "GitHub",
  },
  {
    // LeetCode doesn't have a lucide icon — use a custom SVG glyph
    icon: Code2,
    href: "https://leetcode.com/u/srikar132/",
    label: "LeetCode",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/srikar-chinthala-b99a5a2a2",
    label: "LinkedIn",
  },
];

// ── Component ───────────────────────────────────────────────────────────────
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const leftBraceRef = useRef<SVGPathElement>(null);
  const rightBraceRef = useRef<SVGPathElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%",
        once: true,
      },
    });

    // 1. Horizontal divider draws in
    tl.fromTo(
      dividerRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.9, ease: "power3.inOut" }
    );

    // 2. Braces draw themselves (same technique as hero)
    gsap.set([leftBraceRef.current, rightBraceRef.current], {
      drawSVG: "0%",
      visibility: "visible",
    });

    tl.to(
      leftBraceRef.current,
      { drawSVG: "0% 100%", duration: 0.8, ease: "power2.inOut" },
      "-=0.5"
    );
    tl.to(
      rightBraceRef.current,
      { drawSVG: "100% 0%", duration: 0.8, ease: "power2.inOut" },
      "<"
    );

    // 3. Name fades up
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    // 4. Columns stagger up
    tl.fromTo(
      colRefs.current.filter(Boolean),
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.12,
      },
      "-=0.3"
    );

    // 5. Bottom bar
    tl.fromTo(
      bottomRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.2"
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="w-full bg-background border-t border-white/5 mt-50">
      {/* Top divider line — animated */}
      <div
        ref={dividerRef}
        className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ transformOrigin: "left center" }}
      />

      <div className="container mx-auto max-w-7xl common-padding py-16">

        {/* ── BRAND ROW ──────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-12 h-12">
          {/* Left brace */}
          <div className="h-12 w-8 flex-shrink-0" style={{ visibility: "hidden" }}>
            <LeftBrace pathRef={leftBraceRef} />
          </div>

          {/* Name */}
          <h2
            ref={nameRef}
            className="font-mono text-lg tracking-[0.25em] uppercase text-white/80 opacity-0"
          >
            Srikar
          </h2>

          {/* Right brace */}
          <div className="h-12 w-8 flex-shrink-0" style={{ visibility: "hidden" }}>
            <RightBrace pathRef={rightBraceRef} />
          </div>
        </div>

        {/* ── GRID ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* — About — */}
          <div
            ref={(el) => { colRefs.current[0] = el; }}
            className="col-span-2 md:col-span-1 opacity-0"
          >
            <ColHeading>
                SOCIAL
            </ColHeading>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all duration-200"
                >
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* — Projects — */}
          <div
            ref={(el) => { colRefs.current[1] = el; }}
            className="opacity-0"
          >
            <ColHeading>OTHER WORKS</ColHeading>
            <ul className="space-y-2.5">
              {projects.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-white/70 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* — Site — */}
          <div
            ref={(el) => { colRefs.current[2] = el; }}
            className="opacity-0"
          >
            <ColHeading>Site</ColHeading>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Projects", href: "#projects" },
                { label: "Skills", href: "#skills" },
                { label: "Contact", href: "#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-white/70 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* — Team — */}
          <div
            ref={(el) => { colRefs.current[3] = el; }}
            className="opacity-0"
          >
            <ColHeading>Team</ColHeading>
            <ul className="space-y-2.5">
              {teammates.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-white/70 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── BOTTOM BAR ──────────────────────────────────────────────────── */}
        <div
          ref={bottomRef}
          className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-14 pt-6 border-t border-white/5 opacity-0"
        >
          <p className="text-xs text-white/25 font-mono tracking-widest uppercase">
            © {new Date().getFullYear()} Srikar Chinthala
          </p>
          <p className="text-xs text-white/20 font-mono tracking-widest">
            srikarchinthala25@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Small helper ─────────────────────────────────────────────────────────────
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-4">
      {children}
    </h3>
  );
}