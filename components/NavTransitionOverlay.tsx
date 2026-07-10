'use client';

import { useRef, useImperativeHandle, forwardRef } from 'react';
import { gsap } from 'gsap';

export type NavTransitionOverlayHandle = {
  run: (onMidpoint: () => void) => void;
};

const NavTransitionOverlay = forwardRef<NavTransitionOverlayHandle>((_, ref) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLSpanElement>(null);

  useImperativeHandle(ref, () => ({
    run(onMidpoint) {
      const el   = overlayRef.current;
      const text = textRef.current;
      if (!el) { onMidpoint(); return; }

      const tl = gsap.timeline();

      // Slide IN from bottom
      tl.set(el, { display: 'flex', yPercent: 100 })
        .to(el, { yPercent: 0, duration: 0.5, ease: 'power4.inOut' })
        // Hold briefly, then fire the scroll
        .add(() => onMidpoint())
        // Subtle text pulse while scrolling
        .fromTo(text, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '-=0.1')
        // Slide OUT upward after scroll lands (~1.4s lenis duration)
        .to(el, { yPercent: -100, duration: 0.5, ease: 'power4.inOut', delay: 1.2 })
        .set(el, { display: 'none' });
    },
  }));

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] hidden items-center justify-center bg-neutral-950"
      style={{ willChange: 'transform' }}
    >
      {/* Animated bar */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
        <div className="h-full w-full bg-white/20 relative">
          <div
            className="absolute inset-y-0 left-0 bg-white"
            style={{ animation: 'nav-progress 1.4s ease-out forwards' }}
          />
        </div>
      </div>

      <span
        ref={textRef}
        className="text-white/40 text-[0.65rem] uppercase tracking-[0.3em] opacity-0"
        style={{ fontFamily: 'ui-monospace, monospace' }}
      >
        Loading
      </span>

      <style>{`
        @keyframes nav-progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  );
});

NavTransitionOverlay.displayName = 'NavTransitionOverlay';
export default NavTransitionOverlay;
