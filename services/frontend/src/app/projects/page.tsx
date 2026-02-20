import { Project } from "@/components/projects/ProjectCard";
import ProjectsSection from "@/components/home/ProjectsSection";

export default function Projects() {
  const projectData: Project = {
    id: "portfolio_app",
    title: "Portfolio App",
    description:
      "Portfolio Application with self-hosted infrastructure, containerized services, and automated secure deployment",
    stack: ["FastAPI", "Next.js", "Docker Compose"],
  };
  const projects: Project[] = [projectData, projectData];

  return <ProjectsSection title="Featured Projects" projects={projects} />;
}
