import React from "react";

import ArrowLink from "@/components/ui/ArrowLink";
import { SurfaceHeading, SurfaceSubtext } from "@/components/ui/Typography";
import Surface from "@/components/ui/Surface";

export interface BlogEntryData {
  id: string;
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

  return (
    <Surface className={className}>
      <div className="flex justify-between items-start border-t border-border py-3">
        <div className={`flex flex-col justify-between gap-2 flex-5`}>
          <div className="flex flex-col gap-0.5">
            <SurfaceHeading className="text-lg leading-tight">
              {title}
            </SurfaceHeading>
            {description && <SurfaceSubtext>{description}</SurfaceSubtext>}
          </div>
          {infoBar.length > 0 && (
            <span className="text-text-muted text-xs font-medium">
              {infoBar.join(" • ")}
            </span>
          )}
        </div>
        <ArrowLink href="/read-blog" className="flex-1 text-right">
          Read
        </ArrowLink>
      </div>
    </Surface>
  );
}
