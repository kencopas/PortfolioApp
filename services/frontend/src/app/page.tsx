import Surface from "@/components/ui/Surface";
import Button from "@/components/ui/Button";
import ProjectCard, { Project } from "@/components/projects/ProjectCard";
import BlogEntry, { BlogEntryData } from "@/components/blog/BlogEntry";
import Section from "@/components/home/Section";

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
    title: "Designing Environment-Aware Docker Deployments",
    description:
      "How to structure compose files and image tagging for reproducible infrastructure.",
    year: 2026,
    read_time_minutes: 9,
    category: "Infrastructure",
  };

  return (
    <div className="flex flex-col gap-20">
      {/* Hero Section */}
      <Section>
        <Surface className="flex flex-col gap-10 mx-auto py-40 text-text-primary">
          {/* Hero Title */}
          <h1 className="text-6xl text-center font-semibold">
            I build secure, production-grade systems from the ground up.
          </h1>
          {/* Hero Description */}
          <p className="text-text-muted text-center font-medium text-lg">
            Containerized services. Reverse proxies. Edge routing.
            <br />
            Every system is built to be reproducible, secure, and
            understandable.
          </p>
          {/* Hero Buttons */}
          <div className="flex gap-4 justify-center">
            <Button style="primary">View Projects</Button>
            <Button style="secondary">Explore Architecture</Button>
          </div>
        </Surface>
      </Section>

      {/* Featured Projects Section */}
      <Section title="Featured Projects">
        <div className="grid grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={`${i}-${project.id}`} project={project} />
          ))}
        </div>
      </Section>

      {/* Technical Writing Section */}
      <Section title="Technical Writing">
        <Surface className="flex flex-col gap-4">
          <BlogEntry blogEntryData={blogEntryData} className="flex-1" />
          <BlogEntry blogEntryData={blogEntryData} className="flex-1" />
          <BlogEntry blogEntryData={blogEntryData} className="flex-1" />
        </Surface>
      </Section>

      {/* Whitespace */}
      <div className="h-100"></div>
    </div>
  );
}
