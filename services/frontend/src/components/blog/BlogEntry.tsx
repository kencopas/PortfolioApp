import Surface from "@/components/ui/Surface";
import ArrowLink from "@/components/ui/ArrowLink";
import { SurfaceHeading, SurfaceSubtext } from "@/components/ui/Typography";
import { BlogMeta } from "@/lib/blog";

interface BlogEntryProps {
  blogEntryData: BlogMeta;
  className?: string;
}

export default function BlogEntry({
  blogEntryData,
  className = "",
}: BlogEntryProps) {
  const { title, slug, summary, date, tags, readTimeMinutes } = blogEntryData;

  const ftime = `${readTimeMinutes} min read`;
  const infoBar = [ftime, tags?.[0], date].filter(Boolean);

  return (
    <Surface className={className}>
      <div className="flex justify-between items-start border-t border-border py-3">
        <div className={`flex flex-col justify-between gap-2 flex-5`}>
          <div className="flex flex-col gap-0.5">
            <SurfaceHeading className="text-lg leading-tight">
              {title}
            </SurfaceHeading>
            {summary && <SurfaceSubtext>{summary}</SurfaceSubtext>}
          </div>
          {infoBar.length > 0 && (
            <span className="text-text-muted text-xs font-medium">
              {infoBar.join(" • ")}
            </span>
          )}
        </div>
        <ArrowLink href={`/blog/${slug}`} className="flex-1 text-right">
          Read
        </ArrowLink>
      </div>
    </Surface>
  );
}
