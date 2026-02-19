import { ReactNode } from "react";
import Surface from "@/components/ui/Surface";
import TechStack from "@/components/projects/TechStack";
import { SurfaceHeading, SurfaceSubtext } from "../ui/Typography";

export interface Project {
  id: string;
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
    <Surface className={`mx-auto text-text-primary ${className}`}>
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
    </Surface>
  );
}
