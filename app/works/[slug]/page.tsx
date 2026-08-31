import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import WorkDetail from "@/components/works/WorkDetail";
import { getWork, works } from "@/lib/works";

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWork(slug);

  if (!work) notFound();

  const content = await fs.readFile(
    path.join(process.cwd(), "data", "works", work.contentPath),
    "utf8"
  );

  return <WorkDetail work={work} content={content} />;
}
