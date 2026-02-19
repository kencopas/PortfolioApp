import { ReactNode } from "react";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  newTabOnClick?: boolean;
}

export default function ArrowLink({
  href,
  children,
  className = "",
  newTabOnClick = true,
}: ArrowLinkProps) {
  return (
    <a
      href={href}
      target={newTabOnClick ? "_blank" : ""}
      rel={newTabOnClick ? "noopener noreferrer" : ""}
      className={`text-text-secondary hover:underline text-sm ${className}`}
    >{`${children} →`}</a>
  );
}
