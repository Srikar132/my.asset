'use client';

import { Project } from '@/data/projects';
import { Flip, gsap } from 'gsap/all';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import React, { forwardRef, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger, Flip);

// ─────────────────────────────────────────────────────────────────────────────
// Stack math
// fromFront=0 → front card  (no offset, full scale)
// fromFront=1 → one behind  (shifted up PEEK_Y px, slightly smaller)
// fromFront=2 → two behind  (shifted up 2*PEEK_Y px, smaller still)
// Cards render with position:absolute inset-0 inside a container that has
// extra paddingTop = (count-1)*PEEK_Y so the peeking tops are not clipped.
// ─────────────────────────────────────────────────────────────────────────────

const PEEK_Y = 18;   // px each layer peeks above the one in front
const SCALE_DEC = 0.05; // scale reduction per layer

function stackTransform(fromFront: number) {
  return `translateY(${fromFront * -PEEK_Y}px) scale(${1 - fromFront * SCALE_DEC})`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type ProjectSectionProps = {
  style: React.CSSProperties;
  project: Project;
  index: number;
  total: number;
};

// ─────────────────────────────────────────────────────────────────────────────
// BackgroundLayer
// ─────────────────────────────────────────────────────────────────────────────

function BackgroundLayer({ src }: { src?: string }) {
  return (
    <>
      <div
        className="absolute inset-0 blur-xl"
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          transform: 'translateZ(0)',
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CategoryStrip
// ─────────────────────────────────────────────────────────────────────────────

type CategoryStripProps = {
  stripRef?: React.RefObject<HTMLDivElement | null>;
  category?: string;
  techStack?: string[];
  className?: string;
};

function CategoryStrip({ stripRef, category, techStack, className = '' }: CategoryStripProps) {
  return (
    <div ref={stripRef} className={`opacity-0 space-y-2 ${className}`}>
      <p
        className="text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase"
        style={{ fontFamily: 'ui-monospace, monospace' }}
      >
        {category ?? 'Web Application'}
      </p>
      <div className="h-px bg-white/10 w-full" />
      <div className="flex flex-wrap gap-x-3 gap-y-1 items-center">
        {(techStack ?? []).map((tech, i) => (
          <React.Fragment key={tech}>
            <span
              className="text-white/60 text-[0.65rem] uppercase tracking-widest"
              style={{ fontFamily: 'ui-monospace, monospace' }}
            >
              {tech}
            </span>
            {i < (techStack ?? []).length - 1 && (
              <span className="text-white/25 text-xs">•</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="h-px bg-white/10 w-full" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ProjectLinks
// ─────────────────────────────────────────────────────────────────────────────

function ProjectLinks({
  urls,
  type,
}: {
  urls?: { live?: string; github?: string };
  type: 'app' | 'website';
}) {
  return (
    <div className="inline-flex gap-5">
      <Link
        id="url-links"
        href={urls?.live ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 group opacity-0"
      >
        <span className="text-white/40 text-lg font-light">(</span>
        <span className="text-white uppercase tracking-[0.18em] text-xs font-semibold group-hover:text-blue-400 transition-colors duration-300">
          Visit {type === 'app' ? 'App' : 'Site'}
        </span>
        <span className="text-white/60 text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 inline-block">
          ↗
        </span>
        <span className="text-white/40 text-lg font-light">)</span>
      </Link>
      <Link
        id="url-links"
        href={urls?.github ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 group opacity-0 rounded-full"
      >
        <Image src="/github.svg" alt="GitHub logo" width={20} height={16} className="invert" />
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AppFrame — one iPhone-mock card
// ─────────────────────────────────────────────────────────────────────────────

type CardProps = {
  src: string;
  title: string;
  cardIndex: number; // DOM order index (0 = back of stack, last = front)
  fromFront: number; // 0 = front, 1 = one behind, etc.
  liveUrl?: string;
  isDesktop: boolean;
};

function AppFrame({ src, title, cardIndex, fromFront, isDesktop }: CardProps) {
  return (
    <div
      className={[
        'absolute inset-0 overflow-hidden shadow-2xl border-2 border-white/10  border-red-500',
        isDesktop ? 'rounded-[2.8rem]' : 'rounded-[1.8rem]',
      ].join(' ')}
      style={{
        transform: stackTransform(fromFront),
        transformOrigin: 'bottom center',
        zIndex: cardIndex + 1,
        background: '#111',
      }}
    >
      {/* Notch */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-black ${isDesktop ? 'w-[72px] h-2.5 rounded-b-2xl' : 'w-[52px] h-1.5 rounded-b-xl'
          }`}
      />
      {/* Volume buttons */}
      <div className={`absolute rounded-full bg-white/20 ${isDesktop ? '-left-2.5 top-[100px] w-1 h-9' : '-left-2 top-20 w-[3px] h-7'}`} />
      <div className={`absolute rounded-full bg-white/20 ${isDesktop ? '-left-2.5 top-[148px] w-1 h-9' : '-left-2 top-[116px] w-[3px] h-7'}`} />
      {/* Power button */}
      <div className={`absolute rounded-full bg-white/20 ${isDesktop ? '-right-2.5 top-[120px] w-1 h-13' : '-right-2 top-24 w-[3px] h-10'}`} />
      {/* Screen */}
      <div className="relative w-full h-full bg-black">
        <Image
          src={src}
          alt={`${title} screenshot ${cardIndex + 1}`}
          fill
          className="object-cover object-top"
          sizes={isDesktop ? '220px' : '28vw'}
          priority={cardIndex === 0}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WebFrame — one browser-chrome card
// ─────────────────────────────────────────────────────────────────────────────

function WebFrame({ src, title, cardIndex, fromFront, liveUrl, isDesktop }: CardProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden shadow-2xl ${isDesktop ? 'rounded-2xl' : 'rounded-xl'} translate-y-[${fromFront * -PEEK_Y}px]`}
      style={{
        transform: ` scale(${1 - fromFront * SCALE_DEC})`,
        transformOrigin: 'bottom center',
        zIndex: cardIndex + 1,
      }}
    >
      {/* <div className={`flex items-center gap-1.5 bg-white/95 border-b border-black/10 ${isDesktop ? 'px-3 py-2' : 'px-2 py-1.5'}`}>
        <div className={`rounded-full bg-red-400/80    ${isDesktop ? 'w-2.5 h-2.5' : 'w-2 h-2'}`} />
        <div className={`rounded-full bg-yellow-400/80 ${isDesktop ? 'w-2.5 h-2.5' : 'w-2 h-2'}`} />
        <div className={`rounded-full bg-green-400/80  ${isDesktop ? 'w-2.5 h-2.5' : 'w-2 h-2'}`} />
        <div className={`flex-1 rounded-sm bg-black/8 flex items-center justify-center overflow-hidden ${isDesktop ? 'mx-2 h-4' : 'mx-1 h-3'}`}>
          <span className={`text-black/30 font-mono tracking-wide truncate px-1 ${isDesktop ? 'text-[8px]' : 'text-[7px]'}`}>
            {liveUrl ?? 'https://example.com'}
          </span>
        </div>
      </div> */}
      <div className={`relative w-full bg-white ${isDesktop ? 'h-[calc(100%-28px)]' : 'h-[calc(100%-20px)]'}`}>
        <Image
          src={src}
          alt={`${title} screenshot ${cardIndex + 1}`}
          fill
          className="object-cover object-top"
          sizes={isDesktop ? '480px' : '80vw'}
          priority={cardIndex === 0}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ImageStack
// The container's height = card height + (count-1)*PEEK_Y so the tops of
// cards peeking behind are never clipped. The cards are pinned to the bottom
// of the container via transformOrigin:bottom center.
// ─────────────────────────────────────────────────────────────────────────────
type ImageStackProps = {
  stackRef: React.RefObject<HTMLDivElement | null>;
  images: string[];
  title: string;
  liveUrl?: string;
  type: 'app' | 'website';
  isDesktop: boolean;
};

function ImageStack({ stackRef, images, title, liveUrl, type, isDesktop }: ImageStackProps) {
  const sliced = (images ?? []).slice(0, 3);
  const count = sliced.length;

  // Front card dimensions
  const cardW = isDesktop
    ? (type === 'app' ? 220 : 480)
    : (type === 'app' ? 140 : 280);
  const cardH = isDesktop
    ? (type === 'app' ? 440 : 320)
    : (type === 'app' ? 280 : 180);

  const peekRoom = (count - 1) * PEEK_Y;
  const containerH = cardH + peekRoom;
  const containerW = type === 'app' ? cardW : (isDesktop ? cardW : '100%');

  return (
    // Outer div: full height including peek room at the top
    <div
      ref={stackRef}
      className={`relative opacity-0 ${isDesktop ? 'hidden lg:block' : 'lg:hidden'}`}
      style={{ width: containerW, height: containerH }}
    >
      {/*
        Inner div: exactly cardH tall, positioned at the BOTTOM of the outer div.
        Cards use absolute inset-0 relative to this box.
        Back cards shift upward with translateY (negative), poking into the
        peek-room above — that's where they become visible as a stack.
      */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: cardH }}
      >
        {sliced.map((src, i, arr) => {
          const fromFront = arr.length - 1 - i;
          const shared: CardProps = { src, title, cardIndex: i, fromFront, liveUrl, isDesktop };
          return type === 'app'
            ? <AppFrame key={i} {...shared} />
            : <WebFrame key={i} {...shared} />;
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GSAP cycler
// ─────────────────────────────────────────────────────────────────────────────

function buildCycler(
  stackEl: HTMLDivElement,
  timerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>,
  interval: number,
  initialDelay: number,
  imageCount: number,
) {
  if (imageCount < 2) return;

  // Cards live inside the single child div (the bottom-anchored inner wrapper)
  const inner = stackEl.firstElementChild as HTMLDivElement | null;
  if (!inner) return;

  const cycle = () => {
    const cards = Array.from(inner.children) as HTMLElement[];
    if (cards.length < 2) return;

    const state = Flip.getState(cards);

    // Move front card (last child) to back (first child)
    inner.insertBefore(cards[cards.length - 1], cards[0]);

    // Re-apply stack transforms to match new order
    const updated = Array.from(inner.children) as HTMLElement[];
    updated.forEach((card, i) => {
      const fromFront = updated.length - 1 - i;
      card.style.zIndex = String(i + 1);
      card.style.transform = stackTransform(fromFront);
      card.style.transformOrigin = 'bottom center';
    });

    Flip.from(state, {
      duration: 0.7,
      ease: 'power3.inOut',
      stagger: 0.06,
      onStart() {
        const newFront = updated[updated.length - 1];
        gsap.fromTo(newFront, { scale: 0.9 }, { scale: 1, duration: 0.5, ease: 'back.out(1.4)' });
      },
    });

    timerRef.current = setTimeout(cycle, interval);
  };

  timerRef.current = setTimeout(cycle, initialDelay);
}


// ─────────────────────────────────────────────────────────────────────────────
// ProjectSection (main export)
// ─────────────────────────────────────────────────────────────────────────────

const ProjectSection = forwardRef<HTMLDivElement, ProjectSectionProps>(
  ({ project, style }, ref) => {
    const { title, description, images, urls, category, techStack , achievement } = project;

    const containerRef = useRef<HTMLDivElement>(null);
    const imageStackRef = useRef<HTMLDivElement>(null);
    const mobileImageStackRef = useRef<HTMLDivElement>(null);
    const achievementRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);
    const mobileCategoryRef = useRef<HTMLDivElement>(null);
    const loopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const mobileLoopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useGSAP(() => {
      const section = containerRef.current;
      const stack = imageStackRef.current;
      const mobileStack = mobileImageStackRef.current;
      if (!section) return;

      const clearLoops = () => {
        if (loopTimerRef.current) { clearTimeout(loopTimerRef.current); loopTimerRef.current = null; }
        if (mobileLoopTimerRef.current) { clearTimeout(mobileLoopTimerRef.current); mobileLoopTimerRef.current = null; }
      };

      // Entry
      const catEls = [categoryRef.current, mobileCategoryRef.current].filter(Boolean);
      gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 80%', once: true } })
        .fromTo(catEls, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' })
        .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2')
        .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 0.6, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .fromTo(achievementRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
        .fromTo('#url-links', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.1 }, '-=0.2');

      if (stack) {
        gsap.fromTo(stack, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        });
        buildCycler(stack, loopTimerRef, 1000, 2200, (images ?? []).length);
      }

      if (mobileStack) {
        gsap.fromTo(mobileStack, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        });
        buildCycler(mobileStack, mobileLoopTimerRef, 2800, 2500, (images ?? []).length);
      }

      return () => clearLoops();
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
        <BackgroundLayer src={images?.[0]} />

        <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] px-6 py-8 sm:px-10 sm:py-12 lg:px-20 lg:py-20">

          {/* LEFT: content column */}
          <div className="flex flex-col justify-between items-start">

            <CategoryStrip
              stripRef={mobileCategoryRef}
              category={category}
              techStack={techStack}
              className="w-full lg:hidden"
            />

            {/* Title, description, links */}
            <div className="space-y-3 sm:space-y-5 pb-4 mt-auto">
              <p
                ref={achievementRef}
                className="text-white text-xs sm:text-sm leading-relaxed max-w-[340px] opacity-0"
              >{achievement}</p>
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
              <ProjectLinks urls={urls} type={project.type} />
            </div>

            {/* Mobile-only: category + image stack */}
            <div className="lg:hidden w-full flex flex-col items-center gap-4">

              <ImageStack
                stackRef={mobileImageStackRef}
                images={images ?? []}
                title={title}
                liveUrl={urls?.live}
                type={project.type}
                isDesktop={false}
              />
            </div>

          </div>

          {/* RIGHT (desktop only): category strip top, image stack bottom */}
          <div className="hidden lg:flex b  max-w-md w-full ml-auto flex-col justify-between items-center gap-6 min-h-0">
            <CategoryStrip
              stripRef={categoryRef}
              category={category}
              techStack={techStack}
              className="w-full"
            />
            <ImageStack
              stackRef={imageStackRef}
              images={images ?? []}
              title={title}
              liveUrl={urls?.live}
              type={project.type}
              isDesktop
            />
          </div>

        </div>
      </div>
    );
  },
);

ProjectSection.displayName = 'ProjectSection';
export default ProjectSection;