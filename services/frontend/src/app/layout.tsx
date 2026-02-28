import "./globals.css";

import Link from "next/link";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa";

import Navbar from "@/components/layout/Navbar";
import NavLink from "@/components/layout/NavLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kencopas.com"),
  title: {
    default: "Ken Copas - Software Engineer | Platform & Telemetry",
    template: "%s | Ken Copas",
  },
  description:
    "Software engineer building secure, containerized platforms: telemetry, event-driven services, and reproducible infrastructure.",
  alternates: {
    canonical: "https://kencopas.com/",
  },
  openGraph: {
    title: "Ken Copas - Software Engineer | Platform & Telemetry",
    description:
      "Secure, containerized platforms: telemetry, event-driven services, and reproducible infrastructure.",
    url: "https://kencopas.com/",
    siteName: "Ken Copas",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background-primary">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-tl from-background-primary to-background-secondary`}
      >
        <div className="flex flex-col gap-4 mx-auto w-full max-w-6xl px-6">
          {/* Navbar */}
          <Navbar title="Ken Copas">
            <NavLink href="/about">About</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/architecture">Architecture</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </Navbar>

          {children}

          {/* Footer */}
          <footer className="text-text-secondary text-sm flex flex-col gap-10 items-center footer sm:footer-horizontal bg-neutral text-neutral-content pb-30 pt-50">
            {/* Footer Links */}
            <nav className="grid grid-cols-3 md:grid-cols-5 justify-items-center w-full md:w-2/3">
              <Link href="/about" className="link link-hover py-3">
                About
              </Link>
              <Link href="/projects" className="link link-hover py-3">
                Projects
              </Link>
              <Link href="/architecture" className="link link-hover py-3">
                Architecture
              </Link>
              <Link href="/blog" className="link link-hover py-3">
                Blog
              </Link>
              <Link href="/contact" className="link link-hover py-3">
                Contact
              </Link>
            </nav>

            {/* Footer Icon Links */}
            <nav className="flex gap-15 justify-center">
              <a target="_blank" href="https://www.github.com/kencopas">
                <FaGithub size={25} />
              </a>
              <a target="_blank" href="https://www.youtube.com/@CopasCodes">
                <FaYoutube size={25} />
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/kennycopas">
                <FaLinkedin size={25} />
              </a>
            </nav>

            {/* Footer Copyright Statement */}
            <p className="text-center">
              © 2026 Kenneth Copas. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
