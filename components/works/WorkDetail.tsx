import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import MarkdownContent from "@/components/works/MarkdownContent";
import type { WorkProject } from "@/lib/works";

type WorkDetailProps = { work: WorkProject; content: string };

const linkClassName =
  "inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.16em] uppercase text-foreground/55 transition-colors hover:text-foreground";

export default function WorkDetail({ work, content }: WorkDetailProps) {
  return (
    <main className="min-h-screen bg-background px-5 py-24 text-foreground sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.16em] text-foreground/35 uppercase transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Back to works
        </Link>

        <header className="mt-12 border-b border-white/10 pb-10 sm:mt-16 sm:pb-12">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-normal tracking-[-0.04em] text-white normal-case sm:text-6xl">
                {work.name}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/45 normal-case sm:text-lg">
                {work.description}
              </p>
            </div>

            <div className="flex shrink-0 gap-5">
              <a className={linkClassName} href={work.github} target="_blank" rel="noreferrer">
                <Github className="size-3.5" /> GitHub <ArrowUpRight className="size-3" />
              </a>
              {work.live ? (
                <a className={linkClassName} href={work.live} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-3.5" /> Live <ArrowUpRight className="size-3" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
            {work.techStack.map((tech) => (
              <span key={tech} className="font-mono text-[9px] text-foreground/30 normal-case">
                {tech}
              </span>
            ))}
          </div>
        </header>

        <div className="pt-12 sm:pt-16">
          <MarkdownContent content={content} />
        </div>
      </div>
    </main>
  );
}
