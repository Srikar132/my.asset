import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, FileText, Folder, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import MarkdownContent from "@/components/works/MarkdownContent";
import type { WorkProject } from "@/lib/works";

type WorkDetailProps = {
  work: WorkProject;
  content: string;
};

export default function WorkDetail({ work, content }: WorkDetailProps) {
  return (
    <main className="min-h-screen bg-background px-4 py-5 text-foreground sm:px-8 sm:py-8 lg:px-12">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-surface/70 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <header className="flex h-12 items-center border-b border-white/10 bg-white/[0.025] px-4 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="h-3 w-3 rounded-full bg-white/15" />
          </div>
          <div className="mx-auto flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-foreground/30">
            <Folder className="size-3.5" />
            <span className="hidden sm:inline">WORKS /</span>
            <span>{work.name}</span>
          </div>
          <span className="w-[52px]" />
        </header>

        <div className="border-b border-white/10 px-5 py-6 sm:px-8 sm:py-8">
          <Button asChild variant="ghost" size="sm" className="-ml-3 mb-7 text-foreground/45">
            <Link href="/works"><ArrowLeft className="size-4" /> Back to works</Link>
          </Button>

          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 font-mono text-[9px] tracking-[0.24em] text-accent/70">/ PROJECT FILE</p>
              <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{work.name}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/45 sm:text-base">{work.description}</p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={work.github} target="_blank" rel="noreferrer">
                  <Github className="size-3.5" /> GitHub <ArrowUpRight className="size-3" />
                </a>
              </Button>
              {work.live ? (
                <Button asChild size="sm">
                  <a href={work.live} target="_blank" rel="noreferrer">
                    <ExternalLink className="size-3.5" /> Live <ArrowUpRight className="size-3" />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {work.techStack.map((tech) => (
              <span key={tech} className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[9px] text-foreground/45">
                {tech}
              </span>
            ))}
            <span className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[9px] text-foreground/30">
              {work.category}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[180px_1fr]">
          <aside className="hidden border-r border-white/10 p-6 lg:block">
            <div className="sticky top-6">
              <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] text-foreground/25">
                <FileText className="size-3.5" /> README.MD
              </div>
              <div className="mt-5 space-y-2 font-mono text-[9px] text-foreground/20">
                <p>01  OBJECTIVE</p>
                <p>02  STACK</p>
                <p>03  ARCHITECTURE</p>
                <p>04  CHALLENGES</p>
                <p>05  THOUGHTS</p>
              </div>
            </div>
          </aside>

          <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <MarkdownContent content={content} />
          </div>
        </div>
      </div>
    </main>
  );
}
