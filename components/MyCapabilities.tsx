"use client";

import React, { useEffect, useRef } from 'react'
import Matter from 'matter-js';
import { useGSAP } from '@gsap/react';
import { CapabilityItem, EmojiItem, TABS, TagItem } from '@/data/capabilities';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import LeftBrace from './LeftBrace';
import Button from './Button';

interface BodyLabel {
  el: HTMLDivElement;
  body: Matter.Body;
}

gsap.registerPlugin(ScrollTrigger);

const MyCapabilities = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = React.useState(0);
  const isTransitioning = useRef(false); // block rapid tab clicks during animation

  // Physics refs — persist across renders without causing re-renders
  const engineRef = useRef<Matter.Engine | null>(null);
  const domMapRef = useRef<Map<number, { el: HTMLDivElement; hw: number; hh: number }>>(new Map());
  const spawnTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasSpawned = useRef(false); // only spawn on first scroll-enter

  // Function refs — so ScrollTrigger + tab clicks always have fresh closures
  const spawnFnRef = useRef<((items: CapabilityItem[]) => void) | null>(null);
  const clearFnRef = useRef<((onDone: () => void) => void) | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let W = stage.offsetWidth;
    let H = stage.offsetHeight;
    const WALL = 80;

    // Engine — physics math only, no canvas, no runner
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.4 },
      positionIterations: 6,
      velocityIterations: 4,
    });
    engineRef.current = engine;



    // Static walls
    const floor = Matter.Bodies.rectangle(W / 2, H + WALL / 2, W + 200, WALL, {
      isStatic: true, friction: 1, label: 'floor',
    });
    const wallL = Matter.Bodies.rectangle(-WALL / 2, H / 2, WALL, H * 3, {
      isStatic: true, label: 'wall-left',
    });
    const wallR = Matter.Bodies.rectangle(W + WALL / 2, H / 2, WALL, H * 3, {
      isStatic: true, label: 'wall-right',
    });
    Matter.Composite.add(engine.world, [floor, wallL, wallR]);



    // ── GSAP ticker drives physics — one shared RAF loop ──────────────────
    let isPaused = false;

    const tick = (_time: number, delta: number) => {
      if (isPaused) return;
      Matter.Engine.update(engine, Math.min(delta, 33));

      const bodies = Matter.Composite.allBodies(engine.world);
      for (const body of bodies) {
        if (body.isStatic) continue;
        const entry = domMapRef.current.get(body.id);
        if (!entry) continue;
        const { el, hw, hh } = entry;
        const { x, y } = body.position;
        el.style.transform = `translate(${x - hw}px,${y - hh}px) rotate(${body.angle}rad)`;
      }
    };

    gsap.ticker.add(tick);


    // ── Spawn function ────────────────────────────────────────────────────
    const spawnBodies = (items: CapabilityItem[]) => {
      const stg = stageRef.current;
      const eng = engineRef.current;
      if (!stg || !eng) return;

      const stgW = stg.offsetWidth;

      items.forEach((item, i) => {
        const timer = setTimeout(() => {
          if (!engineRef.current) return;

          if (item.kind === 'tag') {
            const tag = item.data as TagItem;
            const pW = Math.max(130, tag.label.length * 11.5 + 52);
            const pH = 52;

            const body = Matter.Bodies.rectangle(
              120 + Math.random() * (stgW - 240),
              -50 - Math.random() * 100,
              pW, pH,
              {
                chamfer: { radius: pH / 2 },
                restitution: 0.3,
                friction: 0.8,
                frictionAir: 0.015,
                density: 0.002,
                label: 'pill',
              }
            );
            if (Math.random() > 0.6 || tag.rotated) {
              Matter.Body.setAngle(body, (Math.random() - 0.5) * 1.0);
            }
            Matter.Body.setVelocity(body, {
              x: (Math.random() - 0.5) * 3,
              y: Math.random() * 1.5,
            });

            const el = document.createElement('div');
            el.style.cssText = `
              position:absolute; left:0; top:0;
              width:${pW}px; height:${pH}px;
              border-radius:${pH / 2}px;
              background:${tag.color};
              color:${tag.textColor ?? '#fff'};
              display:flex; align-items:center; justify-content:center;
              font-family:inherit;
              font-size:15px; font-weight:500;
              white-space:nowrap;
              pointer-events:none; user-select:none;
              will-change:transform;
              backface-visibility:hidden;
              -webkit-font-smoothing:antialiased;
              opacity:0;
            `;
            el.textContent = tag.label;
            stg.appendChild(el);
            gsap.to(el, { opacity: 1, duration: 0.4, ease: 'power1.out' });

            domMapRef.current.set(body.id, { el, hw: pW / 2, hh: pH / 2 });
            Matter.Composite.add(eng.world, body);

          } else {
            const emoji = item.data as EmojiItem;
            const r = 30;
            const size = r * 2;

            const body = Matter.Bodies.circle(
              80 + Math.random() * (stgW - 160),
              -30 - Math.random() * 80,
              r,
              {
                restitution: 0.4,
                friction: 0.6,
                frictionAir: 0.012,
                density: 0.002,
                label: 'emoji',
              }
            );
            Matter.Body.setVelocity(body, {
              x: (Math.random() - 0.5) * 4,
              y: Math.random() * 1.5,
            });

            const el = document.createElement('div');
            el.style.cssText = `
              position:absolute; left:0; top:0;
              width:${size}px; height:${size}px;
              border-radius:50%;
              background:${emoji.color};
              display:flex; align-items:center; justify-content:center;
              font-size:20px;
              pointer-events:none; user-select:none;
              will-change:transform;
              backface-visibility:hidden;
              opacity:0;
            `;
            el.textContent = emoji.emoji;
            stg.appendChild(el);
            gsap.to(el, { opacity: 1, duration: 0.4, ease: 'power1.out' });

            domMapRef.current.set(body.id, { el, hw: r, hh: r });
            Matter.Composite.add(eng.world, body);
          }
        }, i * 110);

        spawnTimers.current.push(timer);
      });
    };


    const clearBodies = (onDone: () => void) => {
      const eng = engineRef.current;
      if (!eng) { onDone(); return; }

      const domMap = domMapRef.current;
      if (domMap.size === 0) { onDone(); return; }

      // Clear pending spawn timers first
      spawnTimers.current.forEach(clearTimeout);
      spawnTimers.current = [];

      // Animate all existing elements: fall down + fade
      const elements: HTMLDivElement[] = [];
      domMap.forEach(({ el }) => elements.push(el));

      gsap.to(elements, {
        y: '+=120',
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        stagger: { amount: 0.15, from: 'random' },
        onComplete: () => {
          // Remove DOM elements
          elements.forEach(el => el.remove());

          // Remove physics bodies
          const bodies = Matter.Composite.allBodies(eng.world)
            .filter(b => !b.isStatic);
          bodies.forEach(b => Matter.Composite.remove(eng.world, b));

          domMap.clear();
          onDone();
        },
      });
    };



    // Store refs so ScrollTrigger + tab clicks can call them
    spawnFnRef.current = spawnBodies;
    clearFnRef.current = clearBodies;

    let dragBody: Matter.Body | null = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    const getPos = (e: PointerEvent) => {
      const stg = stageRef.current!;
      const r = stg.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onPointerDown = (e: PointerEvent) => {
      const { x, y } = getPos(e);
      const candidates = Matter.Composite.allBodies(engine.world)
        .filter(b => !b.isStatic)
        .reverse();

      for (const body of candidates) {
        if (Matter.Query.point([body], { x, y }).length > 0) {
          dragBody = body;
          dragOffsetX = x - body.position.x;
          dragOffsetY = y - body.position.y;
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(body, 0);
          break;
        }
      }
    };


    const onPointerMove = (e: PointerEvent) => {
      if (!dragBody) return;
      const { x, y } = getPos(e);
      const tx = x - dragOffsetX;
      const ty = y - dragOffsetY;
      Matter.Body.setVelocity(dragBody, {
        x: (tx - dragBody.position.x) * 0.8,
        y: (ty - dragBody.position.y) * 0.8,
      });
      Matter.Body.setPosition(dragBody, { x: tx, y: ty });
    };

    const onPointerUp = () => {
      if (!dragBody) return;
      dragBody = null;
    };

    stage.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);


    const observer = new IntersectionObserver(
      ([entry]) => { isPaused = !entry.isIntersecting; },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);


    const onResize = () => {
      W = stage.offsetWidth;
      H = stage.offsetHeight;
      Matter.Body.setPosition(floor, { x: W / 2, y: H + WALL / 2 });
      Matter.Body.setPosition(wallR, { x: W + WALL / 2, y: H / 2 });
      Matter.Body.setPosition(wallL, { x: -WALL / 2, y: H / 2 });
    };
    window.addEventListener('resize', onResize);

    return () => {
      spawnTimers.current.forEach(clearTimeout);
      gsap.ticker.remove(tick);
      observer.disconnect();
      stage.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      domMapRef.current.forEach(({ el }) => el.remove());
      domMapRef.current.clear();
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, []);


  useGSAP(() => {
    if (!containerRef.current) return;

    // just for container to stay in view for 1 sec like puase for
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=100',
      scrub: true,
      pin: true,
    });


    ScrollTrigger.create({
      trigger: containerRef.current,
      once: true,
      start: "top 80%",
      onEnter: () => {
        if (hasSpawned.current) return;
        hasSpawned.current = true;
        spawnFnRef.current?.(TABS[0].data);
      }
    });


  }, {
    scope: containerRef
  });


  const handleTabChange = (idx: number) => {
    if (idx === activeTab) return;
    if (isTransitioning.current) return; // block during animation
    if (!hasSpawned.current) return;     // don't switch before first spawn

    isTransitioning.current = true;
    setActiveTab(idx);

    clearFnRef.current?.(() => {
      spawnFnRef.current?.(TABS[idx].data);
      isTransitioning.current = false;
    });
  };

  return (
    <section
      ref={containerRef}
      className="my-capabilities common-padding h-screen relative w-full"
    >
      <div className="h-full relative w-full bg-white rounded-3xl overflow-hidden flex flex-col">

        {/* ── Tab navigation ── */}
        <nav className="z-10 bg-transparent absolute top-0 left-0 right-0 flex group items-center justify-center gap-2 sm:gap-6 pt-4 sm:pt-7 pb-2 shrink-0 flex-wrap px-2">
          {TABS.map((tab, i) => (
            <Button
              className={`
                  font-mono text-[9px] sm:text-[11px] uppercase tracking-widest sm:tracking-[0.14em]
                  transition-all duration-200 outline-none h-6 sm:h-7
                  ${i === activeTab
                  ? 'rounded-full px-3 sm:px-4 py-1 text-neutral-900 font-bold text-[10px] sm:text-[11px]'
                  : 'text-neutral-400 hover:text-neutral-700 px-3 sm:px-4 py-1 text-[9px] sm:text-[11px]'
                }
                `}
              svgColor={i === activeTab ? '#000' : '#888'}
              onClick={() => handleTabChange(i)}
            >
              {i === activeTab ? `${tab.label}` : tab.label}
            </Button>
          ))}
        </nav>

        {/* ── Explore CTA ── */}
        {/* <div className="relative z-10 flex justify-center pb-1 shrink-0">
          <button className="
            bg-[#e63f5e] text-white text-[13px] font-medium
            px-5 py-1.5 rounded-full border-none
            hover:bg-[#cf2d4c] active:scale-95
            transition-all duration-150 cursor-pointer
          ">
            Click to explore more..
          </button>
        </div> */}

        {/* ── Physics stage ──
              Matter body <div>s are appended here.
              position:relative is required for absolute children. ── */}
        <div
          ref={stageRef}
          className="relative flex-1 w-full overflow-hidden"
        />

      </div>
    </section>
  )
}

export default MyCapabilities