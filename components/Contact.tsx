'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const FONT_MONO = 'var(--font-mono), ui-monospace, monospace';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      });
      tl.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 0.8, ease: 'power3.inOut' }
      ).fromTo(
        revealRef.current?.querySelectorAll('.c-rise') ?? [],
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
        '-=0.4'
      );
    },
    { scope: sectionRef }
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error');
      setError('Email service not configured yet.');
      return;
    }

    setStatus('sending');
    setError('');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus('success');
      formRef.current.reset();
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again or email me directly.');
    }
  };

  const inputCls =
    'w-full bg-transparent border-b border-white/15 focus:border-white/60 outline-none py-3 text-white placeholder-white/30 transition-colors duration-300 normal-case';
  const labelCls = 'text-[11px] tracking-[0.25em] uppercase text-white/40';

  return (
    <section id="contact" ref={sectionRef} className="w-full common-padding py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto">
        {/* label */}
        <div className="flex items-center gap-3 mb-14">
          <div ref={lineRef} className="w-px h-6 bg-white/30" style={{ transformOrigin: 'top center' }} />
          <span className="text-xs tracking-[0.3em] uppercase text-white/30" style={{ fontFamily: FONT_MONO }}>
            Contact
          </span>
        </div>

        <div ref={revealRef} className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-24 items-start">
          {/* left — pitch */}
          <div>
            <h2 className="c-rise text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight text-white normal-case">
              Let&rsquo;s build something remarkable.
            </h2>
            <p
              className="c-rise mt-6 max-w-md text-white/45 leading-relaxed font-light normal-case"
              style={{ fontFamily: 'var(--font-fredoka), sans-serif' }}
            >
              Open to freelance work, agency collaborations, and full-time roles. Drop a message and
              I&rsquo;ll get back to you.
            </p>
            <a
              href="mailto:srikarchinthala25@gmail.com"
              className="c-rise mt-8 inline-block text-sm text-white/60 hover:text-white transition-colors"
              style={{ fontFamily: FONT_MONO }}
            >
              srikarchinthala25@gmail.com
            </a>
          </div>

          {/* right — form */}
          <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-7">
            <div className="c-rise flex flex-col gap-2">
              <label htmlFor="from_name" className={labelCls} style={{ fontFamily: FONT_MONO }}>
                Name
              </label>
              <input id="from_name" name="from_name" type="text" required placeholder="Your name" className={inputCls} />
            </div>

            <div className="c-rise flex flex-col gap-2">
              <label htmlFor="reply_to" className={labelCls} style={{ fontFamily: FONT_MONO }}>
                Email
              </label>
              <input id="reply_to" name="reply_to" type="email" required placeholder="you@email.com" className={inputCls} />
            </div>

            <div className="c-rise flex flex-col gap-2">
              <label htmlFor="message" className={labelCls} style={{ fontFamily: FONT_MONO }}>
                Message
              </label>
              <textarea id="message" name="message" required rows={4} placeholder="Tell me about your project…" className={`${inputCls} resize-none`} />
            </div>

            <div className="c-rise flex items-center gap-5 mt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/60 rounded-full px-6 py-2.5 text-[11px] tracking-[0.2em] uppercase text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: FONT_MONO }}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
                <span>↗</span>
              </button>

              {status === 'success' && (
                <span className="text-[11px] tracking-[0.15em] uppercase text-green-400" style={{ fontFamily: FONT_MONO }}>
                  Message sent ✓
                </span>
              )}
              {status === 'error' && (
                <span className="text-[11px] tracking-[0.15em] text-red-400 normal-case" style={{ fontFamily: FONT_MONO }}>
                  {error}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
