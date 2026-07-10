"use client";
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import ProjectSection from './ProjectSection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import projects from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

// Circumference of the SVG circle: 2π × r
// viewBox is 0 0 120 120, circle r=58 (leaving 2px stroke inset from edge)
const RADIUS = 58;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 364.4

const Projects = () => {
    // useWindowHeight();
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
    const counterRef = useRef<HTMLDivElement>(null);
    const counterIndexRef = useRef<HTMLSpanElement>(null);
    const ringRef = useRef<SVGCircleElement>(null);



    useGSAP(() => {
        const total = sectionRefs.current.length;
        const counter = counterRef.current;
        const ring = ringRef.current;
        if (!counter || !ring) return;


        // ── Init ring: fully hidden (offset = circumference = invisible) ────
        gsap.set(ring, {
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: CIRCUMFERENCE,
            rotation: -90,          // start from top (12 o'clock)
            transformOrigin: '50% 50%',
        });

        // ── Fade counter IN/OUT with the projects section ───────────────────
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom bottom',
            onEnter: () => {
                gsap.to(counter, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
            },
            onLeave: () => {
                gsap.to(counter, { opacity: 0, y: -12, duration: 0.4, ease: 'power2.in' });
            },
            onEnterBack: () => {
                gsap.to(counter, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
            },
            onLeaveBack: () => {
                gsap.to(counter, { opacity: 0, y: -12, duration: 0.4, ease: 'power2.in' });
            },
        });

        // ── Per-section: pin+scale + counter + ring progress ────────────────
        sectionRefs.current.forEach((section, i) => {
            if (!section) return;

            // Progress fraction for this project: goes from i/total → (i+1)/total
            const progressStart = i / total;
            const progressEnd = (i + 1) / total;
            const offsetStart = CIRCUMFERENCE * (1 - progressStart);
            const offsetEnd = CIRCUMFERENCE * (1 - progressEnd);

            // Animate ring dashoffset as this section scrolls into view
            ScrollTrigger.create({
                trigger: wrapperRefs.current[i],
                start: 'top 60%',
                end: 'bottom 60%',
                scrub: 0.6,
                onUpdate: (self) => {
                    // Interpolate offset between this section's start/end progress
                    const offset = gsap.utils.interpolate(offsetStart, offsetEnd, self.progress);
                    gsap.set(ring, { strokeDashoffset: offset });
                },
            });

            // Counter number flip
            ScrollTrigger.create({
                trigger: wrapperRefs.current[i],
                start: 'top 60%',
                onEnter: () => {
                    const el = counterIndexRef.current;
                    if (!el) return;
                    gsap.to(el, {
                        opacity: 0, y: -8, duration: 0.15, ease: 'power2.in',
                        onComplete: () => {
                            el.textContent = String(i + 1).padStart(2, '0');
                            gsap.fromTo(el,
                                { opacity: 0, y: 8 },
                                { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
                            );
                        },
                    });
                },
                onLeaveBack: () => {
                    const el = counterIndexRef.current;
                    if (!el) return;
                    gsap.to(el, {
                        opacity: 0, y: 8, duration: 0.15, ease: 'power2.in',
                        onComplete: () => {
                            el.textContent = String(i).padStart(2, '0');
                            gsap.fromTo(el,
                                { opacity: 0, y: -8 },
                                { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
                            );
                        },
                    });
                },
            });

            // Subtle depth — each card scales / fades a touch as the NEXT sticky
            // card slides up over it. Pure scrub (no pin) → smooth, no stutter.
            if (i === total - 1) return;
            gsap.fromTo(
                section,
                { scale: 1, opacity: 1 },
                {
                    scale: 0.93,
                    opacity: 0.65,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: wrapperRefs.current[i],
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }
            );
        });

        return () => {
            sectionRefs.current.forEach(s => s && gsap.set(s, { willChange: 'auto' }));
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, { scope: containerRef });

    return (
        <section id='work' ref={containerRef} className='w-full relative flex flex-col'>
            <div className='w-full flex-1'>
                {/* ── STICKY COUNTER ──────────────────────────────────────────── */}
                <div

                    ref={counterRef}
                    className="fixed top-8 max-sm:right-8 sm:left-8 z-100 pointer-events-none backdrop-blur-lg"
                    style={{ opacity: 0, transform: 'translateY(-12px)' }}
                >
                    {/* Inner pill */}
                    <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-white/5 flex flex-col items-center justify-center gap-0.5 shadow-lg shadow-black/20">
                        <span
                            className="text-[9px] lg:text-xs uppercase tracking-[0.2em] text-white/60"
                            style={{ fontFamily: 'ui-monospace, monospace' }}
                        >
                            Project
                        </span>
                        <div
                            className="text-white flex items-center gap-1"
                            style={{ fontFamily: 'ui-monospace, monospace' }}
                        >
                            <span ref={counterIndexRef} className="font-semibold tabular-nums text-base lg:text-xl">
                                01
                            </span>
                            <span className="text-white/30 text-xs">/</span>
                            <span className="text-white/50 tabular-nums text-xs lg:text-sm">
                                {String(projects.length).padStart(2, '0')}
                            </span>
                        </div>
                    </div>

                    {/* ── PROGRESS RING ──────────────────────────────────────────
                        SVG sits absolutely over the pill.
                        The circle uses strokeDashoffset to draw from 0 → full.
                        GSAP sets dashoffset in real time via ScrollTrigger scrub.
                    ─────────────────────────────────────────────────────────── */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                        viewBox="0 0 120 120"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Track ring — always visible, dim */}
                        <circle
                            cx="60"
                            cy="60"
                            r={RADIUS}
                            stroke="rgba(255,255,255,0.12)"
                            strokeWidth="1.5"
                            fill="none"
                        />
                        {/* Progress ring — animated by GSAP */}
                        <circle
                            ref={ringRef}
                            cx="60"
                            cy="60"
                            r={RADIUS}
                            stroke="rgba(255,255,255,0.85)"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {projects.map((project, i) => (
                    // native sticky stacking: each card slides up and sits on top
                    // of the previous one — smooth, no GSAP pin
                    <div
                        ref={(el) => { wrapperRefs.current[i] = el; }}
                        className='sticky top-0 h-screen common-padding flex items-stretch'
                        style={{ zIndex: i + 1 }}
                        key={project.title ?? i}
                    >
                        <ProjectSection
                            ref={(el) => { sectionRefs.current[i] = el; }}
                            style={{ zIndex: i + 1 }}
                            project={project}
                            index={i}
                            total={projects.length}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;