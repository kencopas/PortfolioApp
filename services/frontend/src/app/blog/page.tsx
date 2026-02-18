import React from "react";
import BlogEntry, { BlogEntryData } from "@/components/blog/BlogEntry";
import Section from "@/components/home/Section";
import Surface from "@/components/ui/Surface";

export default function Blog() {
  const blogEntryData: BlogEntryData = {
    title: "Designing Environment-Aware Docker Deployments",
    description:
      "How to structure compose files and image tagging for reproducible infrastructure.",
    year: 2026,
    read_time_minutes: 9,
    category: "Infrastructure",
  };

  return (
    <Section title="Technical Writing">
      <Surface className="flex flex-col gap-4">
        <BlogEntry blogEntryData={blogEntryData} className="flex-1" />
        <BlogEntry blogEntryData={blogEntryData} className="flex-1" />
        <BlogEntry blogEntryData={blogEntryData} className="flex-1" />
      </Surface>
    </Section>
  );
}
