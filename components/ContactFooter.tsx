'use client';

import { useLenis } from '@/providers/ScrollSmoothProvider';

export default function ContactFooter() {
  const lenis = useLenis();

  const backToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-8 border-t border-white/5">
      <div className="px-5 py-8 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] tracking-[0.15em] text-white/40"
          style={{ fontFamily: 'var(--font-mono), ui-monospace, monospace' }}>
          <span>
            DESIGNED BY <span className="text-white/80">SRIKAR</span>
          </span>
          <button onClick={backToTop} className="text-white/40 hover:text-white transition-colors duration-200">
            BACK TO TOP
          </button>
        </div>
      </div>
    </footer>
  );
}
