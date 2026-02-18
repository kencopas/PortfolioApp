import React, { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/Typography";

interface SectionProps {
  children: ReactNode;
  title?: ReactNode;
  className?: string;
}

export default function Section({
  children,
  title,
  className = "",
}: SectionProps) {
  return (
    <div className={`flex flex-col gap-10 ${className}`}>
      {title && <SectionHeading>{title}</SectionHeading>}
      {children}
    </div>
  );
}
