import { AnimatePresence, motion } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";
import { useState } from "react";
import MediaModal from "./MediaModal";
import AchievementBadge from "./AchievementBadge";
import pipelineAsset from "@/assets/ir-pose-pipeline.jpeg.asset.json";
import testbedAsset from "@/assets/ir-pose-testbed.jpeg.asset.json";
import payloadAsset from "@/assets/ir-pose-payload.jpeg.asset.json";
import markerModuleAsset from "@/assets/ir-pose-marker-module.jpeg.asset.json";
import demoVideoAsset from "@/assets/ir-pose-demo.mp4.asset.json";
import uwbDemoVideoAsset from "@/assets/uwb-localisation-demo.mp4.asset.json";
import { assetUrl } from "@/lib/assetUrl";
import MobileProjectCard, { useProjectMobile } from "./MobileProjectCard";

interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
}

interface ResearchCardData {
  title: string;
  year: string;
  terminalHeader: string;
  terminalLabel: string;
  paragraphs: { heading?: string; body: string }[];
  tags: string[];
  badge?: string;

  media?: MediaItem[];
}

const researchCards: ResearchCardData[] = [
  {
    title: "Infrared Marker Pose Estimation",
    year: "2026",
    terminalLabel: "pi_standalone.py",
    terminalHeader: `$ python3 pi_standalone.py --seconds 60
[INFO] SEN0158 initialised over I2C
[INFO] Pose 1.014 ms | CPU 3.9% | 100% valid`,
    paragraphs: [
      {
        heading: "Tracking a drone indoors",
        body: "GPS is unreliable indoors, so a drone needs another way to work out where it is. I built a low-cost system that uses four infrared lights as reference points to estimate the drone’s position and how it is tilted or turned. All calculations run on a small Raspberry Pi 5 carried by the drone.",
      },
      {
        heading: "How it works",
        body: "An infrared sensor detects the four lights and sends their locations to the Raspberry Pi. My software compares this pattern with the known layout of the lights to calculate position and orientation. Because the lights look identical, I developed a way to tell them apart using their arrangement and reject answers that do not make physical sense.",
      },
      {
        heading: "What I achieved",
        body: "In testing, the system achieved position accuracy of 5–13 mm and updated its estimate about 39 times per second. It used only 3.9% of one Raspberry Pi processor core, leaving computing power for other tasks. Across 12,133 recorded measurements, the software kept identifying the lights consistently without mixing them up.",
      },
      {
        heading: "What the testing revealed",
        body: "I tested how distance, sensor alignment and the layout of the lights affected accuracy. A small 2.7° tilt in the sensor mounting was the main source of consistent error. I also found that some light arrangements made estimates of tilt and rotation less reliable. These results show how to improve the physical setup as well as the software.",
      },
    ],
    tags: [
      "Raspberry Pi 5",
      "SQPnP",
      "PnP",
      "OpenCV",
      "I2C",
      "Rodrigues",
      "SVD",
      "Geodesic metrics",
      "Python",
      "Embedded",
    ],
    badge: "IEEE ROBIO 2026 — submitted",

    media: [
      { type: "image", src: testbedAsset.url, alt: "Aerial testbed with infrared marker layout surveyed on the lab floor" },
      { type: "image", src: payloadAsset.url, alt: "Raspberry Pi 5 and infrared sensor payload mounted on the carbon-fibre airframe" },
      { type: "image", src: markerModuleAsset.url, alt: "3D-printed infrared marker module with switch and LED" },
      { type: "image", src: pipelineAsset.url, alt: "Onboard pose estimation pipeline running live with reprojection visualisation" },
      { type: "video", src: demoVideoAsset.url, alt: "Live pose estimation demo", poster: "/media/ir-demo-thumbnail.jpg" },
    ],
  },
  {
    title: "UWB Localisation via TDOA",
    year: "2026",
    terminalLabel: "uwb_localise",
    terminalHeader: `$ ./uwb_localise --anchors 3 --mode tdoa
[INFO] Anchor sync established
[INFO] Trilateration solution converged`,
    paragraphs: [
      {
        body: "Built an indoor positioning system using ultra-wideband (UWB) radio signals. Three fixed reference devices and a tag on the vehicle provide measurements used to estimate where the vehicle is inside the room.",
      },
      {
        heading: "Method",
        body: "The system compares when a radio signal reaches the reference devices. These tiny timing differences help calculate the tag’s position. I wrote the position-solving software, added checks to reject inconsistent readings, and tested how the placement and measured locations of the reference devices affected accuracy.",
      },
      {
        heading: "Result",
        body: "Room tests achieved position accuracy of about 15–30 cm. Radio reflections from walls and equipment, errors in the reference-device locations and differences between their clocks limited accuracy. This system estimates position; it does not measure which way the vehicle is facing or how it is tilted.",
      },
    ],
    tags: [
      "UWB",
      "TDOA",
      "Trilateration",
      "DOP analysis",
      "Outlier rejection",
      "Python",
      "Signal processing",
    ],
    media: [
      { type: "video", src: uwbDemoVideoAsset.url, alt: "UWB TDOA localisation demo", poster: "/media/uwb-module-thumbnail.jpg" },
    ],
  },
];

