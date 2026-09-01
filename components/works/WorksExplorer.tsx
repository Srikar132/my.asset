import Link from "next/link";
import { ArrowUpRight, Folder } from "lucide-react";
import type { WorkProject } from "@/lib/works";

type WorksExplorerProps = { works: WorkProject[] };

export default function WorksExplorer({ works }: WorksExplorerProps) {
  return (
    <main className="min-h-screen bg-background px-5 py-24 text-foreground sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] text-foreground/30 normal-case">A collection of things I&rsquo;ve built.</p>
          </div>
          <span className="font-mono text-[10px] text-foreground/25">{String(works.length).padStart(2, "0")}</span>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-16">
          {works.map((work, index) => (
            <Link
              href={`/works/${work.slug}`}
              key={work.slug}
              className="group flex min-w-0 flex-col items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-8 focus-visible:ring-offset-background"
            >
              <div className="relative flex h-20 w-24 items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03] sm:h-24 sm:w-28">
                <div className="absolute inset-x-0 bottom-0 h-[82%] rounded-[5px] rounded-tl-[3px] bg-sky-300 shadow-[0_14px_30px_rgba(125,211,252,0.10)]" />
                <div className="absolute left-0 top-0 h-6 w-11 rounded-t-[5px] rounded-tr-[3px] bg-sky-300" />
                <div className="absolute inset-x-1 bottom-1 top-3 rounded-[3px] bg-sky-200/10" />
              </div>

              <div className="mt-4 flex w-full items-center gap-2">
                <span className="min-w-0 truncate text-sm font-medium text-foreground normal-case">{work.name}</span>
                <ArrowUpRight className="size-3 shrink-0 text-foreground/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <span className="mt-1 font-mono text-[9px] text-foreground/25">{String(index + 1).padStart(2, "0")}</span>
            </Link>
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
