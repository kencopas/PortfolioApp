import { projects } from "./projects";
import ProjectsSection from "@/components/home/ProjectsSection";

export default function Projects() {
  return <ProjectsSection title="Featured Projects" projects={projects} />;
}
