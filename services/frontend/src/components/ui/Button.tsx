import Link from "next/link";
import { ReactNode } from "react";

type ButtonStyle = "primary" | "secondary" | "base" | "none";
const baseButtonStyle =
  "inline-block px-4 leading-10 border-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95  hover:shadow-lg hover:shadow-blue-500/40";

export const styleMap: Record<ButtonStyle, string> = {
  primary: `${baseButtonStyle} rounded-xl border-transparent bg-accent-primary text-white font-medium`,
  secondary: `${baseButtonStyle} rounded-xl border-accent-primary text-accent-primary`,
  base: baseButtonStyle,
  none: "",
};

interface ButtonProps {
  children: ReactNode;
  href: string;
  style: ButtonStyle;
  className?: string;
}

export default function Button({
  children,
  style,
  href,
  className = "",
}: ButtonProps) {
  return (
    <Link href={href} className={`${styleMap[style]} ${className}`}>
      {children}
    </Link>
  );
}
