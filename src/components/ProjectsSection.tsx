import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ResearchSection from "./projects/ResearchSection";
import SubProjectCard from "./projects/SubProjectCard";
import StandardProjectCard from "./projects/StandardProjectCard";
import MediaModal from "./projects/MediaModal";
import AchievementBadge from "./projects/AchievementBadge";
import type { MediaItem } from "./projects/MediaModal";
import type { SubProject } from "./projects/SubProjectCard";
import type { StandardProject } from "./projects/StandardProjectCard";
import type { BadgeTier } from "./projects/AchievementBadge";
import doorLockPrototype from "../assets/door-lock-prototype.jpeg.asset.json";
import doorLockDemo from "../assets/door-lock-demo.mp4.asset.json";
import doorLockCircuit1 from "../assets/door-lock-circuit-1.jpg.asset.json";
import doorLockCircuit2 from "../assets/door-lock-circuit-2.jpg.asset.json";
import doorLockDemo2 from "../assets/door-lock-demo-2.mp4.asset.json";
import doorLockDemo2Poster from "../assets/door-lock-demo-2-poster.jpg.asset.json";
import pumpPoster from "../assets/pump-monitoring-poster.jpg.asset.json";


const filters = [
  "All",
  "Research @ IISc Bengaluru",
  "Underwater Robotics",
  "ROS & Autonomous Systems",
  "Embedded Systems",
  "Product Design",
] as const;

const underwaterBadges: { label: string; tier: BadgeTier; icon: "award" | "file-text" | "trophy" | "medal" }[] = [
  { label: "Best Innovation Award — IIT Madras", tier: "award", icon: "award" },
  { label: "IEEE DELCON 2025 Presented", tier: "recognition", icon: "file-text" },
  { label: "SAUVC Shortlisted Team", tier: "recognition", icon: "trophy" },
  { label: "2nd in AMU ROVc 3.0", tier: "result", icon: "medal" },
];

const underwaterSubProjects: SubProject[] = [
  {
    title: "V8",
    year: "2025",
    terminalHeader: `$ ros2 launch auv_autonomy navigation.launch
[INFO] PnP pose estimation initialized
[INFO] Closed-loop trajectory tracking active`,
    description:
      "Built an autonomous underwater vehicle that estimates its position and orientation using camera, motion and depth sensor readings. A Jetson Xavier NX handles navigation, while a Pixhawk running ArduSub controls stability. I connected the two computers using MAVLink and calibrated and tuned the eight thrusters for controlled movement.",
    tags: ["ROS 2", "MAVLink", "Pixhawk", "Jetson Xavier NX", "6-DoF Control", "Sensor Fusion", "PID", "PnP"],
    media: [
      { type: "image", src: "/images/v8-award.jpeg", alt: "V8 AUV with award trophy" },
      { type: "image", src: "/images/v8-cad.jpeg", alt: "V8 AUV CAD render" },
    ],
  },
  {
    title: "SEA 5.0",
    year: "2024",
    terminalHeader: `$ teleop_start --mode=assisted
> Depth hold enabled
> Attitude stabilization active`,
    description:
      "Built an eight-thruster underwater robot controlled by a joystick through a Raspberry Pi. Configured Pixhawk and ArduSub so the operator could drive manually or use assistance to maintain depth and keep the vehicle level. Calibrated the motors and tuned their responses for stable underwater movement.",
    tags: ["Raspberry Pi", "Pixhawk", "ArduSub", "MAVLink", "PWM", "PID", "Teleoperation"],
    media: [
      { type: "image", src: "/images/sea5-underwater.jpeg", alt: "SEA 5.0 underwater test" },
      { type: "video", src: "/videos/sea5-test.mp4", alt: "SEA 5.0 pool test video", poster: "/images/sea5-video-thumb.png" },
    ],
  },
  {
    title: "Bumble Bee",
    year: "2024",
    terminalHeader: `$ auv_upgrade --competition_mode
[OK] Hydrodynamics optimized
[OK] Control gains tuned`,
    description:
      "Improved an underwater robot for competition use, focusing on stability in water, motor control and reliable communication. Refined the vehicle through testing to make it easier to control when water movement disturbed its position.",
    tags: ["Hydrodynamics", "Control Optimization", "Competition Robotics"],
    media: [
      { type: "image", src: "/images/bumble-bee-1.jpeg", alt: "Bumble Bee with awards" },
      { type: "image", src: "/images/bumble-bee-2.jpeg", alt: "Bumble Bee poolside" },
    ],
  },
];

