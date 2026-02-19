import Section from "@/components/home/Section";
import SlideFade from "@/components/motion/SlideFade";
import Button from "@/components/ui/Button";

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <Section className={className}>
      {/* Hero Title */}
      <SlideFade y={20}>
        <h1 className="pb-5 md:pb-10 text-5xl md:text-8xl lg:text-9xl leading-tight text-center font-semibold text-text-primary">
          Secure, Scalable Systems.
        </h1>
      </SlideFade>

      {/* Hero Description */}
      <SlideFade y={20} delay={0.4}>
        <p className="text-text-muted text-center font-medium text-sm md:text-base lg:text-lg">
          Containerized services. Reverse proxies. Edge routing.
          <br />
          Every system is built to be reproducible, secure, and understandable.
        </p>
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
