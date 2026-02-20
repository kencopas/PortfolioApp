"use client";

import { SlMenu } from "react-icons/sl";
import React, { ReactNode, useState } from "react";

import SlideFade from "@/components/motion/SlideFade";

interface NavbarExpandableProps {
  children: ReactNode;
  className?: string;
}

export default function NavbarExpandable({
  children,
  className = "",
}: NavbarExpandableProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Toggle Button */}
      <div className="absolute right-0 mt-1 top-1/2 -translate-y-1/2 md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl text-text-primary font-semibold"
          aria-label="Toggle navigation"
        >
          <SlMenu size="20" />
        </button>
      </div>

      {/* Nav Dropdown */}
      {open && (
        <SlideFade y={5} duration={0.4}>
          <div className="absolute right-0 md:hidden mt-5 px-4 bg-background-secondary rounded-2xl p-3">
            <ul className="flex flex-col gap-4 text-m font-medium tracking-wide">
              {React.Children.map(children, (child) => (
                <li onClick={() => setOpen(false)}>{child}</li>
              ))}
            </ul>
          </div>
        </SlideFade>
      )}
    </div>
  );
}
