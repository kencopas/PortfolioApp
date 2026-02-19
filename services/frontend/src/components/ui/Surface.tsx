import { ReactNode } from "react";

type SurfaceProps = {
  children: ReactNode;
  className?: string;
};

export default function Surface({ children, className = "" }: SurfaceProps) {
  return (
    <div
      className={`
        rounded-3xl
        shadow-lg
        bg-background-secondary
        p-6
        md:p-8
        border
        border-border
        ${className}
      `}
    >
      {children}
    </div>
  );
}
