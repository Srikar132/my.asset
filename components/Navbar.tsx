'use client';

import { forwardRef, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from './Button';

interface NavbarProps {
  className?: string;
}

const NAV_LINKS = [
  { label: 'About',   href: '#about'   },
  { label: 'Work',    href: '#work'    },
  { label: 'Contact', href: '#contact' },
];

const Navbar = forwardRef<HTMLElement, NavbarProps>(({ className = '' }, ref) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Refs for GSAP targets
  const overlayRef  = useRef<HTMLDivElement>(null);
  const linksRef    = useRef<HTMLDivElement>(null);
  const bar1Ref     = useRef<HTMLSpanElement>(null);
  const bar2Ref     = useRef<HTMLSpanElement>(null);
  const bar3Ref     = useRef<HTMLSpanElement>(null);
  const tlRef       = useRef<gsap.core.Timeline | null>(null);

  // Build the open/close timeline once on mount
  useGSAP(() => {
    const overlay = overlayRef.current;
    const links   = linksRef.current?.children;
    if (!overlay || !links) return;

    // Set initial states
    gsap.set(overlay, { clipPath: 'inset(0 0 100% 0)', display: 'none' });
    gsap.set(links,   { y: 60, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    // 1. Reveal overlay by unclipping from top → bottom
    tl.set(overlay, { display: 'flex' })
      .to(overlay, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.55,
        ease: 'power4.inOut',
      })
      // 2. Stagger links up into view
      .to(links, {
        y:        0,
        opacity:  1,
        duration: 0.5,
        ease:     'power3.out',
        stagger:  0.07,
      }, '-=0.25')
      // 3. Animate hamburger → × (runs in parallel with overlay reveal)
      .to(bar1Ref.current, { rotate: 45,  y:  7,  duration: 0.35, ease: 'power3.inOut' }, 0)
      .to(bar2Ref.current, { opacity: 0, x: -10,  duration: 0.2,  ease: 'power2.in'    }, 0)
      .to(bar3Ref.current, { rotate: -45, y: -7,  duration: 0.35, ease: 'power3.inOut' }, 0);

    tlRef.current = tl;
  });

  const toggleMenu = useCallback(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!menuOpen) {
      tl.play();
      document.body.style.overflow = 'hidden'; // lock scroll while open
    } else {
      tl.reverse();
      document.body.style.overflow = '';
    }
    setMenuOpen(prev => !prev);
  }, [menuOpen]);

  const closeMenu = useCallback((href: string) => {
    tlRef.current?.reverse();
    document.body.style.overflow = '';
    setMenuOpen(false);

    // Smooth-scroll to section (works with Lenis too)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 400); // wait for menu close animation
  }, []);

  return (
    <>
      <nav
        ref={ref}
        className={`w-full z-50 ${className}`}
        style={{ visibility: 'hidden' }}
      >
        <div className="flex justify-between items-center px-5 lg:px-7.5 xl:px-10 py-5">
          {/* Logo */}
          <div className="font-bold tracking-wider whitespace-nowrap relative z-[60]">
            $r!k@r
          </div>

          {/* Desktop links */}
          <div className="lg:flex hidden text-xs">
            {NAV_LINKS.map(({ label, href }) => (
              <Button key={label} href={href}>{label}</Button>
            ))}
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden relative z-[60] flex flex-col justify-center items-center w-8 h-8 gap-0 cursor-pointer"
          >
            <span
              ref={bar1Ref}
              className="block w-6 h-[1.5px] bg-current origin-center"
              style={{ marginBottom: '5px' }}
            />
            <span
              ref={bar2Ref}
              className="block w-6 h-[1.5px] bg-current origin-center"
              style={{ marginBottom: '5px' }}
            />
            <span
              ref={bar3Ref}
              className="block w-6 h-[1.5px] bg-current origin-center"
            />
          </button>
        </div>
      </nav>

      {/* ── Full-screen mobile overlay ───────────────────────────────────── */}
      {/* Lives outside <nav> so it can cover the full viewport */}
      <div
        ref={overlayRef}
        className="
          fixed inset-0 z-40
          bg-neutral-950
          flex flex-col items-start justify-end
          px-8 pb-16
          lg:hidden
        "
        style={{ display: 'none' }}
      >
        {/* Links */}
        <div ref={linksRef} className="flex flex-col gap-2 w-full">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => closeMenu(href)}
              className="
                group flex items-center justify-between w-full
                border-b border-neutral-800
                py-5
                text-left
              "
            >
              <span className="
                text-5xl font-bold tracking-tight text-white
                group-hover:text-neutral-400 transition-colors duration-200
              ">
                {label}
              </span>
              {/* Arrow indicator */}
              <span className="
                text-neutral-600 text-2xl
                group-hover:text-white group-hover:translate-x-1
                transition-all duration-200
              ">
                ↗
              </span>
            </button>
          ))}
        </div>

        {/* Footer inside menu */}
        <p className="mt-10 text-neutral-600 text-xs tracking-widest uppercase">
          © 2025 Srikar — Portfolio
        </p>
      </div>
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;