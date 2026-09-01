'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import LeftBrace from './LeftBrace';
import RightBrace from './RightBrace';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const FONT_MONO = 'var(--font-mono), ui-monospace, monospace';

export default function FooterTagline() {
  const ref = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const braceLeftRef = useRef<SVGPathElement>(null);
  const braceRightRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      });

      gsap.set([braceLeftRef.current, braceRightRef.current], { drawSVG: '0%' });

      tl.from(taglineRef.current, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out' })
        .to(braceLeftRef.current, { drawSVG: '0% 100%', duration: 0.6, ease: 'power2.inOut' }, '-=0.4')
        .to(braceRightRef.current, { drawSVG: '100% 0%', duration: 0.6, ease: 'power2.inOut' }, '<')
        .from(ctaRef.current, { opacity: 0, duration: 0.5 }, '-=0.3');
    },
    { scope: ref }
  );

  return (
    <div id='contact' ref={ref} className="px-4 sm:px-8 lg:px-12 lg:pt-28">
      <h2
        ref={taglineRef}
        className="max-w-[820px] text-[clamp(1.6rem,3.4vw,2.35rem)] leading-[1.3] text-white normal-case font-normal"
        style={{ fontFamily: 'var(--font-fredoka), sans-serif' }}
      >
        Let&rsquo;s build and ship something remarkable. Open to agency collaborations,
        freelance work, and fully remote full-time opportunities.
      </h2>

      <div ref={ctaRef} className="mt-12">
        <Link
          href={`/contact`}
          className="group inline-flex items-center gap-2 h-9"
        >
          <span className="h-9 shrink-0 text-white/70">
            <LeftBrace pathRef={braceLeftRef} />
          </span>
          <span
            className="flex items-center gap-2 text-[11px] tracking-[0.25em] text-white group-hover:text-white/70 transition-colors"
            style={{ fontFamily: FONT_MONO }}
          >
            LET&rsquo;S WORK TOGETHER
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </span>
          <span className="h-9 shrink-0 text-white/70">
            <RightBrace pathRef={braceRightRef} />
          </span>
        </Link>
      </div>
    </div>
  );
}
