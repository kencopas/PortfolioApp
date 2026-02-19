import Surface from "@/components/ui/Surface";
import Button from "@/components/ui/Button";
import ProjectCard, { Project } from "@/components/projects/ProjectCard";
import BlogEntry, { BlogEntryData } from "@/components/blog/BlogEntry";
import Section from "@/components/home/Section";
import SlideFade from "@/components/motion/SlideFade";

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
      <Section className="py-45">
        {/* <Surface className="flex flex-col gap-10 mx-auto py-40 text-text-primary"> */}
        {/* Hero Title */}
        <SlideFade>
          <h1 className="pb-10 text-9xl leading-30 text-center font-semibold text-text-primary">
            Secure, Scalable Systems.
          </h1>
        </SlideFade>
        {/* Hero Description */}
        <SlideFade delay={0.4}>
          <p className="text-text-muted text-center font-medium text-lg">
            Containerized services. Reverse proxies. Edge routing.
            <br />
            Every system is built to be reproducible, secure, and
            understandable.
          </p>
        </SlideFade>
        {/* Hero Buttons */}
        <div className="flex gap-4 justify-center">
          <SlideFade delay={0.6}>
            <Button style="primary">View Projects</Button>
          </SlideFade>
          <SlideFade delay={0.8}>
            <Button style="secondary">Explore Architecture</Button>
          </SlideFade>
        </div>
        {/* </Surface> */}
      </Section>

      {/* Featured Projects Section */}
      <Section title="Featured Projects">
        <div className="grid grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <SlideFade key={i}>
              <ProjectCard key={`${i}-${project.id}`} project={project} />
            </SlideFade>
          ))}
        </div>
      </Section>

      {/* Technical Writing Section */}
      <Section title="Technical Writing">
        <SlideFade>
          <Surface className="flex flex-col gap-4">
            <BlogEntry blogEntryData={blogEntryData} className="flex-1" />
            <BlogEntry blogEntryData={blogEntryData} className="flex-1" />
            <BlogEntry blogEntryData={blogEntryData} className="flex-1" />
          </Surface>
        </SlideFade>
      </Section>
    </div>
  );
}
