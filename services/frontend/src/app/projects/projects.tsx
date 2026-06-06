import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { Project } from "@/components/projects/ProjectCard";

const projectsDirectory = path.join(process.cwd(), "content", "projects");

export function getProjects(): Project[] {
  const fileNames = fs.readdirSync(projectsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data } = matter(fileContents);

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        stack: data.stack,
        signal: Number(data.signal ?? 0),
      } satisfies Project;
    })
    .sort((a, b) => b.signal - a.signal);
}

export const projects = getProjects();
