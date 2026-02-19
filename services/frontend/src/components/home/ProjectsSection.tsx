import React from "react";
import Section from "@/components/home/Section";
import SlideFade from "@/components/motion/SlideFade";
import ProjectCard, { Project } from "@/components/projects/ProjectCard";

interface ProjectsSectionProps {
  projects: Project[];
  title: string;
  className?: string;
}

export default function ProjectsSection({
  projects,
  title,
  className = "",
}: ProjectsSectionProps) {
  return (
    <Section title={title} className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <SlideFade y={20} key={i}>
            <ProjectCard key={`${i}-${project.id}`} project={project} />
          </SlideFade>
        ))}
      </div>
    </Section>
  );
}
