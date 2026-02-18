import React from "react";
import Section from "@/components/home/Section";
import Surface from "@/components/ui/Surface";
import Button from "@/components/ui/Button";

export default function About() {
  return (
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
          Every system is built to be reproducible, secure, and understandable.
        </p>
        {/* Hero Buttons */}
        <div className="flex gap-4 justify-center">
          <Button style="primary">View Projects</Button>
          <Button style="secondary">Explore Architecture</Button>
        </div>
      </Surface>
    </Section>
  );
}
