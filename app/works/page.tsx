import WorksExplorer from "@/components/works/WorksExplorer";
import { works } from "@/lib/works";

export const metadata = {
  title: "Works — Srikar.dev",
  description: "A curated archive of Srikar's projects and experiments.",
};

export default function WorksPage() {
  return <WorksExplorer works={works} />;
}
