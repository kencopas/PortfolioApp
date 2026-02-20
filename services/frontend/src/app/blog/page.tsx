import { BlogEntryData } from "@/components/blog/BlogEntry";
import WritingSection from "@/components/home/WritingSection";

export default function Blog() {
  const blogEntryData: BlogEntryData = {
    id: "0001",
    title: "Designing Environment-Aware Docker Deployments",
    description:
      "How to structure compose files and image tagging for reproducible infrastructure.",
    year: 2026,
    read_time_minutes: 9,
    category: "Infrastructure",
  };
  const blogEntries: BlogEntryData[] = [
    blogEntryData,
    blogEntryData,
    blogEntryData,
  ];

  return <WritingSection title="Technical Writing" blogEntries={blogEntries} />;
}
