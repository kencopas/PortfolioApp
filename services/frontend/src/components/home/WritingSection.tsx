import React from "react";
import BlogEntry, { BlogEntryData } from "@/components/blog/BlogEntry";
import Section from "@/components/home/Section";
import SlideFade from "@/components/motion/SlideFade";
import Surface from "@/components/ui/Surface";

interface WritingSectionProps {
  blogEntries: BlogEntryData[];
  title: string;
  className?: string;
}

export default function WritingSection({
  blogEntries,
  title,
  className = "",
}: WritingSectionProps) {
  return (
    <Section title={title} className={className}>
      <SlideFade y={20}>
        <Surface className="flex flex-col gap-4">
          {blogEntries.map((blogEntryData, i) => (
            <BlogEntry
              key={`${i}-${blogEntryData.id}`}
              blogEntryData={blogEntryData}
              className="flex-1"
            />
          ))}
        </Surface>
      </SlideFade>
    </Section>
  );
}
