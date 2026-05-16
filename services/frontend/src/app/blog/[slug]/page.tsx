import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import remarkGfm from "remark-gfm";
import { SurfaceSubtext } from "@/components/ui/Typography";
import rehypePrettyCode from "rehype-pretty-code";
import { MarkdownAsync } from "react-markdown";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;

  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
    };
  } catch {
    return { title: "Post not found" };
  }
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="md:max-w-9/10 lg:max-w-4/5 m-auto py-8 px-4 text-text-primary">
      <header className="mb-8">
        <h1 className="text-left text-[42px] font-semibold py-5 leading-tight">
          {post.frontmatter.title}
        </h1>
        <SurfaceSubtext className="text-left text-text-secondary pb-8 font-medium lg:text-lg">
          {post.frontmatter.summary}
        </SurfaceSubtext>
        {post.frontmatter.date && (
          <span className="text-text-muted font-medium">
            {`${post.frontmatter.readTimeMinutes} min read • ${post.frontmatter.tags?.[0] ?? "Technology"} • ${post.frontmatter.date}`}
          </span>
        )}
        <div className="border-t my-5 border-border" />
        <a
          target="_blank"
          href="https://www.linkedin.com/in/kennycopas"
          className="text-lg underline underline-offset-3"
        >
          Kenneth Copas
        </a>
      </header>

      <div className="prose prose-invert max-w-none prose-p:text-lg">
        <MarkdownAsync
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[[rehypePrettyCode, { theme: "github-dark" }]]}
        >
          {post.content}
        </MarkdownAsync>
      </div>
    </main>
  );
}
