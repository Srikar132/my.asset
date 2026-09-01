'use client';

import { useLenis } from '@/providers/ScrollSmoothProvider';
import Link from 'next/link';

export default function ContactNavbar() {
  const lenis = useLenis();

  const goHome = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="w-full z-50">
      <div className="px-5 sm:px-8 lg:px-12 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold tracking-wider whitespace-nowrap text-white hover:text-white/70 transition-colors">
            $r!k@r
          </Link>
          <button
            onClick={goHome}
            className="text-[11px] tracking-[0.25em] uppercase text-white/50 hover:text-white transition-colors duration-200"
            style={{ fontFamily: 'var(--font-mono), ui-monospace, monospace' }}
          >
            ← BACK
          </button>
        </div>
      </div>
    </nav>
  );
}
