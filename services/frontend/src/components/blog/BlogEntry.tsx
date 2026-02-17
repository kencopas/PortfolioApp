import React from "react";
import ArrowLink from "@/components/ui/ArrowLink";

export interface BlogEntryData {
  title: string;
  category?: string;
  description?: string;
  read_time_minutes?: number;
  year?: number;
}

interface BlogEntryProps {
  blogEntryData: BlogEntryData;
  className?: string;
}

export default function BlogEntry({
  blogEntryData,
  className = "",
}: BlogEntryProps) {
  const { title, category, description, read_time_minutes, year } =
    blogEntryData;
  const shouldRenderInfoBar = read_time_minutes || category || year;

  console.log(`shouldRenderInfoBar: ${shouldRenderInfoBar}`);

  return (
    <div
      className={`flex flex-col gap-2 border-t border-border my-8 py-2 ${className}`}
    >
      <div className="flex justify-between items-center">
        <h6 className="text-text-primary">{title}</h6>
        <ArrowLink href="/read-blog">Read</ArrowLink>
      </div>
      {description && <p className="text-text-muted">{description}</p>}
      {shouldRenderInfoBar && <span>{}</span>}
    </div>
  );
}
