'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FONT_MONO = 'var(--font-mono), ui-monospace, monospace';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const AVATAR = "/myimage.png"

const socials = [
  { label: 'GitHub', href: 'https://github.com/Srikar132', src: 'https://img.icons8.com/fluency/48/github.png' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/srikar-chinthala-b99a5a2a2/', src: 'https://img.icons8.com/color/48/linkedin.png' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/srikar132/', src: 'https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.png' },
  { label: 'Email', href: 'mailto:srikarchinthala25@gmail.com', src: 'https://img.icons8.com/fluency/48/gmail-new.png' },
];

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
    'w-full bg-white/[0.03] border border-white/10 focus:border-white/40 rounded-xl px-4 py-3.5 text-white placeholder-white/25 outline-none transition-all duration-300 normal-case';
  const labelCls = 'text-[11px] tracking-[0.25em] uppercase text-white/50 mb-2 block';

  return (
    <section id="contact" ref={sectionRef} className="w-full relative min-h-screen overflow-hidden">

      <div className="px-5 sm:px-8 lg:px-12 pt-10 lg:pt-16 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-stretch">
            {/* Left — avatar + socials */}
            <div ref={revealRef} className="c-rise flex flex-col">
              <div className="flex-1 rounded-2xl border-[5px] border-white/80 p-2 bg-white/5 relative group">
                <div className="w-full h-full overflow-hidden rounded-xl bg-surface relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
                  <Image
                    src={AVATAR}
                    alt="Profile"
                    width={800}
                    height={800}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="c-rise mt-6 flex items-center justify-center gap-6">
                {socials.map(({ label, href, src }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <Image src={src} alt={label} width={22} height={22} />
                  </Link>
                ))}
              </div>

              <div className="c-rise mt-5 text-center text-[11px] tracking-[0.25em] uppercase text-white/40" style={{ fontFamily: FONT_MONO }}>
                Open to opportunities
              </div>
            </div>

            {/* Right — form */}
            <form ref={formRef} onSubmit={onSubmit} className="c-rise flex flex-col justify-center gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold leading-[1.1] tracking-tight text-white normal-case">
                  Let&rsquo;s build something remarkable.
                </h2>
                <p className="mt-3 text-white/45 leading-relaxed font-light normal-case max-w-md" style={{ fontFamily: 'var(--font-fredoka), sans-serif' }}>
                  Open to freelance work, agency collaborations, and full-time roles. Drop a message and I&rsquo;ll get back to you.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="from_name" className={labelCls} style={{ fontFamily: FONT_MONO }}>
                    Name
                  </label>
                  <input id="from_name" name="from_name" type="text" required placeholder="Your name" className={inputCls} />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="reply_to" className={labelCls} style={{ fontFamily: FONT_MONO }}>
                    Email
                  </label>
                  <input id="reply_to" name="reply_to" type="email" required placeholder="you@email.com" className={inputCls} />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className={labelCls} style={{ fontFamily: FONT_MONO }}>
                    Message
                  </label>
                  <textarea id="message" name="message" required rows={5} placeholder="Tell me about your project…" className={`${inputCls} resize-none`} />
                </div>
              </div>

              <div className="flex items-center gap-5 mt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 rounded-full px-7 py-3 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
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
      </div>
    </section>
  );
}
