'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import experience from '@/data/experience';

gsap.registerPlugin(ScrollTrigger);

const FONT_MONO = 'var(--font-mono), ui-monospace, monospace';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      });

      tl.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 0.8, ease: 'power3.inOut' }
      )
        .fromTo(labelRef.current, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '-=0.4')
        .fromTo(
          rowRefs.current.filter(Boolean),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.15 },
          '-=0.2'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section id="experience" ref={sectionRef} className="w-full common-padding py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto">
        {/* ── Label ── */}
        <div className="flex items-center gap-3 mb-14">
          <div ref={lineRef} className="w-px h-6 bg-white/30" style={{ transformOrigin: 'top center' }} />
          <span
            ref={labelRef}
            className="text-xs tracking-[0.3em] uppercase text-white/30"
            style={{ fontFamily: FONT_MONO }}
          >
            Experience
          </span>
        </div>

        {/* ── Rows ── */}
        <div className="border-t border-white/10">
          {experience.map((e, i) => (
            <div
              key={e.company + e.role}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="group grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-16 py-10 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-300"
            >
              {/* left — period / type */}
              <div className="flex flex-col gap-1.5" style={{ fontFamily: FONT_MONO }}>
                <span className="text-sm text-white/70 tracking-wide">{e.period}</span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/35">{e.type}</span>
              </div>

              {/* right — role / company / desc */}
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight normal-case">
                  {e.role}
                </h3>
                <p
                  className="mt-1 text-sm tracking-[0.15em] uppercase text-white/55 group-hover:text-white/80 transition-colors duration-300"
                  style={{ fontFamily: FONT_MONO }}
                >
                  {e.company}
                </p>
                <p
                  className="mt-4 max-w-2xl text-base text-white/45 leading-relaxed font-light normal-case"
                  style={{ fontFamily: 'var(--font-fredoka), sans-serif' }}
                >
                  {e.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