const metrics = [
  { value: "5–13 mm", label: "position accuracy achieved" },
  { value: "USD 239", label: "total hardware cost" },
  { value: "3.9%", label: "CPU load, full pipeline onboard" },
  { value: "12,133", label: "frames, zero correspondence failures" },
];

const ResearchSection = () => {
  const isMobile = useProjectMobile();
  const [modalMedia, setModalMedia] = useState<MediaItem[] | null>(null);
  const [modalIndex, setModalIndex] = useState(0);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    () => Object.fromEntries(researchCards.map((card) => [card.title, true])),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="border-2 border-primary/40 rounded-xl overflow-hidden bg-card/30 box-glow-cyan relative">
        {/* Gradient glow accent band */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

        {/* Header band */}
        <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-5 border-b border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80 mb-2">
            Research Internship
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            Mobile Robotics Laboratory, <span className="gradient-text">IISc Bengaluru</span>
          </h3>
          <div className="font-mono text-xs text-terminal-comment mb-2">
            Dept. of Aerospace Engineering · June – August 2026
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
            Indoor localisation for GPS-denied aerial vehicles — two independent approaches, built and characterised.
          </p>
        </div>

        {/* Metrics strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary/10">
          {metrics.map((m) => (
            <div key={m.label} className="bg-card/60 px-4 py-4 text-center">
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-primary font-mono-code">
                {m.value}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground mt-1 leading-tight">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Each project pairs its description with its own media. */}
        <div className="grid gap-3 p-2 sm:gap-4 sm:p-4">
          {researchCards.map((card) => isMobile ? (
            <MobileProjectCard key={card.title} title={card.title} subtitle={card.year}
              paragraphs={card.paragraphs} tags={card.tags} media={card.media ?? []}
              compact
              badges={card.badge ? <AchievementBadge tier="recognition" icon="file-text" label={card.badge} /> : undefined}
              onMediaClick={(media, index) => { setModalMedia(media); setModalIndex(index); }} />
          ) : (
            <motion.div
              layout
              key={card.title}
              className="bg-card/60 border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300 hover:box-glow-cyan flex flex-col"
            >
              {/* Terminal header */}
              <div className="terminal-block hidden sm:block m-3 mb-0 p-3 text-xs">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neon-green/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary/60" />
                  <span className="text-terminal-comment ml-2 text-[10px]">
                    {card.terminalLabel}
                  </span>
                </div>
                <pre className="text-terminal-text whitespace-pre-wrap leading-relaxed">
                  {card.terminalHeader}
                </pre>
              </div>

              <button
                type="button"
                onClick={() => setExpandedCards((current) => ({ ...current, [card.title]: !current[card.title] }))}
                aria-expanded={expandedCards[card.title]}
                aria-label={`${expandedCards[card.title] ? "Collapse" : "Expand"} ${card.title}`}
                className="w-full px-4 pt-4 pb-3 flex items-center justify-between gap-4 text-left"
              >
                <span className="min-w-0">
                  <span className="block text-lg font-semibold text-foreground">
                    {card.title}
                  </span>
                  <span className="font-mono text-xs text-terminal-comment">{card.year}</span>
                </span>
                <motion.span animate={{ rotate: expandedCards[card.title] ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-muted-foreground">
                  <ChevronDown size={20} />
                </motion.span>
              </button>

                {/* Buttons */}
                {card.badge && (
                  <div className="flex flex-wrap items-center justify-end gap-3 px-4 pb-4">
                    {card.badge && (
                      <AchievementBadge tier="recognition" icon="file-text" label={card.badge} />
                    )}
  
                  </div>
                )}
              <AnimatePresence initial={false}>
                {expandedCards[card.title] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 flex flex-col lg:block lg:flow-root">
                {/* Media gallery */}
                {card.media && card.media.length > 0 && (
                  <div className="mobile-media-gallery order-2 flex gap-3 mb-5 overflow-x-auto snap-x snap-mandatory pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:float-right lg:w-[44%] lg:ml-8">
                    {card.media.map((item, i) => (
                      <button
                        key={item.src}
                        type="button"
                        aria-label={`Open ${item.alt ?? card.title}`}
                        onClick={() => {
                          if (!card.media) return;
                          setModalMedia(card.media);
                          setModalIndex(i);
                        }}
                        className={`group relative w-[82%] shrink-0 snap-center overflow-hidden rounded-md border border-border hover:border-primary/50 transition-all sm:w-auto ${item.type === "video" ? "sm:col-span-2 aspect-video sm:aspect-[2/1]" : "aspect-video"}`}
                      >
                        <img
                          src={assetUrl(item.type === "image" ? item.src : item.poster ?? "")}
                          alt={item.alt ?? card.title}
                          loading="lazy"
                          className={`${item.type === "video" ? "w-[44%]" : "w-full"} h-full object-cover group-hover:scale-[1.03] transition-transform duration-500`}
                        />
                        {item.type === "video" && (
                          <span className="absolute inset-y-0 right-0 w-[56%] flex flex-col items-start justify-center gap-3 bg-[#142830] text-white p-4 sm:p-5 text-left">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-teal-200">Research demo</span>
                            <span className="font-semibold text-sm sm:text-lg leading-tight">{card.title.startsWith("Infrared") ? "Infrared pose tracking" : "UWB localisation"}</span>
                            <span className="w-9 h-9 rounded-full border border-teal-200/50 bg-white/10 flex items-center justify-center text-teal-100">
                              <Play size={16} />
                            </span>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                <div className="order-1 space-y-3 mb-5">
                  {card.paragraphs.map((p, i) => (
                    <div key={i}>
                      {p.heading && (
                        <h5 className="font-mono text-xs text-primary mb-1">
                          {"// "}
                          {p.heading}
                        </h5>
                      )}
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="order-3 clear-both flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                {/* Tags */}
                <div className="flex min-w-0 flex-[1_1_28rem] flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <div className="px-6 pb-6 pt-2 text-center">
          <p className="italic text-muted-foreground text-sm leading-relaxed max-w-3xl mx-auto">
            The two systems serve different needs: UWB provides room-scale position estimates, while infrared tracking provides finer position and orientation estimates when the reference lights are visible.
          </p>
        </div>
      </div>

      <MediaModal
        isOpen={modalMedia !== null}
        onClose={() => setModalMedia(null)}
        media={modalMedia ?? []}
        initialIndex={modalIndex}
      />
    </motion.div>
  );
};

export default ResearchSection;



