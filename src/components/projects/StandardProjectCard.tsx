import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Play, Image } from "lucide-react";
import { useState } from "react";
import type { MediaItem } from "./MediaModal";
import AchievementBadge from "./AchievementBadge";
import { assetUrl } from "@/lib/assetUrl";
import MobileProjectCard, { useProjectMobile } from "./MobileProjectCard";

interface StandardProject {
  title: string;
  status?: string;
  terminalHeader: string;
  description: string;
  tags: string[];
  media: MediaItem[];
  category: string;
  participation?: string[];
}

interface StandardProjectCardProps {
  project: StandardProject;
  index: number;
  onMediaClick: (media: MediaItem[], index: number) => void;
}

const StandardProjectCard = ({ project, index, onMediaClick }: StandardProjectCardProps) => {
  const [expanded, setExpanded] = useState(true);
  const isMobile = useProjectMobile();

  if (isMobile) return <MobileProjectCard title={project.title} subtitle={project.status}
    paragraphs={[{ body: project.description }]} tags={project.tags} media={project.media} onMediaClick={onMediaClick}
    badges={project.participation?.map(label => <AchievementBadge key={label} tier="recognition" icon="trophy" label={label} />)} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      layout
      className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300 hover:box-glow-cyan"
    >
      {/* Terminal preview */}
      <div className="terminal-block hidden sm:block m-4 mb-0 p-4 text-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-neon-green/60" />
          <div className="w-3 h-3 rounded-full bg-secondary/60" />
          <span className="text-terminal-comment ml-2 text-[10px]">terminal</span>
        </div>
        <pre className="text-terminal-text whitespace-pre-wrap leading-relaxed">
          {project.terminalHeader}
        </pre>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
        aria-label={`${expanded ? "Collapse" : "Expand"} ${project.title}`}
        className="w-full px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between gap-4 text-left"
      >
        <span className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </span>
          {project.status && (
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-neon-green/40 text-neon-green animate-pulse">
              {project.status}
            </span>
          )}
        </span>
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-muted-foreground">
          <ChevronDown size={20} />
        </motion.span>
      </button>

      {project.participation && (
        <div className="flex flex-wrap gap-2 px-4 sm:px-6 pb-4">
          {project.participation.map(label => <AchievementBadge key={label} tier="recognition" icon="trophy" label={label} />)}
        </div>
      )}

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-5 sm:pb-6">
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>

              {project.media.length > 0 && (
                <div className="mobile-media-gallery flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
                  {project.media.slice(0, 4).map((item, i) => (
                    <button
                      key={item.src}
                      type="button"
                      aria-label={`Open ${item.alt || project.title}`}
                      onClick={() => onMediaClick(project.media, i)}
                      className="relative w-[82%] shrink-0 snap-center aspect-[4/3] rounded-lg border border-border overflow-hidden hover:border-primary/40 transition-all group/media sm:w-auto"
                    >
                      {item.type === "image" ? (
                        <img src={assetUrl(item.src)} alt={item.alt || project.title} className="w-full h-full bg-muted/30" style={{ objectFit: item.fit || "cover", objectPosition: item.position }} loading="lazy" />
                      ) : (
                        <div className="relative w-full h-full bg-card/80">
                          {item.poster && <img src={assetUrl(item.poster)} alt={item.alt || project.title} className="w-full h-full bg-muted/30" style={{ objectFit: item.fit || "cover" }} loading="lazy" />}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="rounded-full bg-background/60 p-2 border border-primary/40"><Play size={18} className="text-primary" /></span>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-background/0 group-hover/media:bg-background/30 transition-all flex items-center justify-center">
                        {item.type === "image" && <Image size={20} className="opacity-0 group-hover/media:opacity-100 text-primary transition-opacity drop-shadow-lg" />}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StandardProjectCard;
export type { StandardProject };
