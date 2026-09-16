import SlideFade from "@/components/motion/SlideFade";
import BlogEntry from "@/components/blog/BlogEntry";
import { BlogMeta } from "@/lib/blog";
import { SurfaceHeading } from "@/components/ui/Typography";

import Section from "./Section";

interface WritingSectionProps {
  blogEntries: BlogMeta[];
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
      {
        // Compensate for missing entries by adding placeholder empty space
        blogEntries.length == 0 ? (
          <div className={`min-h-[30vh]`}>
            <SurfaceHeading className="text-center pt-20 text-text-secondary">
              Technical Writing Coming Soon!
            </SurfaceHeading>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {blogEntries.map((blogEntryData, i) => (
              <SlideFade key={`${i}-${blogEntryData.slug}`} y={20}>
                <BlogEntry
                  key={`${i}-${blogEntryData.slug}`}
                  blogEntryData={blogEntryData}
                  className="flex-1"
                />
              </SlideFade>
            ))}
          </div>
        )
      }
    </Section>
  );
}