const rosSubProjects: SubProject[] = [
  {
    title: "BumperBot",
    terminalHeader: `$ ros2 launch bumperbot_navigation nav2.launch.py
[INFO] 2D LiDAR scan processing...
[INFO] SLAM mapping and Nav2 stack initialized`,
    description:
      "Building a mobile robot in ROS 2 and testing it in Gazebo simulation. Laser distance measurements and motion sensor data help it build a map and estimate where it is. I created its digital model and configured Nav2 to plan routes, avoid obstacles and travel to chosen locations.",
    tags: ["ROS 2 Humble", "Gazebo", "LiDAR", "SLAM", "Nav2", "Sensor Fusion"],
    media: [
      { type: "image", src: "/images/bumperbot-rviz.png", alt: "BumperBot URDF in RViz" },
      { type: "image", src: "/images/bumperbot-render.png", alt: "BumperBot 3D render" },
      { type: "image", src: "/images/bumperbot-gazebo.png", alt: "BumperBot Gazebo simulation" },
    ],
  },
  {
    title: "Holo Battalion",
    terminalHeader: `$ ros2 launch holo_battalion multi_robot.launch
[INFO] Multi-agent coordination active
[INFO] Task allocation running`,
    description:
      "Developing a system that coordinates several robots in simulation. The work focuses on assigning tasks and coordinating movement, using ROS 2 navigation and computer vision. This project is part of the e-Yantra work at IIT Bombay.",
    tags: ["ROS 2", "Multi-Robot Systems", "AI", "Computer Vision", "Navigation"],
    media: [
      { type: "image", src: "/images/holo-battalion-sim.jpeg", alt: "Holo Battalion eYantraSim multi-robot coordination" },
      { type: "image", src: "/images/holo-battalion-gazebo.png", alt: "Holo Battalion Gazebo simulation and code" },
    ],
  },
];

const rosBadges = [
  "e-Yantra IIT Bombay",
];

