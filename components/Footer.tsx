'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import LeftBrace from './LeftBrace';
import RightBrace from './RightBrace';
import { useLenis } from '@/providers/ScrollSmoothProvider';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const FONT_MONO = 'var(--font-mono), ui-monospace, monospace';

const EMAIL = 'srikarchinthala25@gmail.com';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const braceLeftRef = useRef<SVGPathElement>(null);
  const braceRightRef = useRef<SVGPathElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const nameInnerRef = useRef<HTMLHeadingElement>(null);

  const lenis = useLenis();
  const [time, setTime] = useState('--:--:--');

  // Live IST clock
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: footerRef.current, start: 'top 80%', once: true },
      });

      gsap.set([braceLeftRef.current, braceRightRef.current], { drawSVG: '0%' });

      tl.from(taglineRef.current, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out' })
        .to(braceLeftRef.current, { drawSVG: '0% 100%', duration: 0.6, ease: 'power2.inOut' }, '-=0.4')
        .to(braceRightRef.current, { drawSVG: '100% 0%', duration: 0.6, ease: 'power2.inOut' }, '<')
        .from(ctaRef.current, { opacity: 0, duration: 0.5 }, '-=0.3')
        .fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, '-=0.2')
        .from(
          metaRef.current?.querySelectorAll('.meta-col') ?? [],
          { y: 16, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          nameInnerRef.current,
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, ease: 'expo.out' },
          '-=0.3'
        );
    },
    { scope: footerRef }
  );

  const backToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const metaLink =
    'text-white/50 hover:text-white transition-colors duration-200';

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-background border-t border-white/5 pt-28 sm:pt-40"
    >
      <div className="px-4 sm:px-8 lg:px-12">
        {/* ── Tagline ── */}
        <h2
          ref={taglineRef}
          className="max-w-[820px] text-[clamp(1.6rem,3.4vw,2.35rem)] leading-[1.3] text-white normal-case font-normal"
          style={{ fontFamily: 'var(--font-fredoka), sans-serif' }}
        >
          Let&rsquo;s build and ship something remarkable. Open to agency collaborations,
          freelance work, and fully remote full-time opportunities.
        </h2>

        {/* ── Braced CTA ── */}
        <div ref={ctaRef} className="mt-12">
          <Link
            href={`mailto:${EMAIL}`}
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

        {/* ── Divider ── */}
        <div
          ref={dividerRef}
          className="mt-24 sm:mt-32 h-px w-full bg-white/15"
          style={{ transformOrigin: 'left center' }}
        />

        {/* ── Meta row ── */}
        <div
          ref={metaRef}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-[11px] tracking-[0.15em] text-white/50"
          style={{ fontFamily: FONT_MONO }}
        >
          {/* col 1 — contact */}
          <div className="meta-col flex flex-col gap-2 items-start">
            <Link href={`mailto:${EMAIL}`} className={`${metaLink} uppercase`}>
              {EMAIL}
            </Link>
            <Link
              href="https://github.com/Srikar132"
              target="_blank"
              rel="noopener noreferrer"
              className={metaLink}
            >
              GITHUB
            </Link>
            <Link
              href="https://www.linkedin.com/in/srikar-chinthala-b99a5a2a2/"
              target="_blank"
              rel="noopener noreferrer"
              className={metaLink}
            >
              LINKEDIN
            </Link>
            <Link
              href="https://leetcode.com/u/srikar132/"
              target="_blank"
              rel="noopener noreferrer"
              className={metaLink}
            >
              LEETCODE
            </Link>
          </div>

          {/* col 2 — utilities */}
          <div className="meta-col flex flex-col gap-2 items-start">
            <span className="tabular-nums">IST — {time}</span>
            <button onClick={backToTop} className={`${metaLink} text-left`}>
              BACK TO TOP
            </button>
          </div>

          {/* col 3 — credit */}
          <div className="meta-col flex sm:justify-end items-start">
            <span>
              DESIGNED BY <span className="text-white/80">SRIKAR</span>
            </span>
          </div>
        </div>

        {/* ── Giant name — full-bleed (breaks out of the px container) ── */}
        <div className="mt-16 sm:mt-24 overflow-hidden -mx-4 sm:-mx-8 lg:-mx-12">
          <h2
            ref={nameInnerRef}
            className="text-white/90 leading-none tracking-[-0.02em] normal-case whitespace-nowrap text-center font-bold text-[14.5vw]"
            style={{ fontFamily: 'var(--font-fredoka), sans-serif', willChange: 'transform' }}
          >
            SRIKAR DEV
          </h2>
        </div>
      </div>
    </footer>
  );
}
