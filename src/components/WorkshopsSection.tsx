import { motion } from "framer-motion";
import roboticArmWorkshopOne from "@/assets/robotic-arm-workshop-1.mp4.asset.json";
import roboticArmWorkshopTwo from "@/assets/robotic-arm-workshop-2.mp4.asset.json";
import { assetUrl } from "@/lib/assetUrl";

const workshops = [
  {
    title: "Robotic Arm Workshop",
    reach: "120+ participants",
    terminalLabel: "arm_workshop.log",
    command: "$ workshop_start --platform=robotic_arm\n[OK] Actuator control session ready\n[OK] Hands-on build sequence loaded",
    description:
      "Led a hands-on robotics workshop introducing robotic-arm mechanisms, actuator control, electronics integration, and practical build workflows for more than 120 participants.",
    tags: ["Robotic Arms", "Actuators", "Electronics", "Hands-on Training"],
    videos: [roboticArmWorkshopOne.url, roboticArmWorkshopTwo.url],
    posters: [
      "/media/robotic-arm-workshop-1-poster.png",
      "/media/robotic-arm-workshop-2-poster.png",
    ],
  },
  {
    title: "RC Car Workshop",
    reach: "170+ participants",
    terminalLabel: "rc_workshop.log",
    command: "$ workshop_start --platform=rc_car\n[OK] Drive electronics connected\n[OK] Motion-control session ready",
    description:
      "Conducted a practical RC car workshop covering chassis assembly, motor-driver integration, control electronics, and testing for more than 170 participants.",
    tags: ["RC Cars", "Motor Drivers", "Control Electronics", "Prototyping"],
    videos: ["/media/rc-car-workshop.mp4"],
    photo: "/media/rc-car-workshop.jpeg",
    poster: "/media/rc-car-workshop-poster.jpg",
  },
];

const WorkshopsSection = () => (
  <section id="workshops" className="py-14 sm:py-24 relative section-divider">
    <div className="container mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="font-mono text-sm text-terminal-text mb-2">{"// section: workshops"}</div>
        <h2 className="text-4xl font-bold text-foreground">
          Robotics <span className="gradient-text">Workshops</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {workshops.map((workshop, index) => {

          return (
            <motion.article
              key={workshop.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className="terminal-block hidden sm:block m-4 mb-0 p-4 text-xs">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-destructive/60" />
                  <span className="w-3 h-3 rounded-full bg-neon-green/60" />
                  <span className="w-3 h-3 rounded-full bg-secondary/60" />
                  <span className="text-terminal-comment ml-2 text-[10px]">{workshop.terminalLabel}</span>
                </div>
                <pre className="text-terminal-text whitespace-pre-wrap leading-relaxed">{workshop.command}</pre>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <h3 className="text-xl font-semibold text-foreground">{workshop.title}</h3>
                  </div>
                  <span className="font-mono text-[10px] text-primary border border-primary/30 rounded-md px-2 py-1 whitespace-nowrap">
                    {workshop.reach}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{workshop.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {workshop.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>

                {workshop.photo ? (
                  <div className="mobile-media-gallery flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
                    <a href={assetUrl(workshop.photo)} target="_blank" rel="noopener noreferrer" aria-label="Open RC Car Workshop photo" className="block w-[76%] shrink-0 snap-center aspect-[9/16] overflow-hidden rounded-md border border-primary/30 sm:w-auto">
                      <img src={assetUrl(workshop.photo)} alt="Presenting RC car components during the workshop" loading="lazy" className="w-full h-full object-cover" />
                    </a>
                    <video src={assetUrl(workshop.videos[0])} poster={assetUrl(workshop.poster)} controls playsInline preload="metadata" aria-label="RC Car Workshop video" className="w-[76%] shrink-0 snap-center aspect-[9/16] object-cover rounded-md border border-primary/30 bg-black sm:w-full" />
                  </div>
                ) : (
                  <div className="mobile-media-gallery flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 sm:grid sm:grid-cols-2 sm:items-start sm:justify-items-center sm:overflow-visible sm:pb-0">
                    {workshop.videos.map((src, videoIndex) => (
                      <video
                        key={src}
                        src={assetUrl(src)}
                        poster={assetUrl(workshop.posters?.[videoIndex])}
                        controls
                        playsInline
                        preload="auto"
                        aria-label={`${workshop.title} video ${videoIndex + 1}`}
                        className="w-[76%] shrink-0 snap-center aspect-[9/16] object-cover rounded-md border border-primary/30 bg-black sm:w-full"
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

export default WorkshopsSection;

