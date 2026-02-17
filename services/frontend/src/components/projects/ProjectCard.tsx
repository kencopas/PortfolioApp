import React, { ReactNode } from "react";
import Surface from "@/components/ui/Surface";
import TechStack from "@/components/projects/TechStack";

export interface Project {
  title: string;
  description: ReactNode;
  stack?: string[];
}

interface ProjectCardProps {
  project: Project;
  children?: ReactNode;
  className?: string;
  stackMode?: "vertical" | "horizontal";
}

export default function ProjectCard({
  project,
  children,
  className = "",
  stackMode = "vertical",
}: ProjectCardProps) {
  return (
    <Surface
      className={`mx-auto p-8 text-text-primary bg-background-secondary ${className}`}
    >
      <div className="flex flex-col gap-2">
        {/* Project Title */}
        <h3 className="text-2xl font-semibold">{project.title}</h3>
        {/* Project Description */}
        <p className="text-text-muted">{project.description}</p>
        {/* Project Stack */}
        {project.stack && (
          <TechStack
            stack={project.stack || []}
            stackMode={stackMode}
            className="text-text-secondary py-2"
          />
        )}
        {children}
      </div>
    </Surface>
  );
}
