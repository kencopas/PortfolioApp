import React, { ReactNode } from "react";
import Link from "next/link";

interface NavbarProps {
  children: ReactNode;
  title?: string;
}

export default function Navbar({ children, title = "" }: NavbarProps) {
  return (
    <nav className="w-full py-6">
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Left: Brand */}
        {title && (
          <div className="absolute left-6 top-1/2 -translate-y-1/2">
            <Link
              href="/"
              className="text-2xl text-text-primary font-semibold tracking-tight hover:opacity-70 transition"
            >
              {title}
            </Link>
          </div>
        )}

        {/* Center: Navigation */}
        <ul className="flex justify-center gap-10 text-m font-medium tracking-wide">
          {React.Children.map(children, (child) => (
            <li>{child}</li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
