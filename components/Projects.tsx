"use client";
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import Link from 'next/link';
import ProjectSection from './ProjectSection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import projects from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

const RADIUS = 58;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const Projects = () => {
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

        gsap.set(ring, {
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: CIRCUMFERENCE,
            rotation: -90,
            transformOrigin: '50% 50%',
        });

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom bottom',
            onEnter: () => gsap.to(counter, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }),
            onLeave: () => gsap.to(counter, { opacity: 0, y: -12, duration: 0.4, ease: 'power2.in' }),
            onEnterBack: () => gsap.to(counter, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }),
            onLeaveBack: () => gsap.to(counter, { opacity: 0, y: -12, duration: 0.4, ease: 'power2.in' }),
        });

        sectionRefs.current.forEach((section, i) => {
            if (!section) return;

            const progressStart = i / total;
            const progressEnd = (i + 1) / total;
            const offsetStart = CIRCUMFERENCE * (1 - progressStart);
            const offsetEnd = CIRCUMFERENCE * (1 - progressEnd);

            ScrollTrigger.create({
                trigger: wrapperRefs.current[i],
                start: 'top 60%',
                end: 'bottom 60%',
                scrub: 0.6,
                onUpdate: (self) => {
                    const offset = gsap.utils.interpolate(offsetStart, offsetEnd, self.progress);
                    gsap.set(ring, { strokeDashoffset: offset });
                },
            });

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
                            gsap.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' });
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
                            gsap.fromTo(el, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' });
                        },
                    });
                },
            });

            if (i === total - 1) return;
            gsap.fromTo(section, { scale: 1, opacity: 1 }, {
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
            });
        });

        return () => {
            sectionRefs.current.forEach(s => s && gsap.set(s, { willChange: 'auto' }));
        };
    }, { scope: containerRef });

    return (
        <section id='work' ref={containerRef} className='w-full relative flex flex-col'>
            <div className='w-full flex-1'>
                <div
                    ref={counterRef}
                    className="fixed top-8 max-sm:right-8 sm:left-8 z-[100] pointer-events-none"
                    style={{ opacity: 0, transform: 'translateY(-12px)' }}
                >
                    <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-white/5 backdrop-blur-lg overflow-hidden flex flex-col items-center justify-center gap-0.5 shadow-lg shadow-black/20">
                        <span className="text-[9px] lg:text-xs tracking-[0.2em] text-white/60" style={{ fontFamily: 'ui-monospace, monospace' }}>
                            Project
                        </span>
                        <div className="text-white flex items-center gap-1" style={{ fontFamily: 'ui-monospace, monospace' }}>
                            <span ref={counterIndexRef} className="font-semibold tabular-nums text-base lg:text-xl">01</span>
                            <span className="text-white/30 text-xs">/</span>
                            <span className="text-white/50 tabular-nums text-xs lg:text-sm">{String(projects.length).padStart(2, '0')}</span>
                        </div>
                    </div>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="60" cy="60" r={RADIUS} stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
                        <circle ref={ringRef} cx="60" cy="60" r={RADIUS} stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                </div>

                {projects.map((project, i) => (
                    <div
                        ref={(el) => { wrapperRefs.current[i] = el; }}
                        className='sticky top-0 h-dvh common-padding flex items-stretch'
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

            <div className="flex justify-center px-5 pb-16 pt-4 sm:pb-20">
                <Link
                    href="/works"
                    className="group inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-6 text-sm font-medium transition-colors hover:border-white/20 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                >
                    <span>See all works</span>
                    <span className="font-mono text-[9px] text-foreground/35">({String(projects.length).padStart(2, '0')}+)</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </Link>
            </div>
        </section>
    );
};

export default Projects;
