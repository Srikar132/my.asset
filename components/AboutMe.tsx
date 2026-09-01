'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_TEXT =
  "I've always been drawn to clean, thoughtful design and the little details that make something feel right. I love exploring new technologies, trying ideas I haven't worked with before, and collaborating with people who enjoy building things with the same curiosity.";

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useGSAP(
    () => {
      const words = wordsRef.current.filter(Boolean);
      if (!words.length) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(words, { yPercent: 110 });

        gsap.to(words, {
          yPercent: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.015,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        });
      });

      // Users who prefer less motion get the text immediately, no animation.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(words, { yPercent: 0 });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" ref={sectionRef} className="w-full px-4 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto flex min-h-[42vh] max-w-5xl items-center justify-center text-center">
        <p
          className="max-w-4xl text-[clamp(1.6rem,3.4vw,2.35rem)] font-normal leading-[1.3] text-white normal-case"
          style={{ fontFamily: 'var(--font-fredoka), sans-serif' }}
        >
          {ABOUT_TEXT.split(' ').map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <span
                ref={(el) => {
                  if (el) wordsRef.current[i] = el;
                }}
                className="inline-block will-change-transform"
              >
                {word}&nbsp;
              </span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}