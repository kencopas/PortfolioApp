import Image from "next/image";

import Surface from "@/components/ui/Surface";
import ArrowLink from "@/components/ui/ArrowLink";
import { SurfaceSubtext } from "@/components/ui/Typography";
import SlideFade from "@/components/motion/SlideFade";

import Section from "./Section";

export default function ArchitectureSection() {
  return (
    <Section title="Architecture Snapshot" className="items-center">
      <SurfaceSubtext className="text-center w-2/3">
        This is a snapshot of the current architecture for this application. For
        a more detailed breakdown, see the full architecture on the Architecture
        page.
      </SurfaceSubtext>
      <SlideFade y={20} visibilityTrigger={0.5}>
        <Surface className="flex flex-col justify-between">
          <SlideFade y={10} delay={0.5} visibilityTrigger={0.5}>
            <Image
              src="/architecture-snapshot.drawio.svg"
              alt="Snapshot of PortfolioApp system architecture"
              width={200}
              height={200}
              className="w-full h-auto"
            />
          </SlideFade>
          <ArrowLink
            href="/architecture"
            className="pt-4"
            newTabOnClick={false}
          >
            View Full Architecture
          </ArrowLink>
        </Surface>
      </SlideFade>
    </Section>
  );
}
