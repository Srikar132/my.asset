'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import freelance from '@/data/freelance';

gsap.registerPlugin(ScrollTrigger);

const FONT_MONO = 'var(--font-mono), ui-monospace, monospace';

export default function FreelanceWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const total = freelance.length;

  useGSAP(
    () => {
      // Each sticky panel reveals its card + info once it scrolls into view.
      panelRefs.current.forEach((panel) => {
        if (!panel) return;
        const card = panel.querySelector('.fw-card');
        const rise = panel.querySelectorAll('.fw-rise');

        gsap.set(card, { yPercent: 8, opacity: 0, scale: 1.05 });
        gsap.set(rise, { y: 34, opacity: 0 });

        gsap
          .timeline({ scrollTrigger: { trigger: panel, start: 'top 60%', once: true } })
          .to(card, { yPercent: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'expo.out' })
          .to(rise, { y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out' }, '-=0.7');
      });
    },
    { scope: sectionRef }
  );

  return (
    // sticky stacked "pages": each screen slides up and sits on top of the previous
    <section ref={sectionRef} className="relative w-full">
      {freelance.map((p, i) => (
        <div
          key={p.name}
          ref={(el) => { panelRefs.current[i] = el; }}
          className="sticky top-0 h-screen w-full overflow-hidden rounded-t-[1.75rem] border-t border-white/10 shadow-[0_-40px_80px_rgba(0,0,0,0.6)]"
          style={{ zIndex: i + 1, background: 'var(--hero-bg)' }}
        >
          {/* soft accent glow behind the card */}
          <div
            className="pointer-events-none absolute -left-40 top-1/2 h-[70vh] w-[70vh] -translate-y-1/2 rounded-full blur-[130px] opacity-25"
            style={{ background: p.accent }}
          />

          {/* top label + counter */}
          <div
            className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-6"
            style={{ fontFamily: FONT_MONO }}
          >
            <span className="text-[11px] tracking-[0.3em] text-white/40">SELECTED FREELANCE WORK</span>
            <span className="text-[11px] tracking-[0.3em] text-white/40">
              <span className="text-white/80">{String(i + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
            </span>
          </div>

          <div className="relative h-full grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] items-center gap-8 lg:gap-16 px-4 sm:px-8 lg:px-12 pt-20 lg:pt-0">
            {/* ── Card ── */}
            <div
              className="fw-card relative w-full overflow-hidden rounded-xl ring-1 ring-white/10 shadow-2xl shadow-black/50"
              style={{ aspectRatio: '16 / 10', background: `linear-gradient(135deg, ${p.accent}, #111)`, willChange: 'transform' }}
            >
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt={`${p.name} preview`}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}
              {/* placeholder label — sits under the image; visible until a real screenshot loads */}
              <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.25em] text-white/70" style={{ fontFamily: FONT_MONO }}>
                {p.name} · PREVIEW
              </div>
            </div>

            {/* ── Info ── */}
            <div className="text-white">
              <h3 className="fw-rise inline-block normal-case font-black leading-none tracking-tight text-white text-[clamp(2.5rem,7vw,5.5rem)]">
                {p.name}
                <Link
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="align-super ml-2 text-[11px] tracking-[0.2em] text-white/50 hover:text-white transition-colors"
                  style={{ fontFamily: FONT_MONO }}
                >
                  [OPEN]
                </Link>
              </h3>

              <div className="fw-rise mt-6 space-y-1.5 text-[12px] tracking-[0.18em] text-white/55" style={{ fontFamily: FONT_MONO }}>
                <p>{p.category}</p>
                <p>ROLE: {p.role}</p>
              </div>

              <p
                className="fw-rise mt-6 max-w-md text-sm md:text-[15px] leading-relaxed text-white/40 normal-case"
                style={{ fontFamily: 'var(--font-fredoka), sans-serif' }}
              >
                {p.summary}
              </p>

              <Link
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="fw-rise group mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] text-white hover:text-white/70 transition-colors"
                style={{ fontFamily: FONT_MONO }}
              >
                VISIT SITE
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
