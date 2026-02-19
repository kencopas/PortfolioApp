import { ReactNode } from "react";

type ButtonStyle = "primary" | "secondary";
const baseButtonStyle = "px-4 py-2 rounded-xl border-2";

const styleMap: Record<ButtonStyle, string> = {
  primary: `${baseButtonStyle} border-transparent bg-accent-primary text-white font-medium`,
  secondary: `${baseButtonStyle} border-accent-primary text-accent-primary`,
};

interface ButtonProps {
  children: ReactNode;
  style: ButtonStyle;
  className?: string;
}

export default function Button({
  children,
  style,
  className = "",
}: ButtonProps) {
  return (
    <button className={`${styleMap[style]} ${className}`}>{children}</button>
  );
}