const standardProjects: StandardProject[] = [
  {
    title: "Adaptable CTEV Orthopedic Device",
    terminalHeader: `$ init_ctev_design --mode=patient_specific
[OK] 3D scan data loaded
[OK] Additive manufacturing pipeline ready
[OK] Ergonomic model generated`,
    description:
      "Designed an adjustable device to support clubfoot treatment. Used 3D scans and 3D printing to make components shaped for individual patients. Worked with clinicians and engineers to improve fit, comfort and stability.",
    tags: ["3D Scanning", "3D Printing", "CAD", "Medical Device", "Product Design", "Ergonomics"],
    media: [
      { type: "image", src: "/images/ctev-1.jpeg", alt: "CTEV orthopedic device prototype" },
      { type: "image", src: "/images/ctev-2.jpeg", alt: "CTEV device 3D printed components" },
      { type: "image", src: "/images/ctev-3.jpeg", alt: "CTEV device assembly" },
      { type: "image", src: "/images/ctev-4.jpeg", alt: "CTEV device patient fitting" },
    ],
    category: "Product Design",
  },

  {
    title: "Robo Hockey",
    participation: ["TechnoXian 2025 — participated"],
    terminalHeader: `$ drive_control --mode=robo_hockey
[OK] High-torque drive ready
[OK] Puck handling calibrated
[OK] Arena control active`,
    description:
      "Built a remote-controlled hockey robot for TechnoXian 2025 and qualified in the first round. Improved the chassis, drive electronics and puck-handling mechanism through repeated testing and driver practice.",
    tags: ["Robo Hockey", "Mobile Robotics", "Motor Drivers", "Embedded Systems"],
    media: [
      { type: "image", src: "/media/robohockey-robots.jpeg", alt: "RoboHockey robots and radio controllers", fit: "cover" },
      { type: "video", src: "/media/robohockey-demo.mp4", poster: "/media/robohockey-video-poster.jpg", alt: "RoboHockey demo video", fit: "cover" },
      { type: "image", src: "/media/robohockey-electronics.jpeg", alt: "RoboHockey chassis and onboard electronics", fit: "cover" },
      { type: "image", src: "/media/robohockey-team.jpeg", alt: "AMU Roboclub RoboHockey team", fit: "cover", position: "center 85%" },
    ],
    category: "Embedded Systems",
  },
  {
    title: "Robo Soccer",
    participation: ["IIT Delhi — 2025", "IIT Roorkee — 2026"],
    terminalHeader: `$ drive_control --mode=robosoccer
[OK] Differential drive online
[OK] Remote steering configured
[OK] Competition mode active`,
    description:
      "Built a remote-controlled robot for soccer competitions, with a focus on steering, quick turns and ball control. Tested and refined the robot for events at IIT Delhi in 2025 and IIT Roorkee in 2026.",
    tags: ["Robo Soccer", "Mobile Robotics", "Motor Control", "Embedded Systems", "Competition Robotics"],
    media: [
      { type: "image", src: "/media/robosoccer-arena.jpeg", alt: "Robo Soccer robots on the competition pitch", fit: "cover", position: "center 40%" },
      { type: "video", src: "/media/robosoccer-demo.mp4", poster: "/media/robosoccer-video-poster.jpg", alt: "Robo Soccer match video", fit: "cover" },
      { type: "image", src: "/media/robosoccer-setup.jpeg", alt: "Preparing and testing the Robo Soccer robot electronics", fit: "cover", position: "center 45%" },
    ],
    category: "Embedded Systems",
  },
  {
    title: "Personalized Electronic Door Lock",
    terminalHeader: `$ esp32_boot
[OK] WiFi connected
[OK] Stepper motor calibrated
[OK] Lock system online`,
    description:
      "Designed and built a custom electronic locking mechanism using ESP32, stepper motor, and motor driver. Created CAD models and implemented wireless locking/unlocking functionality.",
    tags: ["ESP32", "Embedded Systems", "CAD", "Stepper Motor", "IoT"],
    media: [
      { type: "image", src: doorLockCircuit1.url, alt: "Electronic door lock prototype wired on a wooden door with Arduino and breadboard" },
      { type: "image", src: doorLockCircuit2.url, alt: "Electronic door lock circuit showing wiring and push buttons mounted on door" },
      { type: "video", src: doorLockDemo2.url, alt: "Personalized electronic door lock demo video", poster: doorLockDemo2Poster.url },
    ],

    category: "Embedded Systems",
  },
  {
    title: "IoT Pump Monitoring System",
    terminalHeader: `$ esp32_ble_init
[OK] Hall effect sensor calibrated
[OK] BLE data stream active
[OK] Remote diagnostics online`,
    description:
      "Built a monitoring system for manually operated grease pumps used in oil and gas applications. Magnetic sensors track how often the lever is used and how far it moves. An ESP32 sends the readings over Bluetooth Low Energy so pump usage can be recorded and reviewed for maintenance.",
    tags: ["ESP32", "IoT", "BLE", "Hall Effect Sensor", "Embedded Systems", "Oil & Gas"],
    media: [
      { type: "image", src: doorLockPrototype.url, alt: "Grease pump monitoring prototype with control electronics and wiring" },
      { type: "video", src: doorLockDemo.url, alt: "IoT grease pump monitoring demo video", poster: pumpPoster.url },
    ],
    category: "Embedded Systems",
  },
];

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMedia, setModalMedia] = useState<MediaItem[]>([]);
  const [modalIndex, setModalIndex] = useState(0);

  const underwaterRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: underwaterRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.6]);

  const handleMediaClick = (media: MediaItem[], index: number) => {
    setModalMedia(media);
    setModalIndex(index);
    setModalOpen(true);
  };

  const filteredStandard = standardProjects.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );
  const showResearch = activeFilter === "All" || activeFilter === "Research @ IISc Bengaluru";
  const showUnderwater = activeFilter === "All" || activeFilter === "Underwater Robotics";
  const showRos = activeFilter === "All" || activeFilter === "ROS & Autonomous Systems";

  return (
    <section id="projects" className="py-14 sm:py-24 relative overflow-hidden section-divider">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="font-mono text-sm text-terminal-text mb-2">
            {"// section: featured_projects"}
          </div>
          <h2 className="text-4xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-2 mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto sm:flex-wrap mobile-filter-strip"
        >
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 whitespace-nowrap font-mono text-xs px-4 py-3 sm:py-2 rounded border transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-primary/20 text-primary border-primary/60 box-glow-cyan"
                  : "bg-card/40 text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Flagship: Research @ IISc */}
        {showResearch && <ResearchSection />}

        {/* Featured: Underwater Robotics */}
        {showUnderwater && (
          <motion.div
            ref={underwaterRef}
            style={{ y: parallaxY, scale: parallaxScale, opacity: parallaxOpacity }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="border border-primary/30 rounded-xl overflow-hidden bg-card/30 box-glow-cyan">
              {/* Main terminal header */}
              <div className="terminal-block hidden sm:block m-4 p-4 text-xs">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-neon-green/60" />
                  <div className="w-3 h-3 rounded-full bg-secondary/60" />
                  <span className="text-terminal-comment ml-2 text-[10px]">underwater_stack</span>
                </div>
                <pre className="text-terminal-text whitespace-pre-wrap leading-relaxed">{`$ initialize_underwater_stack()
[INFO] 6-DoF Control Systems Loaded
[INFO] Sensor Fusion Active
[INFO] MAVLink Communication Established`}</pre>
              </div>

              <div className="px-4 pt-5 sm:px-6 sm:pt-0 pb-2">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      Underwater <span className="gradient-text">Robotics Systems</span>
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                      Designed and built multiple underwater robotic platforms ranging from teleoperated systems to fully autonomous vehicles. Focused on 6-DoF control, real-time pose estimation, sensor fusion, and embedded system integration for stable underwater navigation.
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex max-w-full flex-col items-start gap-2 md:items-end">
                    {underwaterBadges.map((badge) => (
                      <AchievementBadge
                        key={badge.label}
                        tier={badge.tier}
                        label={badge.label}
                        icon={badge.icon}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sub-projects */}
              <div className="grid md:grid-cols-2 gap-4 px-3 sm:px-4 pb-4 sm:pb-6">
                {underwaterSubProjects.map((sp) => (
                  <SubProjectCard
                    key={sp.title}
                    project={sp}
                    onMediaClick={handleMediaClick}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Featured: ROS & Autonomous Systems */}
        {showRos && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="border border-primary/30 rounded-xl overflow-hidden bg-card/30 box-glow-cyan">
              {/* Main terminal header */}
              <div className="terminal-block hidden sm:block m-4 p-4 text-xs">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-neon-green/60" />
                  <div className="w-3 h-3 rounded-full bg-secondary/60" />
                  <span className="text-terminal-comment ml-2 text-[10px]">ros2_stack</span>
                </div>
                <pre className="text-terminal-text whitespace-pre-wrap leading-relaxed">{`$ initialize_ros2_stack()
[INFO] ROS 2 Humble Core Loaded
[INFO] Navigation & SLAM Active
[INFO] Multi-Agent Framework Initialized`}</pre>
              </div>

              <div className="px-4 pt-5 sm:px-6 sm:pt-0 pb-2">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      ROS & <span className="gradient-text">Autonomous Systems</span>
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                      Building intelligent autonomous systems using ROS 2, covering mobile robotics, multi-robot coordination, and aerial autonomy. Focused on SLAM, Nav2-based navigation, sensor fusion, and AI-driven decision-making for real-world applications.
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex max-w-full flex-wrap md:flex-col gap-2">
                    {rosBadges.map((badge) => (
                      <AchievementBadge key={badge} tier={badge.startsWith("e-Yantra") ? "recognition" : "result"} icon={badge.startsWith("e-Yantra") ? "trophy" : undefined} label={badge} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sub-projects */}
              <div className="grid md:grid-cols-2 gap-4 px-3 sm:px-4 pb-4 sm:pb-6">
                {rosSubProjects.map((sp) => (
                  <SubProjectCard
                    key={sp.title}
                    project={sp}
                    onMediaClick={handleMediaClick}
                  />
                ))}
              </div>
            </div>
           </motion.div>
        )}

        {/* Standard project cards */}
        {filteredStandard.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredStandard.map((project, index) => (
              <StandardProjectCard
                key={project.title}
                project={project}
                index={index}
                onMediaClick={handleMediaClick}
              />
            ))}
          </div>
        )}
      </div>

      <MediaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        media={modalMedia}
        initialIndex={modalIndex}
      />
    </section>
  );
};

export default ProjectsSection;







