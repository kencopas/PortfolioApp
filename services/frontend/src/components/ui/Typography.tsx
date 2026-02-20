import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function SectionHeading({ children, className = "" }: TypographyProps) {
  return (
    <h1
      className={`text-text-primary text-3xl md:text-5xl font-bold text-center ${className}`}
    >
      {children}
    </h1>
  );
}

export function SurfaceHeading({ children, className = "" }: TypographyProps) {
  return (
    <h3
      className={`text-text-primary text-xl md:text-2xl font-semibold ${className}`}
    >
      {children}
    </h3>
  );
}

export function SurfaceSubtext({ children, className = "" }: TypographyProps) {
  return (
    <p className={`text-text-muted text-sm md:text-base ${className}`}>
      {children}
    </p>
  );
}

export function SuperBigText({ children, className = "" }: TypographyProps) {
  return (
    <h1
      className={`text-5xl md:text-8xl lg:text-9xl leading-tight font-semibold text-text-primary ${className}`}
    >
      {children}
    </h1>
  );
}
