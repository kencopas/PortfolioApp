import React, { ReactNode } from "react";
import Link from "next/link";

import NavbarExpandable from "@/components/layout/NavbarExpandable";

interface NavbarProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export default function Navbar({
  children,
  className = "",
  title = "",
}: NavbarProps) {
  return (
    <nav className={`w-full py-8 relative mx-auto max-w-6xl px-6 ${className}`}>
      {/* Left: Brand */}
      {title && (
        <div className="absolute left-0 md:left-3 lg:left-6 top-1/2 -translate-y-1/2">
          <Link
            href="/"
            className="text-2xl text-text-primary font-semibold tracking-tight hover:opacity-70 transition"
          >
            {title}
          </Link>
        </div>
      )}

      {/* Center: Navigation (Desktop) */}
      <ul className="hidden md:flex justify-center gap-10 text-m font-medium tracking-wide">
        {React.Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>

      <NavbarExpandable>{children}</NavbarExpandable>
    </nav>
  );
}
