'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './Navbar';
import LeftBrace from './LeftBrace';
import RightBrace from './RightBrace';
import { DrawSVGPlugin  , TextPlugin , ScrollTrigger} from 'gsap/all';
import { useLenis } from '@/providers/ScrollSmoothProvider';
// import { enable } from "fuejs"
// Register TextPlugin

gsap.registerPlugin(TextPlugin , ScrollTrigger , DrawSVGPlugin);

export default function HeroSection() {
  const lenis = useLenis();
  const loadingBoxRef = useRef<HTMLDivElement>(null);
//   const nameRef = useRef<HTMLHeadingElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const renderingTextRef = useRef<HTMLHeadingElement>(null);
  const descriptionLinesRef = useRef<HTMLDivElement>(null);
 
  // Refs for the SVG paths so DrawSVGPlugin can animate them
  const leftBracePathRef = useRef<SVGPathElement>(null);
  const rightBracePathRef = useRef<SVGPathElement>(null);
 
  // Ref for the shimmer overlay element
 
  useGSAP(() => {
    const tl = gsap.timeline();
 
    lenis?.stop();

    // Hide braces initially
    gsap.set([leftBracePathRef.current, rightBracePathRef.current], {
      visibility: "visible",
    });

    // ── STEP 0: Hide braces at start so DrawSVG can reveal them ──────────────
    gsap.set([leftBracePathRef.current, rightBracePathRef.current], {
      drawSVG: "0%",
    });
 
    // ── STEP 1: Box fades / scales in ────────────────────────────────────────
    tl.fromTo(
      loadingBoxRef.current,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 0.5, duration: 0.6, ease: 'power3.out' }
    );
 
    // ── STEP 2: Braces draw themselves open simultaneously ───────────────────
    //    Left draws top→bottom, right draws bottom→top — feels like two hands
    //    opening outward
    tl.to(
      leftBracePathRef.current,
      { drawSVG: "0% 100%", duration: 0.9, ease: 'power2.inOut' },
      '-=0.1'
    );
    tl.to(
      rightBracePathRef.current,
      { drawSVG: "100% 0%", duration: 0.9, ease: 'power2.inOut' },
      '<' // same time as left brace
    );


    // ── STEP 3: "Rendering.." text fades up into view ────────────────────────

 
    // ── STEP 4: Brief loading pause ──────────────────────────────────────────
    tl.to({}, { duration: 0.9 });
 
    // ── STEP 5: Box moves up to final position ───────────────────────────────
    tl.to(loadingBoxRef.current, {
      y: -110,
      scale: 1,
      duration: 1.2,
      ease: 'circ.out',
    });
 
    // ── STEP 6: "Rendering.." → "Hello!" text swap + shrink ──────────────────
    // tl.to(
    //   renderingTextRef.current,
    //   { , duration: 0.5, ease: 'power2.inOut' },
    //   '-=1.0'
    // );
    tl.to(
      renderingTextRef.current,
      {
        fontSize: '0.8rem',
        duration: 0.6,
        text: { value: 'Hello!', delimiter: '' },
        ease: 'power2.inOut',
        y : 0
      },
      '-=1.1'
    );

 
    // ── STEP 7: Description lines stagger in ─────────────────────────────────
    tl.fromTo(
      descriptionLinesRef.current?.children || [],
      { opacity: 0, y: 10 },
      {
        opacity: 0.8,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.12,
      },
      '-=0.3'
    );
 

 
    // ── STEP 9: Name wipes in via clip-path ───────────────────────────────────
    // tl.fromTo(
    //   nameRef.current,
    //   { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
    //   {
    //     clipPath: 'inset(0 0% 0 0)',
    //     opacity: 1,
    //     duration: 0.7,
    //     ease: 'power2.out',
    //   },
    //   '-=0.2'
    // );
 
    // ── STEP 10: Navbar slides down ──────────────────────────────────────────
    navbarRef.current!.style.visibility = 'visible';
    tl.fromTo(
      navbarRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        onComplete: () => lenis?.start(),
      },
      '-=0.4'
    );



    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);   

    return () => {
      tl.kill();
      lenis?.start();
      history.scrollRestoration = 'auto';
      window.scrollTo(0, 0);
    };
  }, [lenis]);
 
  return (
    <div className="relative h-screen overflow-hidden">
 
      {/* NAVBAR */}
      <Navbar ref={navbarRef} />
 
      {/* HERO CONTENT */}
      <div className="flex flex-col items-center justify-center h-[80vh] common-padding">
 
        {/* LOADING BOX */}
        <div ref={loadingBoxRef} className="relative scale-50">
 
          <div className="backdrop-blur-md h-50 max-w-lg rounded-2xl shadow-2xl flex items-center overflow-hidden">
 
            {/* LEFT BRACE */}
            <LeftBrace visibility="hidden" pathRef={leftBracePathRef} />

            {/* CONTENT */}
            <div className="space-y-2 relative max-w-[150px] text-lg flex-1 py-3 h-full flex flex-col justify-center items-center text-center">
              <h1
                ref={renderingTextRef}
                className="tracking-wide text-xl translate-y-12"
              >
                Rendering..
              </h1>
 
              <div
                ref={descriptionLinesRef}
                className="text-white/70 font-thin  sm:px-4 space-y-1 text-[0.7rem] tracking-wide "
              >
                <p className="opacity-0 whitespace-nowrap">Hello I'm Srikar</p>
                <p className="opacity-0 whitespace-nowrap">I'm a full-stack developer &</p>
                <p className="opacity-0 whitespace-nowrap">a freelancer</p>
                <p className="opacity-0 whitespace-nowrap">Welcome to my portfolio!</p>
              </div>
            </div>
 
            {/* RIGHT BRACE */}
            <RightBrace visibility="hidden" pathRef={rightBracePathRef} />

          </div>
        </div>
 
        {/* NAME — below the box, revealed with clip-path wipe */}
      </div>
    </div>
  );
}
 