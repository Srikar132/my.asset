"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// ── The words I want to say ──────────────────────────────────────────────────
const PARAGRAPHS = [
  {
    tag: "01 — origin",
    text: "I started coding because I wanted to build things that felt alive. Not just screens — systems that think, adapt, and do something real in the world.",
  },
  {
    tag: "02 — craft",
    text: "Two hackathon wins later, I've learned that the best code isn't clever — it's honest. Clean architecture, clear intent, zero dead weight.",
  },
  {
    tag: "03 — now",
    text: "Right now I'm deep in AI-native apps — LLM agents, real-time systems, mobile. I want to work on problems where the stakes actually matter.",
  },
];

// ── Stat chips ───────────────────────────────────────────────────────────────
const STATS = [
  { value: "2×", label: "Hackathon Winner" },
  { value: "400+", label: "LeetCode problems" },
  { value: "Full-Stack", label: "End-to-end builder" },
  { value: "AI-first", label: "LLM & Agent systems" },
];

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
      },
    });

    // — vertical line grows down
    tl.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "top center" },
      { scaleY: 1, duration: 0.8, ease: "power3.inOut" }
    );

    // — section label
    tl.fromTo(
      labelRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
      "-=0.4"
    );

    // — big heading, word by word
    const words = headingRef.current?.querySelectorAll(".word");
    if (words?.length) {
      tl.fromTo(
        words,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.06,
        },
        "-=0.2"
      );
    }

    // — paragraphs slide up with stagger
    tl.fromTo(
      paraRefs.current.filter(Boolean),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15,
      },
      "-=0.3"
    );

    // — stat chips pop in
    tl.fromTo(
      statRefs.current.filter(Boolean),
      { opacity: 0, scale: 0.88, y: 12 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: "back.out(1.5)",
        stagger: 0.08,
      },
      "-=0.3"
    );
  }, { scope: sectionRef });

  // Split heading into individually wrapped words for per-word animation
  const headingWords = ["A builder,", "not", "a button-pusher."];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full common-padding py-24 lg:py-32 relative overflow-hidden"
    >

      <div className="max-w-7xl mx-auto">

        {/* ── TOP LABEL ─────────────────────────────────────────────────── */}
        <div
          ref={labelRef}
          className="flex items-center gap-3 mb-10 opacity-0"
        >
          <div
            ref={lineRef}
            className="w-px h-6 bg-white/30"
            style={{ transformOrigin: "top center" }}
          />
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/30">
            About
          </span>
        </div>

        {/* ── TWO-COLUMN LAYOUT ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start">

          {/* LEFT — headline */}
          <div>
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl xl:text-6xl font-semibold leading-[1.1] tracking-tight text-white overflow-hidden"
              aria-label="A builder, not a button-pusher."
            >
              {headingWords.map((word, wi) => (
                <span
                  key={wi}
                  className="inline-block overflow-hidden mr-[0.25em] last:mr-0"
                >
                  <span className="word inline-block">
                    {word === "not" ? (
                      <em className="not-italic text-white/30">{word}</em>
                    ) : (
                      word
                    )}
                  </span>
                </span>
              ))}
            </h2>

            {/* Stat chips */}
            <div className="flex flex-wrap gap-2 mt-10">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  ref={(el) => { statRefs.current[i] = el; }}
                  className="opacity-0 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm"
                >
                  <span className="text-sm font-mono font-semibold text-white">
                    {s.value}
                  </span>
                  <span className="text-xs text-white/35">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — personal paragraphs */}
          <div className="space-y-8">
            {PARAGRAPHS.map((p, i) => (
              <div
                key={p.tag}
                ref={(el) => { paraRefs.current[i] = el; }}
                className="opacity-0 group relative pl-5 border-l border-white/[0.08] hover:border-white/25 transition-colors duration-300"
              >
                <span className="block text-[10px] font-mono tracking-[0.25em] uppercase text-white/25 mb-2 group-hover:text-white/50 transition-colors duration-300">
                  {p.tag}
                </span>
                <p className="text-base md:text-lg text-white/60 leading-relaxed font-light group-hover:text-white/80 transition-colors duration-300">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}