import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/scrollManager";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Mail, MessageCircle, Send, MapPin, Clock } from "lucide-react";

const socials = [
  { href: "https://github.com/touseef7878",                          icon: <Github size={16} />,       label: "GitHub",   handle: "touseef7878" },
  { href: "https://www.linkedin.com/in/touseef-ur-rehman-6b2888372", icon: <Linkedin size={16} />,     label: "LinkedIn", handle: "touseef-ur-rehman" },
  { href: "mailto:touseefurrehman5554@gmail.com",                    icon: <Mail size={16} />,          label: "Email",    handle: "touseefurrehman5554@gmail.com" },
  { href: "https://wa.me/923476992071",                              icon: <MessageCircle size={16} />, label: "WhatsApp", handle: "+92 347 699 2071" },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast }  = useToast();
  const [form, setForm]         = useState({ name: "", email: "", message: "" });
  const [sending, setSending]   = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-heading",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-heading", start: "top 88%", once: true } }
      );
      gsap.fromTo(".contact-col",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: ".contact-col", start: "top 85%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "084c5ccf-c73b-4194-b768-1be696b13e28",
          name: form.name, email: form.email, message: form.message,
          subject: `Portfolio contact from ${form.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Message sent!", description: "I'll get back to you shortly." });
        setForm({ name: "", email: "", message: "" });
      } else throw new Error();
    } catch {
      toast({ title: "Failed to send", description: "Try emailing me directly.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-28 md:py-36">
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="contact-heading text-center mb-20 will-change-transform">
          <span className="section-label mb-5 inline-flex">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-4 max-w-xs mx-auto">
            Have a project in mind? Let's build something great.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* Info */}
          <div className="contact-col will-change-transform space-y-5">
            <div className="bg-card border border-white/8 rounded-2xl p-6 space-y-5">
              {[
                { icon: <MapPin size={14} />, label: "Location",     value: "Taxila, Pakistan" },
                { icon: <Clock size={14} />,  label: "Availability", value: "Open to freelance & internships" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-primary"
                       style={{ background: "hsl(var(--primary)/0.1)", border: "1px solid hsl(var(--primary)/0.2)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-white/8 rounded-2xl p-6">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-5">Connect</p>
              <div className="space-y-3">
                {socials.map((s) => (
                  <a
                    key={s.label} href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/30 group-hover:bg-primary/8 transition-all duration-200">
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium group-hover:text-primary transition-colors">{s.label}</p>
                      <p className="text-[10px] text-muted-foreground">{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-col will-change-transform">
            <div className="bg-card border border-white/8 rounded-2xl p-7">
              <h3 className="font-semibold mb-6">Send a message</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-white/3 border-white/8 focus:border-primary/40 rounded-xl text-sm h-11"
                  disabled={sending}
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-white/3 border-white/8 focus:border-primary/40 rounded-xl text-sm h-11"
                  disabled={sending}
                />
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-white/3 border-white/8 focus:border-primary/40 rounded-xl text-sm resize-none"
                  disabled={sending}
                />
                <Button
                  type="submit" disabled={sending}
                  className="rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 font-semibold h-11 transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={14} /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
