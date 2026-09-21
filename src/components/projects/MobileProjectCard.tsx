import { useId, useState, useSyncExternalStore, type ReactNode } from "react";
import { ChevronDown, Play } from "lucide-react";
import { assetUrl } from "@/lib/assetUrl";
import type { MediaItem } from "./MediaModal";

const phoneQuery = "(max-width: 639px)";
const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(phoneQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
export const useProjectMobile = () => useSyncExternalStore(
  subscribe,
  () => window.matchMedia(phoneQuery).matches,
  () => false,
);

interface Props {
  title: string;
  subtitle?: string;
  badges?: ReactNode;
  paragraphs: { heading?: string; body: string }[];
  tags: string[];
  media: MediaItem[];
  onMediaClick: (media: MediaItem[], index: number) => void;
  compact?: boolean;
}

export default function MobileProjectCard({ title, subtitle, badges, paragraphs, tags, media, onMediaClick, compact = false }: Props) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <article className={`min-w-0 rounded-lg border border-border bg-card ${compact ? "p-3" : "p-4"}`}>
      <div className={`flex items-start justify-between gap-3 ${compact ? "mb-2" : "mb-3"}`}>
        <div className="min-w-0">
          <h4 className="text-lg font-semibold leading-snug">{title}</h4>
          {subtitle && <p className="font-mono text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <button type="button" aria-label={`${expanded ? "Hide" : "Read full"} description of ${title}`} aria-expanded={expanded} aria-controls={detailsId}
          onClick={() => setExpanded(value => !value)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border text-primary hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary">
          <ChevronDown size={21} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>
      {badges && <div className={`flex flex-wrap gap-2 ${compact ? "mb-3" : "mb-4"}`}>{badges}</div>}
      {!expanded && <div className={`${compact ? "mb-3" : "mb-4"} border-l-2 border-secondary/50 pl-3`}>
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-secondary/80">Overview</p>
        <p className="mobile-description-preview text-sm text-muted-foreground leading-relaxed">{paragraphs[0]?.body}</p>
      </div>}
      {media.length > 0 && <>
        <div className={`mobile-media-gallery flex min-w-0 ${compact ? "gap-2" : "gap-3"} overflow-x-auto snap-x snap-mandatory pb-2`}>
          {media.map((item, index) => (
            <button key={item.src} type="button" aria-label={`Open ${item.alt || title}`}
              onClick={() => onMediaClick(media, index)}
              className={`relative shrink-0 snap-start aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted/30 ${media.length === 1 ? "w-full" : "w-[90%]"}`}>
              {(item.type === "image" || item.poster) && <img src={assetUrl(item.type === "image" ? item.src : item.poster)} alt={item.alt || title} loading="lazy" className="w-full h-full object-cover" />}
              {item.type === "video" && <span className="absolute inset-0 flex items-center justify-center"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-background/90 border border-primary/30"><Play size={22} /></span></span>}
            </button>
          ))}
        </div>
        <p className={`text-xs text-muted-foreground mt-1 ${compact ? "mb-3" : "mb-4"}`}>{media.length > 1 ? "Swipe to browse · Tap to open" : "Tap to open"}</p>
      </>}
      <div id={detailsId} hidden={!expanded}>
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => <div key={index}>
            {paragraph.heading && <h5 className="font-semibold text-sm mb-1">{paragraph.heading}</h5>}
            <p className="text-sm text-muted-foreground leading-relaxed">{paragraph.body}</p>
          </div>)}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map(tag => <span key={tag} className="font-mono text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">{tag}</span>)}
        </div>
      </div>
      <button type="button" onClick={() => setExpanded(value => !value)}
        aria-expanded={expanded} aria-controls={detailsId}
        aria-label={`${expanded ? "Show less about" : "Read more about"} ${title}`}
        className="mt-2 inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-medium text-secondary hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary">
        {expanded ? "Show less" : "Read more"}
        <ChevronDown size={16} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
    </article>
  );
}
