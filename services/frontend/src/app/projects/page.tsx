import React from "react";
import Section from "@/components/home/Section";
import ProjectCard, { Project } from "@/components/projects/ProjectCard";

export default function Projects() {
  const projectData: Project = {
    id: "portfolio_app",
    title: "Portfolio App",
    description:
      "Portfolio Application with self-hosted infrastructure, containerized services, and automated secure deployment",
    stack: ["FastAPI", "Next.js", "Docker Compose"],
  };
  const projects: Project[] = [
    projectData,
    projectData,
    projectData,
    projectData,
  ];

  return (
    <Section title="Featured Projects">
      <div className="grid grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={`${i}-${project.id}`} project={project} />
        ))}
      </div>
    </Section>
  );
}
