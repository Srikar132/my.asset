'use client';

import { Project } from '@/data/projects';
import { Flip, gsap } from 'gsap/all';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import React, { forwardRef, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger, Flip);

type ProjectSectionProps = {
  style: React.CSSProperties;
  project: Project;
  index: number;
  total: number;
};

const ProjectSection = forwardRef<HTMLDivElement, ProjectSectionProps>(
  ({ project, style }, ref) => {
    const { title, description, images, urls, category, techStack } = project;

    const containerRef = useRef<HTMLDivElement>(null);
    const imageStackRef = useRef<HTMLDivElement>(null);
    const mobileImageStackRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);
    const mobileCategoryRef = useRef<HTMLDivElement>(null);
    const loopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const mobileLoopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useGSAP(() => {
      const section = containerRef.current;
      const stack = imageStackRef.current;
      const mobileStack = mobileImageStackRef.current;
      if (!section) return;

      // ── Helpers ──────────────────────────────────────────────────────────
      const clearLoops = () => {
        if (loopTimerRef.current) { clearTimeout(loopTimerRef.current); loopTimerRef.current = null; }
        if (mobileLoopTimerRef.current) { clearTimeout(mobileLoopTimerRef.current); mobileLoopTimerRef.current = null; }
      };

      const buildCycler = (
        stackEl: HTMLDivElement,
        timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>,
        interval: number,
        initialDelay: number,
      ) => {
        const imgCount = (images ?? []).length;
        if (imgCount < 2) return;

        const cycleCard = () => {
          const cards = Array.from(stackEl.children) as HTMLElement[];
          if (cards.length < 2) return;

          const state = Flip.getState(cards);
          const frontCard = cards[cards.length - 1];
          stackEl.insertBefore(frontCard, cards[0]);

          const updatedCards = Array.from(stackEl.children) as HTMLElement[];
          updatedCards.forEach((card, i) => {
            card.style.zIndex = String(i + 1);
            const fromFront = updatedCards.length - 1 - i;
            card.style.transform = `translateY(${fromFront * -20}px) translateX(${fromFront * 20}px) rotate(${fromFront * -1.5}deg)`;
          });

          Flip.from(state, {
            duration: 0.7,
            ease: 'power3.inOut',
            stagger: 0.06,
            onStart() {
              const newFront = updatedCards[updatedCards.length - 1];
              gsap.fromTo(newFront,
                { scale: 0.95 },
                { scale: 1, duration: 0.5, ease: 'back.out(1.4)' }
              );
            },
          });

          timerRef.current = setTimeout(cycleCard, interval);
        };

        timerRef.current = setTimeout(cycleCard, initialDelay);
      };

      // ── Entry animations ─────────────────────────────────────────────────
      const catEls = [categoryRef.current, mobileCategoryRef.current].filter(Boolean);

      const entryTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      });

      entryTl
        .fromTo(catEls,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
        )
        .fromTo(titleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.2'
        )
        .fromTo(descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 0.6, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo("#url-links",
          { opacity: 0, y: 10, stagger: 0.1 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.1 },
          '-=0.2'
        )

      // ── Desktop stack entrance + loop ────────────────────────────────────
      if (stack) {
        gsap.fromTo(stack,
          { opacity: 0, x: 60, rotate: 3 },
          {
            opacity: 1, x: 0, rotate: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 75%', once: true },
          }
        );
        buildCycler(stack, loopTimerRef, 2800, 2200);
      }

      // ── Mobile stack entrance + loop ─────────────────────────────────────
      if (mobileStack) {
        gsap.fromTo(mobileStack,
          { opacity: 0, y: 40, rotate: -2 },
          {
            opacity: 1, y: 0, rotate: 0, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 78%', once: true },
          }
        );
        buildCycler(mobileStack, mobileLoopTimerRef, 2800, 2500);
      }

      return () => { clearLoops(); };
    }, { scope: containerRef });

    return (
      <div
        ref={(el) => {
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        style={style}
        className="relative w-full flex-1 rounded-3xl overflow-hidden"
      >
        <div
          className="absolute inset-0 blur-xl"
          style={{
            backgroundImage: `url(${images?.[0]})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            transform: 'translateZ(0)',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0, 0, 0, 0.6)' }} />

        <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] px-6 py-8 sm:px-10 sm:py-12 lg:px-20 lg:py-20">

          {/* LEFT COLUMN */}
          <div className="flex flex-col-reverse justify-between items-start lg:mb-30">
            <div className="space-y-3 sm:space-y-5 pb-4">
              <h2
                ref={titleRef}
                className="text-[clamp(2rem,6vw,5rem)] font-black leading-none tracking-tight text-white opacity-0"
              >
                {title}
              </h2>
              <p
                ref={descRef}
                className="text-white text-xs sm:text-sm leading-relaxed max-w-[340px] opacity-0"
              >
                {description}
              </p>

              <div className='inline-flex  gap-5'>
                <Link
                  id="url-links"
                  href={urls?.live ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 group opacity-0"
                >
                  <span className="text-white/40 text-lg font-light">(</span>
                  <span className="text-white uppercase tracking-[0.18em] text-xs font-semibold group-hover:text-blue-400 transition-colors duration-300">
                    Visit {project.type === 'app' ? 'App' : 'Site'}
                  </span>
                  <span className="text-white/60 text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 inline-block">↗</span>
                  <span className="text-white/40 text-lg font-light">)</span>
                </Link>
                <Link
                  id="url-links"
                  href={urls?.github ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 group opacity-0  rounded-full"
                >
                  <Image src="/github.svg" alt="GitHub logo" width={20} height={16} className="invert" />
                </Link>
              </div>
            </div>

            {/* Mobile category strip */}
            <div ref={mobileCategoryRef} className="lg:hidden w-full opacity-0 space-y-2 mb-4">
              <p className="text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase" style={{ fontFamily: 'ui-monospace, monospace' }}>
                {category ?? 'Web Application'}
              </p>
              <div className="h-px bg-white/10 w-full" />
              <div className="flex flex-wrap gap-x-3 gap-y-1 items-center">
                {(techStack ?? []).map((tech: string, i: number) => (
                  <React.Fragment key={tech}>
                    <span className="text-white/60 text-[0.65rem] uppercase tracking-widest" style={{ fontFamily: 'ui-monospace, monospace' }}>{tech}</span>
                    {i < (techStack ?? []).length - 1 && <span className="text-white/25 text-xs">•</span>}
                  </React.Fragment>
                ))}
              </div>
              <div className="h-px bg-white/10 w-full" />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-between items-end">

            {/* Desktop category */}
            <div ref={categoryRef} className="hidden lg:block w-full max-w-sm opacity-0 space-y-3">
              <p className=" text-xs font-bold tracking-[0.2em] uppercase" style={{ fontFamily: 'ui-monospace, monospace' }}>
                {category ?? 'Web Application'}
              </p>
              <div className="h-px bg-white/10 w-full" />
              <div className="flex flex-wrap gap-x-3 gap-y-1 items-center">
                {(techStack ?? []).map((tech: string, i: number) => (
                  <React.Fragment key={tech}>
                    <span className="text-[0.72rem] uppercase tracking-widest" style={{ fontFamily: 'ui-monospace, monospace' }}>{tech}</span>
                    {i < (techStack ?? []).length - 1 && <span className="text-white/25 text-xs">•</span>}
                  </React.Fragment>
                ))}
              </div>
              <div className="h-px bg-white/10 w-full" />
            </div>
            {/* Desktop image stack */}
            {project.type === 'app' ? (
              // ── iPhone portrait frame ──────────────────────────────────────────
              <div
                ref={imageStackRef}
                className="relative opacity-0 hidden lg:block mr-40"
                style={{ width: '220px', height: '440px' }}
              >
                {(images ?? []).slice(0, 3).map((src: string, i: number, arr) => {
                  const fromFront = arr.length - 1 - i;
                  return (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-[2.8rem] overflow-hidden shadow-2xl border-[2px] border-white/10"
                      style={{
                        transform: `translateY(${fromFront * -20}px) translateX(${fromFront * 20}px)`,
                        zIndex: i + 1,
                        background: '#111',
                      }}
                    >
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-[72px] h-[10px] bg-black rounded-b-2xl" />
                      {/* Side buttons (decorative) */}
                      <div className="absolute left-[-10px] top-[100px] w-[4px] h-[36px] rounded-full bg-white/20" />
                      <div className="absolute left-[-10px] top-[148px] w-[4px] h-[36px] rounded-full bg-white/20" />
                      <div className="absolute right-[-10px] top-[120px] w-[4px] h-[52px] rounded-full bg-white/20" />
                      {/* Screen */}
                      <div className="relative w-full h-full bg-black">
                        <Image
                          src={src}
                          alt={`${title} screenshot ${i + 1}`}
                          fill
                          className="object-cover object-top"
                          sizes="220px"
                          priority={i === 0}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // ── Browser / web frame (unchanged) ───────────────────────────────
              <div
                ref={imageStackRef}
                className="relative opacity-0 hidden lg:block"
                style={{ width: '480px', height: '360px' }}
              >
                {(images ?? []).slice(0, 3).map((src: string, i: number, arr) => {
                  const fromFront = arr.length - 1 - i;
                  return (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                      style={{
                        transform: `translateY(${fromFront * -20}px) translateX(${fromFront * 20}px) rotate(${fromFront * -1.5}deg)`,
                        zIndex: i + 1,
                      }}
                    >
                      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/95 border-b border-black/10">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                        <div className="flex-1 mx-2 h-4 rounded-sm bg-black/8 flex items-center justify-center">
                          <span className="text-[8px] text-black/30 font-mono tracking-wide">
                            {urls?.live ?? 'https://example.com'}
                          </span>
                        </div>
                      </div>
                      <div className="relative w-full h-[calc(100%-28px)] bg-white">
                        <Image
                          src={src}
                          alt={`${title} screenshot ${i + 1}`}
                          fill
                          className="object-cover object-top"
                          sizes="480px"
                          priority={i === 0}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Mobile image stack */}
            {project.type === 'app' ? (
              // ── iPhone portrait frame (mobile/tablet) ─────────────────────────
              <div
                ref={mobileImageStackRef}
                className="relative opacity-0 lg:hidden mt-20 mx-auto"
                style={{ width: 'clamp(110px, 28vw, 160px)', height: 'clamp(220px, 56vw, 320px)', marginLeft: 'auto' }}
              >
                {(images ?? []).slice(0, 3).map((src: string, i: number, arr) => {
                  const fromFront = arr.length - 1 - i;
                  return (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-[1rem] overflow-hidden shadow-2xl border-[2px] border-white/10"
                      style={{
                        transform: `translateY(${fromFront * -20}px) translateX(${fromFront * 20}px) rotate(${fromFront * -1.5}deg)`,
                        zIndex: i + 1,
                        background: '#111',
                      }}
                    >
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-[52px] h-[6px] bg-black rounded-b-xl" />
                      {/* Side buttons */}
                      <div className="absolute left-[-8px] top-[80px] w-[3px] h-[28px] rounded-full bg-white/20" />
                      <div className="absolute left-[-8px] top-[116px] w-[3px] h-[28px] rounded-full bg-white/20" />
                      <div className="absolute right-[-8px] top-[96px] w-[3px] h-[40px] rounded-full bg-white/20" />
                      {/* Screen */}
                      <div className="relative w-full h-full bg-black">
                        <Image
                          src={src}
                          alt={`${title} screenshot ${i + 1}`}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 1024px) 28vw, 220px"
                          priority={i === 0}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // ── Browser / web frame mobile (unchanged) ────────────────────────
              <div
                ref={mobileImageStackRef}
                className="relative opacity-0 lg:hidden w-full mt-20"
                style={{ height: 'clamp(160px, 38vw, 260px)' }}
              >
                {(images ?? []).slice(0, 3).map((src: string, i: number, arr) => {
                  const fromFront = arr.length - 1 - i;
                  return (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl"
                      style={{
                        transform: `translateY(${fromFront * -20}px) translateX(${fromFront * 20}px) rotate(${fromFront * -1.5}deg)`,
                        zIndex: i + 1,
                      }}
                    >
                      <div className="flex items-center gap-1 px-2 py-1.5 bg-white/95 border-b border-black/10">
                        <div className="w-2 h-2 rounded-full bg-red-400/80" />
                        <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                        <div className="w-2 h-2 rounded-full bg-green-400/80" />
                        <div className="flex-1 mx-1 h-3 rounded-sm bg-black/8 flex items-center justify-center overflow-hidden">
                          <span className="text-[7px] text-black/30 font-mono tracking-wide truncate px-1">
                            {urls?.live ?? 'https://example.com'}
                          </span>
                        </div>
                      </div>
                      <div className="relative w-full h-[calc(100%-20px)] bg-white">
                        <Image
                          src={src}
                          alt={`${title} screenshot ${i + 1}`}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 1024px) 80vw, 480px"
                          priority={i === 0}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }
);

ProjectSection.displayName = 'ProjectSection';
export default ProjectSection;