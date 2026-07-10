'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Navbar from './Navbar';
import LeftBrace from './LeftBrace';
import RightBrace from './RightBrace';

gsap.registerPlugin(ScrollTrigger, CustomEase, DrawSVGPlugin);

// next/font emits these raw vars on <body>
const FONT_DISPLAY = 'var(--font-display), "Arial Narrow", sans-serif';
const FONT_MONO = 'var(--font-mono), ui-monospace, monospace';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop';

const ABOUT_LINES = [
  "I'm Srikar, a web",
  'developer and freelancer.',
  'Welcome to my portfolio!',
];

export default function HeroSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const braceLeftPathRef = useRef<SVGPathElement>(null);
  const braceRightPathRef = useRef<SVGPathElement>(null);
  const aboutLinesRef = useRef<HTMLDivElement>(null);

  const creativeWrapRef = useRef<HTMLDivElement>(null);
  const creativeInnerRef = useRef<HTMLDivElement>(null);
  const creativeStrokeRef = useRef<HTMLSpanElement>(null);
  const devWrapRef = useRef<HTMLDivElement>(null);
  const devInnerRef = useRef<HTMLDivElement>(null);
  const devStrokeRef = useRef<HTMLSpanElement>(null);

  const imageMouseRef = useRef<HTMLDivElement>(null); // scroll → move to viewport centre
  const imageFloatRef = useRef<HTMLDivElement>(null); // idle float + scroll scale
  const imageBoxRef = useRef<HTMLDivElement>(null); // sized box (borderRadius)

  useGSAP(
    () => {
      CustomEase.create('hero', '0.16, 1, 0.3, 1');

      const creativeInner = creativeInnerRef.current!;
      const devInner = devInnerRef.current!;
      const aboutLines = aboutLinesRef.current!.children;
      const imgMouse = imageMouseRef.current!;
      const imgFloat = imageFloatRef.current!;
      const imgBox = imageBoxRef.current!;
      const lPath = braceLeftPathRef.current!;
      const rPath = braceRightPathRef.current!;

      // ── Initial states ────────────────────────────────────────────────────
      gsap.set(contentRef.current, { opacity: 0 });
      gsap.set(navRef.current, { y: -30, opacity: 0, visibility: 'visible' });
      gsap.set([lPath, rPath], { drawSVG: '0%' }); // braces hidden → "render" in
      gsap.set(aboutLines, { y: 24, opacity: 0 });
      gsap.set([creativeInner, devInner], { y: 60, opacity: 0 });
      gsap.set(imgFloat, { opacity: 0, scale: 1.12 });

      // ── Intro timeline ────────────────────────────────────────────────────
      gsap
        .timeline({ defaults: { ease: 'hero' } })
        .to(contentRef.current, { opacity: 1, duration: 0.4 }, 0)
        .to(navRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0)
        // braces draw themselves open (like rendering)
        .to(lPath, { drawSVG: '0% 100%', duration: 0.9, ease: 'power2.inOut' }, 0.3)
        .to(rPath, { drawSVG: '100% 0%', duration: 0.9, ease: 'power2.inOut' }, '<')
        .to(aboutLines, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, 0.55)
        .to(imgFloat, { opacity: 1, scale: 1, duration: 1.1, ease: 'expo.out' }, 0.9)
        .to(
          [creativeInner, devInner],
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: 'expo.out' },
          1.0
        );

      // ── Idle float ────────────────────────────────────────────────────────
      const floatTween = gsap.to(imgFloat, {
        y: -10,
        duration: 5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2,
      });

      // ── Moving yellow outline (white fill stays put) ──────────────────────
      const strokeAnim = (el: HTMLSpanElement | null, delay: number) => {
        if (!el) return;
        const o = { p: 150 };
        gsap.to(o, {
          p: -50,
          duration: 2.4,
          ease: 'none',
          repeat: -1,
          delay,
          onUpdate() {
            el.style.setProperty('-webkit-mask-position', `${o.p}% 0`);
            el.style.setProperty('mask-position', `${o.p}% 0`);
            const a = 0.35 * Math.max(0, 1 - Math.abs(o.p - 50) / 55);
            el.style.textShadow = `0 0 20px rgba(245,245,0,${a.toFixed(3)})`;
          },
        });
      };
      strokeAnim(creativeStrokeRef.current, 1.6);
      strokeAnim(devStrokeRef.current, 2.4);

      // ── Magnetic words — inner follows the cursor, springs back ───────────
      const clampX = gsap.utils.clamp(-60, 60);
      const clampY = gsap.utils.clamp(-30, 30);
      const magnetic = (wrap: HTMLElement | null, inner: HTMLElement) => {
        if (!wrap) return;
        const xTo = gsap.quickTo(inner, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(inner, 'y', { duration: 0.5, ease: 'power3' });
        const move = (e: MouseEvent) => {
          const r = wrap.getBoundingClientRect();
          xTo(clampX((e.clientX - (r.left + r.width / 2)) * 0.18));
          yTo(clampY((e.clientY - (r.top + r.height / 2)) * 0.28));
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        wrap.addEventListener('mousemove', move);
        wrap.addEventListener('mouseleave', leave);
        return () => {
          wrap.removeEventListener('mousemove', move);
          wrap.removeEventListener('mouseleave', leave);
        };
      };
      const cleanC = magnetic(creativeWrapRef.current, creativeInner);
      const cleanD = magnetic(devWrapRef.current, devInner);

      // ── Scroll: PIN hero, image grows to FULL screen — DESKTOP ONLY ───────
      // On mobile the pin + full-screen expand looks broken (image overlaps the
      // words), so it's gated behind lg. Mobile just scrolls normally.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const st = { dx: 0, dy: 0, scale: 3 };
        const measure = () => {
          gsap.set(imgMouse, { x: 0, y: 0 });
          gsap.set(imgFloat, { scale: 1, y: 0 });
          const r = imgBox.getBoundingClientRect();
          st.dx = window.innerWidth / 2 - (r.left + r.width / 2);
          st.dy = window.innerHeight / 2 - (r.top + r.height / 2);
          st.scale = Math.max(window.innerWidth / r.width, window.innerHeight / r.height) * 1.02;
        };

        gsap
          .timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: '+=140%',
              scrub: 1,
              pin: true,
              invalidateOnRefresh: true,
              onRefresh: measure,
              onUpdate: (self) => {
                if (self.progress > 0.02) floatTween.pause();
                else floatTween.resume();
              },
            },
          })
          .to(imgMouse, { x: () => st.dx, y: () => st.dy, ease: 'none' }, 0)
          .to(imgFloat, { scale: () => st.scale, ease: 'none' }, 0)
          .to(imgBox, { borderRadius: 0, ease: 'none' }, 0);

        // when leaving desktop (resize to mobile) reset any applied transforms
        return () => {
          gsap.set([imgMouse, imgFloat], { clearProps: 'transform' });
          gsap.set(imgBox, { clearProps: 'borderRadius' });
          floatTween.resume();
        };
      });

      return () => {
        cleanC?.();
        cleanD?.();
        mm.revert();
      };
    },
    { scope: rootRef }
  );

  // ── Word: white fill + swept yellow outline overlay ──────────────────────
  const strokeStyle: React.CSSProperties = {
    fontFamily: FONT_DISPLAY,
    WebkitTextStroke: '1.5px var(--neon-yellow)',
    color: 'transparent',
    WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 20%, #000 34%, transparent 54%)',
    maskImage: 'linear-gradient(90deg, transparent 0%, #000 20%, #000 34%, transparent 54%)',
    WebkitMaskSize: '200% 100%',
    maskSize: '200% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: '150% 0',
    maskPosition: '150% 0',
    willChange: 'mask-position',
  };

  // mobile: fills the width edge-to-edge (like the reference); desktop: fits creative · image · dev on one line
  const wordCls =
    'block leading-[0.8] tracking-[-0.02em] normal-case text-[clamp(4.25rem,28vw,9.5rem)] lg:text-[clamp(3rem,12vw,12rem)]';

  const Word = ({
    text,
    wrapRef,
    innerRef,
    strokeRef,
  }: {
    text: string;
    wrapRef: React.RefObject<HTMLDivElement | null>;
    innerRef: React.RefObject<HTMLDivElement | null>;
    strokeRef: React.RefObject<HTMLSpanElement | null>;
  }) => (
    <div ref={wrapRef} className="cursor-default">
      <div ref={innerRef} className="relative" style={{ fontFamily: FONT_DISPLAY, willChange: 'transform' }}>
        <span className={`${wordCls} text-white`} style={{ WebkitTextStroke: '1.4px currentColor' }}>
          {text}
        </span>
        <span ref={strokeRef} aria-hidden className={`${wordCls} absolute inset-0`} style={strokeStyle}>
          {text}
        </span>
      </div>
    </div>
  );

  return (
    <div
      ref={rootRef}
      className="relative h-screen w-full overflow-hidden normal-case"
      style={{ background: 'var(--hero-bg)' }}
    >
      <Navbar ref={navRef} className="absolute top-0 left-0" />

      <div ref={contentRef} className="absolute inset-0">
        {/* ── ABOUT — curly braces (DrawSVG) frame HELLO! + intro ── */}
        <div className="absolute left-1/2 top-[26vh] lg:top-[13vh] -translate-x-1/2 z-20 px-6">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="h-28 sm:h-32 shrink-0 text-white/50">
              <LeftBrace pathRef={braceLeftPathRef} />
            </div>

            <div className="flex flex-col items-center text-center w-56 sm:w-64">
              <span className="text-[11px] tracking-[0.4em] text-white/90 mb-3 sm:mb-4" style={{ fontFamily: FONT_MONO }}>
                HELLO!
              </span>
              <div
                ref={aboutLinesRef}
                className="space-y-1.5 text-sm md:text-[15px] text-white/40 leading-relaxed normal-case"
                style={{ fontFamily: 'var(--font-fredoka), sans-serif' }}
              >
                {ABOUT_LINES.map((line) => (
                  <p key={line} style={{ willChange: 'transform' }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="h-28 sm:h-32 shrink-0 text-white/50">
              <RightBrace pathRef={braceRightPathRef} />
            </div>
          </div>
        </div>

        {/*
          ── WORDS + IMAGE — one flex-wrap row ──
          Desktop: creative | image | dev   (image lands in the gap, "between")
          Mobile:  creative                 (basis-full → own line)
                   image · dev              (wraps below)
        */}
        <div className="absolute inset-x-0 bottom-[9vh] lg:bottom-[6vh] px-3 sm:px-8 lg:px-12 z-10">
          <div className="flex flex-wrap items-end lg:items-center justify-between gap-y-6 lg:gap-y-4">
            <div className="basis-full lg:basis-auto order-1">
              <Word text="creative" wrapRef={creativeWrapRef} innerRef={creativeInnerRef} strokeRef={creativeStrokeRef} />
            </div>

            {/* image — between the words; scroll expands it to full screen */}
            <div ref={imageMouseRef} className="relative z-30 order-2 shrink-0" style={{ willChange: 'transform' }}>
              <div ref={imageFloatRef} style={{ willChange: 'transform' }}>
                <div
                  ref={imageBoxRef}
                  className="relative overflow-hidden ring-1 ring-white/10"
                  style={{ width: 'clamp(155px, 30vw, 400px)', aspectRatio: '16 / 10', borderRadius: 18 }}
                >
                  <Image src={HERO_IMAGE} alt="Developer workspace" fill priority sizes="100vw" className="object-cover" />
                </div>
              </div>
            </div>

            <div className="order-3 shrink-0">
              <Word text="Dev" wrapRef={devWrapRef} innerRef={devInnerRef} strokeRef={devStrokeRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
