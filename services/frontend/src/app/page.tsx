import Surface from "@/components/ui/Surface";
import Button from "@/components/ui/Button";
import ProjectCard, { Project } from "@/components/projects/ProjectCard";
import ArrowLink from "@/components/ui/ArrowLink";
import BlogEntry, { BlogEntryData } from "@/components/blog/BlogEntry";

export default function Home() {
  const projectData: Project = {
    title: "Portfolio App",
    description:
      "Portfolio Application with self-hosted infrastructure, containerized services, and automated secure deployment",
    stack: ["FastAPI", "Next.js", "Docker Compose"],
  };

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
      {/* Hero */}
      <Surface className="mx-auto py-40 text-text-primary">
        <div className="flex flex-col gap-10">
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
            <Button className="bg-accent-primary text-white">
              View Projects
            </Button>
            <Button className="border-accent-primary border-2 text-accent-primary">
              Explore Architecture
            </Button>
          </div>
        </div>
      </Surface>

      {/* Featured Projects Section */}

      {/* Project Card */}
      <ProjectCard
        project={projectData}
        stackMode="horizontal"
        className="w-full"
      >
        <div className="flex gap-4 pt-4">
          <ArrowLink href="/case-study">View Case Study</ArrowLink>
          <ArrowLink href="/architecture">View Architecture</ArrowLink>
        </div>
      </ProjectCard>

      {/* Technical Writing Section */}
      <div className="flex flex-col gap-10">
        <h1 className="text-text-primary text-5xl font-bold text-center">
          Technical Writing
        </h1>
        {/* Blog Entries */}
        <Surface className="flex flex-col gap-4">
          <BlogEntry blogEntryData={blogEntryData} className="flex-1" />
          <BlogEntry blogEntryData={blogEntryData} className="flex-1" />
          <BlogEntry blogEntryData={blogEntryData} className="flex-1" />
        </Surface>
      </div>

      {/* Whitespace */}
      <div className="h-100"></div>
    </div>
  );
}
