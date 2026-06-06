import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectFrontmatter {
  id: string;
  title: string;
  description: string;
  stack: string[];
  github: Array<string>;

  role?: string;
  status?: string;
  duration?: string;
  demo?: string;
}

export interface Project {
  frontmatter: ProjectFrontmatter;
  content: string;
  slug: string;
}

const projectsDirectory = path.join(process.cwd(), "content", "projects");

export function getAllProjectSlugs(): string[] {
  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Project not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: {
      id: data.id,
      title: data.title,
      description: data.description,
      stack: data.stack ?? [],
      github: Array.isArray(data.github)
        ? data.github
        : data.github
          ? [data.github]
          : [],
      role: data.role,
      duration: data.duration,
      status: data.status,
    },
    content,
  };
}
