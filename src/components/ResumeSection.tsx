import { useState } from "react";
import { ArrowDownToLine, ArrowUpRight, Terminal, LayoutDashboard, ChevronRight,  } from "lucide-react";
import { assetUrl } from "@/lib/assetUrl";

type Entry = { title: string; detail: string; date?: string; points: string[] };
const sections = [
  { id: "experience", label: "Experience", description: "From research to working hardware.", entries: [
    { title: "Robotics Engineering Intern", detail: "IISc Bengaluru · Department of Aerospace Engineering", date: "Jun – Aug 2026", points: ["Built a Raspberry Pi 5 pose-estimation system using OpenCV, PnP and an asymmetric IR LED array for drone navigation.", "Integrated ESP32 UWB modules for spatial trilateration and drone landing-zone localisation.", "Developed Kalman filtering, hypothesis testing and UDP telemetry for the tracking pipeline."] },
    { title: "Mechatronics Intern", detail: "Industrial IoT · Pump monitoring", date: "Jan 2026", points: ["Built an ESP32 and Hall-effect sensor system to track grease-pump lever counts and angular displacement.", "Sent kinematics and maintenance logs over Bluetooth Low Energy for remote diagnostics."] },
    { title: "Product Development Intern", detail: "Assistive devices · Design and manufacturing", date: "Jul – Oct 2024", points: ["Designed an adaptable orthopedic device for clubfoot treatment with clinicians and engineers.", "Used 3D scanning and additive manufacturing for patient-specific components."] },
  ] },
  { id: "projects", label: "Selected projects", description: "Autonomy above and below the surface.", entries: [
    { title: "Autonomous Underwater Vehicle", detail: "AUV · Perception and control", date: "Jan 2025", points: ["6-DoF PnP pose estimation with vision, IMU and depth-data fusion.", "Jetson Xavier NX and Pixhawk communication over MAVLink; ArduSub PID tuning and an eight-thruster configuration."] },
    { title: "Autonomous Surface Vehicle", detail: "ASV · Navigation and telemetry", date: "Nov 2024", points: ["Dual-thruster electronics architecture with Jetson Xavier NX, IMUs and RTK GPS.", "Carrot-following waypoint navigation with PID control, TCP/UDP telemetry and LoRa corrections and overrides."] },
    { title: "Remotely Operated Underwater Vehicle", detail: "ROV · Teleoperation", date: "Nov 2024", points: ["Raspberry Pi joystick control with MAVLink telemetry and Pixhawk/ArduSub assisted modes.", "Eight-thruster frame with ESC, motor-mixing and PID validation."] },
    { title: "Personalized Electronic Door Lock", detail: "Embedded systems · Mechanical design", date: "Dec 2023", points: ["Designed a custom CAD locking mechanism and wireless actuation using an ESP32, stepper motor and motor driver."] },
  ] },
  { id: "skills", label: "Technical toolkit", description: "The tools behind the systems.", entries: [
    { title: "Programming & tools", detail: "Development", points: ["Python", "Git / GitHub", "Linux (Ubuntu)", "Docker"] },
    { title: "Robotics & simulation", detail: "Perception and autonomy", points: ["ROS 2 Humble / Jazzy", "Gazebo", "Nav2", "RViz2", "URDF", "OpenCV", "TensorFlow"] },
    { title: "Control & navigation", detail: "Estimation and motion", points: ["6-DoF control", "PnP pose estimation", "Sensor fusion / EKF", "PID tuning", "Path planning"] },
    { title: "Embedded systems", detail: "Hardware integration", points: ["Pixhawk / ArduSub", "MAVLink", "8051", "NVIDIA Jetson", "Raspberry Pi", "UART / I²C / SPI", "PWM / ESC"] },
    { title: "Design & manufacturing", detail: "From CAD to prototype", points: ["Fusion 360", "Cura", "3D printing"] },
  ] },
  { id: "education", label: "Education", description: "Electrical engineering, applied to robotics.", entries: [
    { title: "B.Tech · Electrical Engineering", detail: "Aligarh Muslim University", date: "Aug 2023 – Jul 2027", points: [] },
    { title: "Senior Secondary · Class XII", detail: "AMU Board", date: "2022", points: ["92.7%"] },
    { title: "Secondary · Class X", detail: "CBSE Board", date: "2020", points: ["87%"] },
  ] },
  { id: "awards", label: "Recognition", description: "Research, competitions and team milestones.", entries: [
    { title: "IEEE DELCON 2025", detail: "Jamia Millia Islamia", date: "Oct 2025", points: ["Presented the AUV project at the IEEE Delhi Section Conference."] },
    { title: "TechnoXian · RoboHockey", detail: "Competition", date: "Aug 2025", points: ["Built a RoboHockey robot and qualified in the first round."] },
    { title: "Best Innovation Award", detail: "MTS Tech Symposium · IIT Madras", date: "Mar 2025", points: ["Recognised for the team's Autonomous Underwater Vehicle."] },
    { title: "RoboSoccer · Tryst", detail: "IIT Delhi", date: "Mar 2025", points: ["Designed and built a remote-controlled soccer robot."] },
    { title: "SAUVC · Shortlisted team", detail: "Singapore", date: "Jan 2025", points: ["Selected as one of 111 global teams."] },
    { title: "2nd Place · AMUROVC 3.0", detail: "Aligarh Muslim University", date: "Nov 2024", points: ["Team award for the Remotely Operated Underwater Vehicle."] },
  ] },
  { id: "leadership", label: "Leadership", description: "Building systems. Sharing the process.", entries: [
    { title: "Electronics Team Lead", detail: "AUV-ZHCET", date: "Aug 2024 – Jul 2025", points: ["Led work on ROV/AUV electronics, control algorithms, pose estimation and sensor/actuator integration.", "Delivered a four-day robotic-arm workshop for 120+ participants and a one-day RC-car workshop for 170+ participants."] },
    { title: "Volunteer", detail: "AMU Roboclub", date: "Aug 2024 – Jul 2025", points: ["Conducted an Arduino workshop and contributed technical input to RoboSoccer.", "Coordinated VERCERA logistics, outreach and event execution."] },
  ] },
] satisfies { id: string; label: string; description: string; entries: Entry[] }[];

