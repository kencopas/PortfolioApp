import BlogEntry, { BlogEntryData } from "@/components/blog/BlogEntry";
import Section from "@/components/home/Section";
import SlideFade from "@/components/motion/SlideFade";

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
      <div className="flex flex-col gap-6">
        {blogEntries.map((blogEntryData, i) => (
          <SlideFade key={`${i}-${blogEntryData.id}`} y={20}>
            <BlogEntry
              key={`${i}-${blogEntryData.id}`}
              blogEntryData={blogEntryData}
              className="flex-1"
            />
          </SlideFade>
        ))}
      </div>
    </Section>
  );
}
