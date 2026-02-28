import WritingSection from "@/components/home/WritingSection";
import { getRecentPosts } from "@/lib/blog";

export default function Blog() {
  const blogEntries = getRecentPosts(10);

  return <WritingSection title="Technical Writing" blogEntries={blogEntries} />;
}
