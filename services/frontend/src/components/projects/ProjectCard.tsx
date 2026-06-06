import { ReactNode } from "react";

import Surface from "@/components/ui/Surface";
import { SurfaceHeading, SurfaceSubtext } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

import TechStack from "./TechStack";

export interface Project {
  id: string;
  title: string;
  description: ReactNode;
  stack?: string[];
  signal?: number;
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
    <Button
      href={`/projects/${project.id}`}
      style="base"
      className={`
        rounded-4xl
        shadow-lg
        bg-background-secondary
        p-6
        md:p-8
        border-[1]
        border-border
        mx-auto
        text-text-primary
        ${className}
      `}
    >
      <div className="flex flex-col gap-2">
        {/* Project Title */}
        <SurfaceHeading>{project.title}</SurfaceHeading>

        {/* Project Description */}
        <SurfaceSubtext>{project.description}</SurfaceSubtext>

        {/* Project Stack */}
        {project.stack && (
          <TechStack
            stack={project.stack || []}
            stackMode={stackMode}
            className="text-text-secondary text-xs md:text-base pt-2"
          />
        )}

        {/* Optional: Buttons / Other */}
        {children}
      </div>
    </Button>
  );
}
