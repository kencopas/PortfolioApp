import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  readTimeMinutes: number;
  summary?: string;
  tags?: string[];
};

function calculateReadingTime(markdown: string): number {
  const words = markdown
    .replace(/[#_*`>\-\n]/g, " ") // strip markdown syntax
    .split(/\s+/)
    .filter(Boolean);

  const wordCount = words.length;

  const wordsPerMinute = 200;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return minutes;
}

function parsePostMeta(fileName: string): BlogMeta {
  const slug = fileName.replace(/\.md$/, "");
  const filePath = path.join(BLOG_DIR, fileName);
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    readTimeMinutes: calculateReadingTime(content),
    summary: data.summary ? String(data.summary) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
  };
}

export function getAllPostsMeta(): BlogMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map(parsePostMeta);

  // Sort newest first (ISO dates required)
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}

export function getRecentPosts(count: number): BlogMeta[] {
  return getAllPostsMeta().slice(0, count);
}

export function getAllPostSlugs(): string[] {
  return getAllPostsMeta().map((p) => p.slug);
}

export async function getPostBySlug(slug: string): Promise<{
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    readTimeMinutes: number;
    summary?: string;
    tags?: string[];
  };
  content: string; // <- markdown
}> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const file = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(file);

  return {
    slug,
    frontmatter: {
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      readTimeMinutes: calculateReadingTime(content),
      summary: data.summary ? String(data.summary) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    },
    content,
  };
}
