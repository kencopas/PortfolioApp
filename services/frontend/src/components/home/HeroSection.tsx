import React from "react";
import Section from "@/components/home/Section";
import SlideFade from "@/components/motion/SlideFade";
import Button from "@/components/ui/Button";

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <Section className={className}>
      {/* <Surface className="flex flex-col gap-10 mx-auto py-40 text-text-primary"> */}
      {/* Hero Title */}
      <SlideFade>
        <h1 className="pb-10 text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl leading-30 text-center font-semibold text-text-primary">
          Secure, Scalable Systems.
        </h1>
      </SlideFade>
      {/* Hero Description */}
      <SlideFade delay={0.4}>
        <p className="text-text-muted text-center font-medium text-lg">
          Containerized services. Reverse proxies. Edge routing.
          <br />
          Every system is built to be reproducible, secure, and understandable.
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
  );
}
