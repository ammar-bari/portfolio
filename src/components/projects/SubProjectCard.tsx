import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Image, Play } from "lucide-react";
import { useState } from "react";
import type { MediaItem } from "./MediaModal";
import { assetUrl } from "@/lib/assetUrl";

interface SubProject {
  title: string;
  year?: string;
  terminalHeader: string;
  description: string;
  tags: string[];
  media: MediaItem[];
}

interface SubProjectCardProps {
  project: SubProject;
  onMediaClick: (media: MediaItem[], index: number) => void;
}

const SubProjectCard = ({ project, onMediaClick }: SubProjectCardProps) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      layout
      className="bg-card/60 border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300 hover:box-glow-cyan"
    >
      {/* Terminal header */}
      <div className="terminal-block hidden sm:block m-3 mb-0 p-3 text-xs">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-neon-green/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-secondary/60" />
          <span className="text-terminal-comment ml-2 text-[10px]">terminal</span>
        </div>
        <pre className="text-terminal-text whitespace-pre-wrap leading-relaxed">
          {project.terminalHeader}
        </pre>
      </div>

      {/* Clickable header */}
      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
        aria-label={`${expanded ? "Collapse" : "Expand"} ${project.title}`}
        className="w-full p-4 pb-2 flex items-center justify-between text-left group"
      >
        <div>
          <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h4>
          {project.year && <span className="font-mono text-xs text-terminal-comment">{project.year}</span>}
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} className="text-muted-foreground" />
        </motion.div>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Media thumbnails */}
              {project.media.length > 0 && (
                <div className="mobile-media-gallery flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
                  {project.media.map((item, i) => (
                    <button
                      key={i}
                       type="button"
                       aria-label={`Open ${item.alt || project.title}`}
                      onClick={() => onMediaClick(project.media, i)}
                      className="relative w-[82%] shrink-0 snap-center aspect-[4/3] rounded-lg border border-border overflow-hidden hover:border-primary/40 transition-all group/media sm:w-auto"
                    >
                      {item.type === "image" ? (
                        <img
                          src={assetUrl(item.src)}
                          alt={item.alt || project.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : item.poster ? (
                        <div className="relative w-full h-full">
                          <img
                            src={assetUrl(item.poster)}
                            alt={item.alt || project.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play size={24} className="text-white drop-shadow-lg" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-card flex items-center justify-center">
                          <Play size={20} className="text-primary" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-background/0 group-hover/media:bg-background/30 transition-all flex items-center justify-center">
                        {item.type === "image" ? (
                          <Image size={20} className="opacity-0 group-hover/media:opacity-100 text-primary transition-opacity drop-shadow-lg" />
                        ) : null}
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

export default SubProjectCard;
export type { SubProject };
