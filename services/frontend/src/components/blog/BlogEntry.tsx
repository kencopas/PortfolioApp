import React from "react";
import ArrowLink from "@/components/ui/ArrowLink";
import { SurfaceHeading, SurfaceSubtext } from "../ui/Typography";

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

  const ftime = read_time_minutes && `${read_time_minutes} min read`;
  const infoBar = [ftime, category, year].filter(Boolean);

  console.log(`infoBar: ${infoBar}`);

  return (
    <div
      className={`flex flex-col justify-between gap-2 border-t border-border py-3 ${className}`}
    >
      <div className="flex flex-col gap-0.5">
        <div className="flex justify-between items-center">
          <SurfaceHeading className="text-lg">{title}</SurfaceHeading>
          <ArrowLink href="/read-blog">Read</ArrowLink>
        </div>
        {description && <SurfaceSubtext>{description}</SurfaceSubtext>}
      </div>
      {infoBar.length > 0 && (
        <span className="text-text-muted text-xs font-medium">
          {infoBar.join(" • ")}
        </span>
      )}
    </div>
  );
}
