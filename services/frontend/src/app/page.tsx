import HeroSection from "@/components/home/HeroSection";
import { Project } from "@/components/projects/ProjectCard";
import WritingSection from "@/components/home/WritingSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ArchitectureSection from "@/components/home/ArchitectureSection";
import InfoBar from "@/components/ui/InfoBar";
import { getRecentPosts } from "@/lib/blog";

import { projects } from "./projects/projects";

export default function Home() {
  const blogEntries = getRecentPosts(3);

  return (
    <div className="flex flex-col gap-40">
      <InfoBar className="self-center">
        This application is still in development.
      </InfoBar>
      <HeroSection className="pt-15 md:pt-10 pb-50 md:pb-30 lg:pb-0" />
      <ProjectsSection
        title="Featured Projects"
        projects={projects.slice(0, 4)}
      />
      <ArchitectureSection />
      <WritingSection title="Technical Writing" blogEntries={blogEntries} />
    </div>
  );
}
