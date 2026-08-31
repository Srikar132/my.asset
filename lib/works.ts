export type WorkProject = {
  slug: string;
  name: string;
  description: string;
  category: string;
  techStack: string[];
  github: string;
  live?: string;
  contentPath: string;
};

export const works: WorkProject[] = [
  {
    slug: "lockin",
    name: "LockIn",
    description:
      "AI-powered digital wellness platform with system-level app blocking, real-time usage tracking, and intelligent productivity assistance.",
    category: "AI + ANDROID SYSTEM",
    techStack: ["Flutter", "Kotlin", "Firebase"],
    github: "https://github.com/Srikar132/lockin",
    contentPath: "lockin.md",
  },
  {
    slug: "nexus-ai",
    name: "Nexus AI",
    description:
      "LLM-driven agent platform that converts high-level ideas into structured codebases using multi-agent workflows and async task execution.",
    category: "AI AGENT PLATFORM",
    techStack: ["Next.js", "FastAPI", "LangGraph"],
    github: "https://github.com/Srikar132/nexus-ai",
    contentPath: "nexus-ai.md",
  },
  {
    slug: "heal-verse",
    name: "Heal Verse",
    description:
      "AI-driven healthcare app for medication tracking, diet planning, and wellness routines with scalable backend APIs.",
    category: "HEALTHCARE AI",
    techStack: ["React Native", "Spring Boot", "AI"],
    github: "https://github.com/Srikar132/healverse-server",
    contentPath: "heal-verse.md",
  },
];

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug);
}
