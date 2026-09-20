import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT || "https://formspree.io/f/mwlpejjd").trim();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    if (!formData.name.trim() || !formData.message.trim()) { setError("Please enter your name and a message."); setStatus("error"); return; }
    if (!endpoint) { setError("The contact form is being connected. Please use the email link instead."); setStatus("error"); return; }
    setStatus("sending"); setError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const body = new FormData();
      body.set("name", formData.name.trim()); body.set("email", formData.email.trim()); body.set("message", formData.message.trim());
      const response = await fetch(endpoint, { method: "POST", body, headers: { Accept: "application/json" }, signal: controller.signal });
      if (!response.ok) throw new Error("The service did not accept the message.");
      setStatus("sent"); setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error"); setError("We couldn’t confirm delivery. Your message is still here—try again, or use the email link.");
    } finally { window.clearTimeout(timeout); }
  };

  return (
    <section id="contact" className="py-14 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12">

          <div className="font-mono text-sm text-terminal-text mb-2">
            {"// section: contact"}
          </div>
          <h2 className="text-4xl font-bold">
            Get In <span className="gradient-text">Touch</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4">

            <div>
              <label htmlFor="contact-name" className="font-mono text-xs text-muted-foreground mb-1 block">
                <span className="text-primary">const</span> name <span className="text-muted-foreground">=</span>
              </label>
              <input
                id="contact-name" name="name" autoComplete="name" type="text"
                required
                disabled={status === "sending"}
                value={formData.name}
                onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setStatus("idle"); }}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground font-mono text-base sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder='"Your Name"' />

            </div>
            <div>
              <label htmlFor="contact-email" className="font-mono text-xs text-muted-foreground mb-1 block">
                <span className="text-primary">const</span> email <span className="text-muted-foreground">=</span>
              </label>
              <input
                id="contact-email" name="email" autoComplete="email" type="email"
                required
                disabled={status === "sending"}
                value={formData.email}
                onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setStatus("idle"); }}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground font-mono text-base sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder='"you@email.com"' />

            </div>
            <div>
              <label htmlFor="contact-message" className="font-mono text-xs text-muted-foreground mb-1 block">
                <span className="text-primary">const</span> message <span className="text-muted-foreground">=</span>
              </label>
              <textarea id="contact-message" name="message"
                required
                disabled={status === "sending"}
                rows={5}
                value={formData.message}
                onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setStatus("idle"); }}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground font-mono text-base sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                placeholder='"Tell me about your project or opportunity…"' />

            </div>
            <button
              type="submit"
              disabled={status === "sending" || !endpoint}
              className="disabled:opacity-50 disabled:cursor-not-allowed inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-sm rounded-md hover:shadow-[0_0_20px_hsl(177_100%_50%/0.3)] transition-all duration-300">

              <Send size={16} />
              {status === "sending" ? "Sending…" : status === "sent" ? "Message sent! ✓" : "send_message()"}
            </button>
            {!endpoint && <p className="text-xs text-muted-foreground">This form is currently unavailable. Email me at <a className="underline" href="mailto:ammarbariamu@gmail.com">ammarbariamu@gmail.com</a>.</p>}
            {status === "error" && <p role="alert" className="text-sm text-destructive">{error}</p>}
            {status === "sent" && <p role="status" className="text-sm text-primary">Your message was submitted successfully.</p>}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6">

            {/* Terminal echo */}
            <div className="terminal-block p-4">
              <div className="text-terminal-comment text-xs mb-3"># contact_info.sh</div>
              <div className="text-xs space-y-2">
                <div>
                  <span className="text-terminal-text">$</span>{" "}
                  <span className="text-foreground">echo $EMAIL</span>
                </div>
                <a href="mailto:ammarbariamu@gmail.com" className="block text-primary break-all hover:underline">ammarbariamu@gmail.com</a>
                <div>
                  <span className="text-terminal-text">$</span>{" "}
                  <span className="text-foreground">echo $GITHUB</span>
                </div>
                <a href="https://github.com/ammar-bari" target="_blank" rel="noopener noreferrer" className="block text-primary break-all hover:underline">https://github.com/ammar-bari</a>
                <div>
                  <span className="text-terminal-text">$</span>{" "}
                  <span className="text-foreground">echo $LINKEDIN</span>
                </div>
                <a href="https://www.linkedin.com/in/ammar-bari-35249420a/" target="_blank" rel="noopener noreferrer" className="block text-primary break-all hover:underline">https://www.linkedin.com/in/ammar-bari-35249420a/</a>
                <div>
                  <span className="text-terminal-text">$</span>{" "}
                  <span className="text-foreground">echo $STATUS</span>
                </div>
                <div className="text-secondary">Open to opportunities & collaborations</div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-4">
              {[
{ icon: Github, label: "GitHub", href: "https://github.com/ammar-bari" },
              { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ammar-bari-35249420a/" },
              { icon: Mail, label: "Email", href: "mailto:ammarbariamu@gmail.com" }].
              map((social) =>
              <a
                key={social.label}
                href={social.href}
                target={social.label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 neon-border rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300 font-mono text-sm">

                  <social.icon size={16} />
                  {social.label}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-4 sm:px-6 mt-14 sm:mt-24 pt-8 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-terminal-text">$</span> echo "© 2026 Ammar Bari. Built with passion & caffeine."
          </p>
          <p className="font-mono text-xs text-terminal-comment">
            // powered by robotics & code
          </p>
        </div>
      </div>
    </section>);

};

export default ContactSection;