const ResumeSection = () => {
  const [view, setView] = useState<"visual" | "terminal">("visual");
  const [activeId, setActiveId] = useState("experience");
  const [command, setCommand] = useState("");
  const [message, setMessage] = useState("");
  const active = sections.find(s => s.id === activeId)!;
  const select = (id: string) => { setActiveId(id); setMessage(""); };
  const runCommand = (event: React.FormEvent) => {
    event.preventDefault();
    const value = command.trim().toLowerCase().replace(/^show\s+/, "");
    if (sections.some(s => s.id === value)) select(value);
    else if (value === "help" || value === "ls") setMessage("Available commands: experience, projects, skills, education, awards, leadership, whoami, help.");
    else if (value === "whoami") setMessage("Ammar Bari · Electrical Engineering, Aligarh Muslim University · Robotics, control, sensor fusion and autonomous navigation.");
    else setMessage(`Unknown command: ${command.trim() || "(empty)"}. Type help or choose a section.`);
    setCommand("");
  };

  return (
    <section id="resume" className="py-14 sm:py-24 relative section-divider">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div><p className="font-mono text-sm text-primary mb-2">// the person behind the projects</p><h2 className="text-4xl font-bold">My <span className="gradient-text">Resume</span></h2><p className="text-muted-foreground mt-3">Explore my experience, systems and technical toolkit.</p></div>
          <a href={assetUrl("/Ammar_Bari_CV.pdf")} download className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-background text-sm font-medium hover:opacity-85"><ArrowDownToLine size={17} /> Download CV <span className="opacity-60 text-xs">PDF</span></a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border p-6 md:p-8 bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center gap-5 min-w-0"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary mb-1">Engineering profile</p><h3 className="text-2xl md:text-3xl font-semibold">Ammar Bari</h3><p className="text-sm text-muted-foreground mt-1">Electrical Engineering · AMU · Class of 2027</p></div></div>
            <div className="flex rounded-lg bg-muted p-1 gap-1" aria-label="Resume presentation">
              <button type="button" aria-pressed={view === "visual"} onClick={() => setView("visual")} className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm ${view === "visual" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}><LayoutDashboard size={16} /> Visual</button>
              <button type="button" aria-pressed={view === "terminal"} onClick={() => setView("terminal")} className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm ${view === "terminal" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}><Terminal size={16} /> Terminal</button>
            </div>
          </div>

          <div className={`grid lg:grid-cols-[240px_minmax(0,1fr)] ${view === "terminal" ? "bg-card text-foreground" : ""}`}>
            <nav aria-label="Resume sections" className={`min-w-0 p-3 sm:p-4 lg:p-5 border-b lg:border-b-0 lg:border-r ${view === "terminal" ? "border-border bg-muted/20" : "border-border bg-muted/20"}`}>
              <p className={`hidden lg:block text-[10px] font-mono uppercase tracking-[0.2em] mb-5 px-3 ${view === "terminal" ? "text-muted-foreground" : "text-muted-foreground"}`}>{view === "terminal" ? "~/ammar/resume" : "Explore the profile"}</p>
              <div className="mobile-filter-strip flex gap-1 overflow-x-auto lg:overflow-visible lg:flex-col">
                {sections.map((s, i) => { const chosen = activeId === s.id; return <button key={s.id} type="button" aria-pressed={chosen} onClick={() => select(s.id)} className={`shrink-0 whitespace-nowrap flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors ${chosen ? view === "terminal" ? "bg-primary/10 text-primary font-medium" : "bg-primary/10 text-primary font-medium" : view === "terminal" ? "text-muted-foreground hover:bg-muted hover:text-foreground" : "text-muted-foreground hover:bg-muted"}`}><span>{view === "terminal" ? s.id : s.label}</span><span className="hidden lg:block ml-auto font-mono text-[10px] opacity-50">0{i + 1}</span></button>; })}
              </div>
              <a href={assetUrl("/Ammar_Bari_CV.pdf")} target="_blank" rel="noopener noreferrer" className="mt-6 hidden lg:inline-flex items-center gap-2 px-3 text-xs underline underline-offset-4 opacity-70">Open original CV <ArrowUpRight size={13} /></a>
            </nav>

            <div className="min-w-0 p-5 sm:p-8">
              {view === "visual" ? <>
                <div className="mb-7"><p className="font-mono text-[10px] text-primary uppercase tracking-[0.16em] mb-2">{String(sections.indexOf(active) + 1).padStart(2, "0")} / Profile</p><h4 className="text-2xl font-semibold">{active.label}</h4><p className="mt-2 text-sm text-muted-foreground">{active.description}</p></div>
                <div className={activeId === "experience" || activeId === "leadership" ? "border-l border-primary/25 ml-2 space-y-7" : "grid sm:grid-cols-2 gap-4"}>
                  {active.entries.map((entry) => <article key={entry.title} className={activeId === "experience" || activeId === "leadership" ? "relative pl-6" : "rounded-xl border border-border bg-muted/15 p-5"}>
                    {(activeId === "experience" || activeId === "leadership") && <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-card" />}
                    {"date" in entry && <p className="text-[11px] font-mono text-primary mb-2">{entry.date}</p>}
                    <h5 className="font-semibold text-base">{entry.title}</h5><p className="text-sm text-muted-foreground mt-1 mb-3">{entry.detail}</p>
                    {activeId === "skills" ? <div className="flex flex-wrap gap-2">{entry.points.map(p => <span key={p} className="text-xs rounded-md border border-primary/15 bg-primary/5 px-2.5 py-1.5">{p}</span>)}</div> : <ul className="space-y-2">{entry.points.map(p => <li key={p} className="flex gap-2 text-sm text-muted-foreground leading-relaxed"><ChevronRight size={14} className="shrink-0 mt-1 text-primary/60" /><span>{p}</span></li>)}</ul>}
                  </article>)}
                </div>
              </> : <div className="font-mono">
                <div className="flex items-center gap-2 border-b border-border pb-4 mb-6"><span className="w-2 h-2 rounded-full bg-destructive/60" /><span className="w-2 h-2 rounded-full bg-neon-green/60" /><span className="w-2 h-2 rounded-full bg-secondary/60" /><span className="ml-2 text-xs text-muted-foreground">resume / {active.id}</span><span className="ml-auto text-[10px] text-primary">INTERACTIVE</span></div>
                <p className="text-sm mb-6"><span className="text-primary">ammar@portfolio</span><span className="text-terminal-comment">:~$ </span>show {active.id}</p>
                <div aria-live="polite" className="space-y-6">{message ? <p className="text-sm text-primary leading-relaxed">{message}</p> : active.entries.map(entry => <div key={entry.title} className="border-l-2 border-primary/25 pl-4"><h5 className="text-sm text-primary font-semibold">{entry.title}</h5><p className="text-xs text-muted-foreground mt-1">{entry.detail}{"date" in entry ? ` | ${entry.date}` : ""}</p><ul className="mt-3 space-y-2">{entry.points.map(p => <li key={p} className="text-xs sm:text-sm leading-relaxed text-muted-foreground"><span className="text-terminal-comment">+ </span>{p}</li>)}</ul></div>)}</div>
                <form onSubmit={runCommand} className="mt-8 border-t border-border pt-5"><label htmlFor="resume-command" className="block text-[11px] text-muted-foreground mb-3">Choose a section above, or type a command. Try “skills” or “help”.</label><div className="flex items-center gap-3"><span className="text-primary" aria-hidden="true">$</span><input id="resume-command" value={command} onChange={e => setCommand(e.target.value)} autoComplete="off" spellCheck={false} placeholder="Type a command…" className="min-w-0 flex-1 bg-transparent text-sm py-2 text-foreground placeholder:text-terminal-comment focus:outline-none focus:ring-1 focus:ring-primary/60 rounded px-2" /><button type="submit" className="rounded border border-primary/40 px-3 py-2 text-xs text-primary hover:bg-primary/10">Run ↵</button></div></form>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ResumeSection;

