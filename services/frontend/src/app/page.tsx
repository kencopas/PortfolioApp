import { Project } from "@/components/projects/ProjectCard";
import { BlogEntryData } from "@/components/blog/BlogEntry";
import HeroSection from "@/components/home/HeroSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import WritingSection from "@/components/home/WritingSection";

export default function Home() {
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

  const blogEntryData: BlogEntryData = {
    id: "0001",
    title: "Designing Environment-Aware Docker Deployments",
    description:
      "How to structure compose files and image tagging for reproducible infrastructure.",
    year: 2026,
    read_time_minutes: 9,
    category: "Infrastructure",
  };
  const blogEntries: BlogEntryData[] = [
    blogEntryData,
    blogEntryData,
    blogEntryData,
  ];

  return (
    <div className="flex flex-col gap-40">
      <HeroSection className="pt-45 pb-25 md:pb-0" />
      <ProjectsSection title="Featured Projects" projects={projects} />
      <WritingSection title="Technical Writing" blogEntries={blogEntries} />
    </div>
  );
}
