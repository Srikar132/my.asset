"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { WorkProject } from "@/lib/works";

type WorksExplorerProps = { works: WorkProject[] };

function WorkFolderItem({ work, index }: { work: WorkProject; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div
        className="group relative flex min-w-0 flex-col items-start"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpen(false);
          }
        }}
      >
        <PopoverTrigger asChild>
          <Link
            href={`/works/${work.slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-8 focus-visible:ring-offset-background"
            aria-label={`Open ${work.name}`}
          >
            <div className="relative flex h-16 w-20 items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04] sm:h-18 sm:w-22">
              <div className="absolute inset-x-0 bottom-0 h-[82%] rounded-[6px] rounded-tl-[4px] border border-sky-100/20 bg-[linear-gradient(145deg,rgba(186,230,253,0.98),rgba(56,189,248,0.86)_48%,rgba(14,165,233,0.72))] shadow-[0_16px_42px_rgba(56,189,248,0.18),inset_0_1px_0_rgba(255,255,255,0.48)]" />
              <div className="absolute left-0 top-0 h-5 w-9 rounded-t-[6px] rounded-tr-[4px] border-l border-t border-sky-100/20 bg-[linear-gradient(145deg,rgba(224,242,254,0.98),rgba(125,211,252,0.86))] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]" />
              <div className="absolute inset-x-1 bottom-1 top-3 rounded-[4px] bg-white/10" />
              <div className="absolute inset-x-3 top-5 h-px bg-white/35" />
            </div>
          </Link>
        </PopoverTrigger>

        <div className="mt-4 flex w-full items-center gap-2">
          <Link
            href={`/works/${work.slug}`}
            className="min-w-0 truncate text-sm font-medium text-foreground normal-case transition-colors hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70"
          >
            {work.name}
          </Link>
          <ArrowUpRight className="size-3 shrink-0 text-sky-100/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-100/55" />
        </div>
        <span className="mt-1 font-mono text-[9px] text-foreground/25">
          {String(index + 1).padStart(2, "0")}
        </span>

        <PopoverContent
          side="right"
          align="start"
          className="pointer-events-none"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] tracking-[0.22em] text-sky-200/45 uppercase">
                {work.category}
              </p>
              <h2 className="mt-2 text-lg font-medium leading-none text-white normal-case">
                {work.name}
              </h2>
            </div>
            <span className="rounded-full border border-sky-200/10 bg-sky-200/5 px-2 py-1 font-mono text-[9px] text-sky-100/55">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <p className="text-sm leading-6 text-foreground/58 normal-case">
            {work.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {work.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 font-mono text-[9px] text-foreground/40"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-foreground/55">
              <Github className="size-4" />
            </span>
            {work.live ? (
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-foreground/55">
                <ExternalLink className="size-4" />
              </span>
            ) : null}
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
}

export default function WorksExplorer({ works }: WorksExplorerProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.10),transparent_34%),var(--background)] px-5 py-20 text-foreground sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          aria-label="Back home"
          className="mb-12 inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-foreground/45 transition-colors hover:border-sky-200/25 hover:bg-sky-200/[0.06] hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <div className="mb-14 flex items-end justify-between border-b border-white/10 pb-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] text-sky-100/35 normal-case">
              A collection of things I&rsquo;ve built.
            </p>
          </div>
          <span className="font-mono text-[10px] text-foreground/25">{String(works.length).padStart(2, "0")}</span>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-14">
          {works.map((work, index) => (
            <WorkFolderItem key={work.slug} work={work} index={index} />
          ))}
        </div>

        <div className="mt-28 border-t border-white/10 pt-16 sm:mt-36 sm:pt-20">
          <p
            className="max-w-3xl text-[clamp(1.6rem,3.4vw,2.35rem)] font-normal leading-[1.3] text-white normal-case"
            style={{ fontFamily: 'var(--font-fredoka), sans-serif' }}
          >
            Have an idea worth building? I&rsquo;d love to hear about it and see what we can make together.
          </p>
          <Link
            href="/?contact"
            className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-white uppercase transition-colors hover:text-white/60"
          >
            Contact me <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
