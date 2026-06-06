import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { MarkdownAsync } from "react-markdown";
import { FaGithub } from "react-icons/fa";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;

  try {
    const project = await getProjectBySlug(slug);

    return {
      title: project.frontmatter.title,
      description: project.frontmatter.description,
    };
  } catch {
    return {
      title: "Project not found",
    };
  }
}

export default async function ProjectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  let project;

  try {
    project = await getProjectBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      {/* HERO */}
      <section className="mb-12">
        <h2 className="mb-4 text-4xl font-bold sm:text-5xl text-text-primary">
          {project.frontmatter.title}
        </h2>

        <p className="max-w-3xl text-lg text-text-secondary">
          {project.frontmatter.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.frontmatter.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-3 py-1 text-sm text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* BODY */}
      <section className="grid gap-12 lg:grid-cols-[300px_1fr]">
        {/* PROJECT DETAILS */}
        <aside>
          <div className="sticky top-12 rounded-xl border border-border p-6">
            <h2 className="mb-6 text-lg font-semibold text-text-primary">
              Project Details
            </h2>

            <div className="space-y-5 text-sm">
              <div>
                <div className="text-text-secondary">Role</div>
                <div className="text-text-muted">
                  {project.frontmatter.role ?? "AI Engineer"}
                </div>
              </div>

              <div>
                <div className="text-text-secondary">Status</div>
                <div className="text-text-muted">
                  {project.frontmatter.status ?? "Development"}
                </div>
              </div>

              <div>
                <div className="text-text-secondary">Duration</div>
                <div className="text-text-muted">
                  {project.frontmatter.duration ?? "N/A"}
                </div>
              </div>
            </div>

            {(project.frontmatter.github.length > 0 ||
              project.frontmatter.demo) && (
              <div className="my-6 border-t border-border" />
            )}

            <div className="flex flex-col gap-3">
              {project.frontmatter.github.length > 0 && (
                <div className="flex flex-col gap-3">
                  {project.frontmatter.github.map((url, index) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-text-primary"
                    >
                      <FaGithub />
                      {project.frontmatter.github.length === 1
                        ? "Source Code"
                        : `Source Code (${index + 1})`}
                    </a>
                  ))}
                </div>
              )}

              {project.frontmatter.demo && (
                <a
                  href={project.frontmatter.demo}
                  target="_blank"
                  className="text-text-primary"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </aside>

        {/* CASE STUDY CONTENT */}
        <article>
          <div
            className="
        prose
        prose-invert
        max-w-none
        prose-headings:scroll-mt-24
        sm:prose-lg
      "
          >
            {project.content ? (
              <MarkdownAsync
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[[rehypePrettyCode, { theme: "github-dark" }]]}
              >
                {project.content}
              </MarkdownAsync>
            ) : (
              "Looks like I haven't documented this project just yet, stay tuned!"
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
