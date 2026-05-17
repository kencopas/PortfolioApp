import WritingSection from "@/components/home/WritingSection";
import { getRecentPosts } from "@/lib/blog";

export default function Blog() {
  const blogEntries = getRecentPosts(10);

  return (
    <>
      <WritingSection title="Technical Writing" blogEntries={blogEntries} />
      {
        // Compensate for missing entries by adding placeholder empty space
        blogEntries.length < 3 && (
          <div className={`min-h-[${40 / blogEntries.length}vh]`} />
        )
      }
    </>
  );
}
