import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-14 sm:py-24 relative section-divider">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12">

          <div className="font-mono text-sm text-terminal-text mb-2">
            {"// section: about"}
          </div>
          <h2 className="text-4xl font-bold">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6">

            <p className="text-muted-foreground leading-relaxed">
              I’m an Electrical Engineering student at Aligarh Muslim University, focused on robotics. I build the electronics and software that help robots sense their surroundings, control their movement and navigate.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My projects include underwater vehicles, indoor drone tracking and coordination between multiple robots. I work on estimating position, combining sensor readings and tuning motor control so these systems behave reliably. My toolkit includes Raspberry Pi, NVIDIA Jetson, Pixhawk and ROS 2.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I presented my Autonomous Underwater Vehicle project at IEEE DELCON 2025. Alongside project work, I take part in robotics competitions and lead practical workshops where students build and test their own robots.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="space-y-4">

            {/* Terminal bio blocks */}
            <div className="terminal-block p-4">
              <div className="text-terminal-comment text-xs mb-2"># ammar.config</div>
              <div className="text-xs space-y-1">
                <div><span className="text-primary">name</span><span className="text-muted-foreground"> = </span><span className="text-secondary">"Ammar Bari"</span></div>
                <div><span className="text-primary">role</span><span className="text-muted-foreground"> = </span><span className="text-secondary">"Electrical Engineering Undergrad"</span></div>
                <div><span className="text-primary">location</span><span className="text-muted-foreground"> = </span><span className="text-secondary">"AMU"</span></div>
                <div><span className="text-primary">interests</span><span className="text-muted-foreground"> = </span><span className="text-foreground">[</span></div>
                <div className="pl-4"><span className="text-secondary">"Control Systems"</span>,</div>
                <div className="pl-4"><span className="text-secondary">"Embedded Firmware"</span>,</div>
                <div className="pl-4"><span className="text-secondary">"Autonomous Navigation"</span>,</div>
                <div className="pl-4"><span className="text-secondary">"Open Source Robotics"</span></div>
                <div><span className="text-foreground">]</span></div>
                <div><span className="text-primary">status</span><span className="text-muted-foreground"> = </span><span className="text-secondary">"Building the future, one motor at a time"</span></div>
              </div>
            </div>

            <div className="terminal-block p-4">
              <div className="text-terminal-comment text-xs mb-3"># current_stack.sh</div>
              <div className="text-xs space-y-2 leading-relaxed">
                <div><span className="text-terminal-text">$</span> <span className="text-foreground">echo $PROGRAMMING_AND_TOOLS</span></div>
                <div className="text-muted-foreground">Python, Git/GitHub, Linux (Ubuntu), Docker</div>
                <div><span className="text-terminal-text">$</span> <span className="text-foreground">echo $ROBOTICS_AND_SIMULATION</span></div>
                <div className="text-muted-foreground">ROS 2 (Humble/Jazzy), Gazebo, Nav2, RViz2, URDF, OpenCV</div>
                <div><span className="text-terminal-text">$</span> <span className="text-foreground">echo $EMBEDDED_SYSTEMS</span></div>
                <div className="text-muted-foreground">Pixhawk (ArduSub), MAVLink, 8051 Microcontroller, NVIDIA Jetson, Raspberry Pi,
UART/I2C/SPI, PWM/ESC</div>
                <div><span className="text-terminal-text">$</span> <span className="text-foreground">echo $DESIGN_AND_MANUFACTURING</span></div>
                <div className="text-muted-foreground">Fusion 360 (CAD), Cura (3D Printing)</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);
};

export default AboutSection;

