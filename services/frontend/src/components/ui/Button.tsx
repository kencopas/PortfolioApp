import React, { ReactNode } from "react";

type ButtonStyle = "primary" | "secondary";
const baseButtonStyle = "px-4 py-2 rounded-xl";

const styleMap: Record<ButtonStyle, string> = {
  primary: `${baseButtonStyle} bg-accent-primary text-white`,
  secondary: `${baseButtonStyle} border-accent-primary border-2 text-accent-primary`,
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
  console.log(style);
  return (
    <button className={`${styleMap[style]} ${className}`}>{children}</button>
  );
}
