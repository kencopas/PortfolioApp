import Section from "@/components/home/Section";
import { SurfaceHeading, SurfaceSubtext } from "@/components/ui/Typography";

export default function Contact() {
  return (
    <Section title="Contact">
      <SurfaceSubtext className="text-center">
        Want to get in contact? Here&apos;s my information, feel free to reach
        out and expect a response within 24 hours.
      </SurfaceSubtext>

      {/* Contact Links Section */}
      <div className="grid grid-cols-1 gap-15 md:grid-cols-3 px-5 lg:px-20 py-15 md:py-40 border-t-2 border-b-2 border-border">
        {/* Email */}
        <div className="flex flex-col gap-4 items-center">
          <SurfaceHeading>Email</SurfaceHeading>
          <a
            href="mailto:kenny@copas.net"
            target="_blank"
            className="text-text-primary hover:underline"
          >
            kenny@copas.net
          </a>
        </div>

        {/* GitHub */}
        <div className="flex flex-col gap-4 items-center">
          <SurfaceHeading>GitHub</SurfaceHeading>
          <a
            href="https://www.github.com/kencopas"
            target="_blank"
            className="text-text-primary hover:underline"
          >
            GitHub.com/kencopas
          </a>
        </div>

        {/* LinkedIn */}
        <div className="flex flex-col gap-4 items-center">
          <SurfaceHeading>LinkedIn</SurfaceHeading>
          <a
            href="https://www.linkedin.com/in/kennycopas"
            target="_blank"
            className="text-text-primary hover:underlink"
          >
            LinkedIn.com/in/kennycopas
          </a>
        </div>
      </div>
      <div className="items-center justify-items-center">
        <div className="text-text-muted leading-10">
          <b>Please include context about:</b>
          <ul className="list-disc list-inside w-fit h-fit leading-8">
            <li>Your organization</li>
            <li>The problem you&apos;re solving</li>
            <li>Why you would like to connect</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
