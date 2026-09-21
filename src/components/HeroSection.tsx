import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import headshotAsset from "@/assets/ammar-resume-headshot.jpg.asset.json";
import { assetUrl } from "@/lib/assetUrl";

const rotatingTerms = [
  "Control Systems",
  "Embedded Systems",
  "Autonomous Robots",
  "ROS Development",
  "Path Planning",
  "Computer Vision",
  "Sensor Fusion",
];

const HeroSection = () => {
  const [termIndex, setTermIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = rotatingTerms[termIndex];
    const timeout = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === current) {
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTermIndex((prev) => (prev + 1) % rotatingTerms.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting ? current.slice(0, displayText.length - 1) : current.slice(0, displayText.length + 1)
      );
    }, timeout);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, termIndex]);

  return (
    <section id="home" className="relative min-h-0 sm:min-h-[100svh] pt-20 sm:pt-28 pb-10 sm:pb-16 flex items-center justify-center overflow-hidden scanline section-divider">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            {/* Terminal prompt */}
            <div className="inline-flex rounded-md border border-[hsl(var(--accent-teal))]/25 bg-card/75 px-3 py-2 font-mono text-sm mb-3 sm:mb-4 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 text-[hsl(var(--accent-deep))]">
              <span>ammar@robotics</span>
              <span>:</span>
              <span>~</span>
              <span>$</span>
              <span className="ml-2">whoami</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-2 tracking-tight leading-none">
              <span className="text-[hsl(var(--text-name))]">Ammar</span>{" "}
              <span className="text-[hsl(var(--accent-teal))]">Bari</span>
            </h1>

            <div className="font-mono text-base sm:text-lg md:text-xl mt-4 mb-5 sm:mb-8 min-h-8 rounded-md border border-border bg-card/75 px-3 py-2 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 text-[hsl(var(--text-heading))]">
              <span>{">"}</span>{" "}
              <span>{displayText}</span>
              <span className="animate-blink-cursor">|</span>
            </div>

            <p className="text-base sm:text-lg text-[hsl(var(--text-body))] max-w-xl mb-6 sm:mb-8 leading-relaxed">
              Electrical Engineering student at Aligarh Muslim University, focused on robotics. 
              I build control systems, embedded software and robots that can navigate their surroundings.
            </p>

            <div className="flex flex-col min-[400px]:flex-row flex-wrap gap-3 sm:gap-4">
              <a
                href="#projects"
                className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-[hsl(var(--text-name))] text-[hsl(var(--bg-base))] font-mono text-sm rounded-md transition-all duration-300 hover:opacity-90"
              >
                {">"} view_projects()
              </a>
              <a
                href="#contact"
                className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-transparent border border-[hsl(var(--accent-teal))] text-[hsl(var(--accent-deep))] font-mono text-sm rounded-md hover:bg-[hsl(var(--accent-teal))/0.08] transition-all duration-300"
              >
                {">"} contact_me()
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-44 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border border-[hsl(var(--accent-teal))]/30 bg-[hsl(var(--bg-base))] shadow-lg">
              <img
                src={assetUrl(headshotAsset.url)}
                alt="Ammar Bari"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[hsl(var(--text-name))]/5" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

