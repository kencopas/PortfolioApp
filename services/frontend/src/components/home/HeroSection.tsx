import Button from "@/components/ui/Button";
import SlideFade from "@/components/motion/SlideFade";
import { SuperBigText } from "@/components/ui/Typography";
import { SurfaceSubtext } from "@/components/ui/Typography";

import Section from "./Section";

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <Section className={className}>
      {/* Hero Title */}
      <SlideFade y={20}>
        <SuperBigText className="pb-5 md:pb-10 text-center">
          Secure, Scalable Systems.
        </SuperBigText>
      </SlideFade>

      {/* Hero Description */}
      <SlideFade y={20} delay={0.4}>
        <SurfaceSubtext className="text-center font-medium lg:text-lg">
          Containerized services. Reverse proxies. Edge routing.
          <br />
          Every system is built to be reproducible, secure, and understandable.
        </SurfaceSubtext>
      </SlideFade>

      {/* Hero Buttons */}
      <div className="flex gap-4 justify-center">
        <SlideFade y={20} delay={0.6}>
          <Button style="primary">View Projects</Button>
        </SlideFade>
        <SlideFade y={20} delay={0.8}>
          <Button style="secondary">Explore Architecture</Button>
        </SlideFade>
      </div>
    </Section>
  );
}
