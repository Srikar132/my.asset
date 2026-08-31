import Link from "next/link";
import { ArrowUpRight, Folder, Github } from "lucide-react";
import type { WorkProject } from "@/lib/works";

type WorksExplorerProps = {
  works: WorkProject[];
};

export default function WorksExplorer({ works }: WorksExplorerProps) {
  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-8 sm:py-8 lg:px-12">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-surface/70 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <header className="flex h-12 items-center border-b border-white/10 bg-white/[0.025] px-4 sm:px-5">
          <div className="flex items-center gap-2" aria-label="Window controls">
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="h-3 w-3 rounded-full bg-white/15" />
          </div>
          <div className="mx-auto flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-foreground/35">
            <Folder className="size-3.5" />
            <span>WORKS</span>
          </div>
          <span className="w-[52px] text-right font-mono text-[10px] text-foreground/30">
            {works.length.toString().padStart(2, "0")}
          </span>
        </header>

        <div className="flex min-h-[calc(100vh-7rem)] flex-col">
          <div className="border-b border-white/10 px-5 py-7 sm:px-8 sm:py-9">
            <p className="mb-2 font-mono text-[10px] tracking-[0.24em] text-accent/70">/ ARCHIVE</p>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Works</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/45 sm:text-base">
              A small archive of things I&apos;ve built, broken, learned from, and shipped.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
            {works.map((work, index) => (
              <Link
                href={`/works/${work.slug}`}
                key={work.slug}
                className="group min-h-48 bg-surface p-5 transition-colors hover:bg-white/[0.045] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:min-h-56 sm:p-6"
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <Folder className="size-14 stroke-[1.15] text-accent/80 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 sm:size-16" />
                    <span className="font-mono text-[9px] text-foreground/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-10">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <h2 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">{work.name}</h2>
                      <ArrowUpRight className="size-3.5 text-foreground/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                    <p className="line-clamp-2 text-[10px] leading-5 text-foreground/35">{work.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {work.techStack.map((tech) => (
                        <span key={tech} className="rounded-md border border-white/8 bg-white/[0.025] px-1.5 py-1 font-mono text-[8px] text-foreground/35">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <footer className="flex flex-col gap-2 border-t border-white/10 px-5 py-3 font-mono text-[9px] text-foreground/25 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span>{works.length} {works.length === 1 ? "item" : "items"}</span>
            <span className="flex items-center gap-1.5"><Github className="size-3" /> PERSONAL PROJECT ARCHIVE</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
