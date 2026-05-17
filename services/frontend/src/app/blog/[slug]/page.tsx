import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import remarkGfm from "remark-gfm";
import { SurfaceSubtext } from "@/components/ui/Typography";
import rehypePrettyCode from "rehype-pretty-code";
import { MarkdownAsync } from "react-markdown";
import { FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa";

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
    <main className="mx-auto w-full px-2 py-6 text-text-primary sm:px-0">
      <header className="mb-4 lg:mb-10">
        <h1 className="max-w-4xl py-5 text-2xl font-semibold leading-tight sm:text-5xl">
          {post.frontmatter.title}
        </h1>
      </header>

      <div className="flex flex-col gap-4 lg:gap-20 lg:flex-row">
        {/* LEFT SIDEBAR */}
        <aside className="w-full lg:w-72 lg:shrink-0">
          <div className="sticky top-12">
            {post.frontmatter.date && (
              <div className="pb-6 text-xs font-medium text-text-muted sm:text-sm">
                <div className="flex flex-row gap-1 lg:flex-col sm:gap-2 lg:items-start">
                  <span>{post.frontmatter.readTimeMinutes} min read</span>
                  <span className="inline lg:hidden">•</span>
                  <span>{post.frontmatter.tags?.[0] ?? "Technology"}</span>
                  <span className="inline lg:hidden">•</span>
                  <span>{post.frontmatter.date}</span>
                </div>
              </div>
            )}
            <div className="mb-6 border-t border-border" />
            <a
              target="_blank"
              href="https://www.linkedin.com/in/kennycopas"
              className="underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              Kenneth Copas
            </a>
            <SurfaceSubtext className="pb-6 pt-4 font-medium text-text-secondary">
              {post.frontmatter.summary}
            </SurfaceSubtext>
            <div className="mb-6 border-t border-border" />
            <div className="hidden lg:flex gap-15 justify-center">
              <a target="_blank" href="https://www.github.com/kencopas">
                <FaGithub size={25} />
              </a>
              <a target="_blank" href="https://www.youtube.com/@Kenny-Copas">
                <FaYoutube size={25} />
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/kennycopas">
                <FaLinkedin size={25} />
              </a>
            </div>
          </div>
        </aside>

        {/* BLOG CONTENT */}
        <article className="min-w-0 flex-1">
          <div
            className="
              prose
              prose-invert
              max-w-none

              sm:prose-lg
              sm:prose-p:text-lg

              prose-pre:overflow-x-auto
              prose-pre:max-w-full
            "
          >
            <MarkdownAsync
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[[rehypePrettyCode, { theme: "github-dark" }]]}
            >
              {post.content}
            </MarkdownAsync>
          </div>
        </article>
      </div>
    </main>
  );
}
