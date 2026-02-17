"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: string;
  className?: string;
}

export default function NavLink({
  href,
  children,
  className = "",
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`transition hover:opacity-70 ${
        isActive ? "font-bold text-text-primary" : "text-text-secondary"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
