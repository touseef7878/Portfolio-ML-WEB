import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/scrollManager";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Mail, MessageCircle, Send, MapPin, Globe } from "lucide-react";

const socials = [
  { href: "https://github.com/touseef7878",           icon: <Github size={14} />,        label: "GitHub",    handle: "touseef7878" },
  { href: "https://www.linkedin.com/in/touseef123",   icon: <Linkedin size={14} />,      label: "LinkedIn",  handle: "touseef123" },
  { href: "mailto:touseefurrehman5554@gmail.com",      icon: <Mail size={14} />,           label: "Email",     handle: "touseefurrehman5554@gmail.com" },
  { href: "https://wa.me/923101533429",                icon: <MessageCircle size={14} />,  label: "WhatsApp",  handle: "+92 310 153 3429" },
  { href: "https://touseef.eu.cc",                     icon: <Globe size={14} />,           label: "Website",   handle: "touseef.eu.cc" },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast }  = useToast();
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-heading",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-heading", start: "top 88%", once: true } }
      );
      gsap.fromTo(".contact-col",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.15,
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
          access_key: "d576f9cb-f2a5-4239-b853-3857a5379b12",
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
    <section id="contact" ref={sectionRef} className="py-28 md:py-36" style={{ background: "#0A0A0A" }}>
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="contact-heading mb-20 opacity-0">
          <span className="section-label mb-4 inline-flex">Contact</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-4" style={{ color: "#FFFFFF" }}>
            Get In Touch
          </h2>
          <p className="text-sm mt-3 max-w-sm" style={{ color: "#555555" }}>
            Have a project in mind or want to work together? Let's talk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl">

          {/* Info */}
          <div className="contact-col opacity-0 space-y-6">

            {/* Location + availability */}
            <div className="rounded-xl p-6 space-y-5"
              style={{ background: "#111111", border: "1px solid #1A1A1A" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.12)" }}>
                  <MapPin size={13} style={{ color: "#22C55E" }} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#444444" }}>Location</p>
                  <p className="text-sm font-medium" style={{ color: "#EBEBEB" }}>Taxila, Rawalpindi, Pakistan</p>
                </div>
              </div>
              <div style={{ height: "1px", background: "#1A1A1A" }} />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <span className="green-dot green-pulse" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#444444" }}>Status</p>
                  <p className="text-sm font-medium" style={{ color: "#EBEBEB" }}>Open to freelance &amp; full-time</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="rounded-xl p-6" style={{ background: "#111111", border: "1px solid #1A1A1A" }}>
              <p className="text-[10px] uppercase tracking-widest mb-5" style={{ color: "#444444" }}>Connect</p>
              <div className="space-y-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-3 group rounded-lg p-2 -mx-2 transition-all duration-200"
                    style={{ color: "#555555" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#FFFFFF")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#555555")}>
                    <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                      style={{ background: "#1A1A1A", border: "1px solid #222222" }}>
                      {s.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium" style={{ color: "inherit" }}>{s.label}</p>
                      <p className="text-[10px] font-mono truncate" style={{ color: "#444444" }}>{s.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-col opacity-0">
            <div className="rounded-xl p-7" style={{ background: "#111111", border: "1px solid #1A1A1A" }}>
              <h3 className="text-sm font-bold mb-6" style={{ color: "#FFFFFF" }}>Send a message</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input placeholder="Your Name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={sending}
                  className="h-10 rounded-lg text-sm border-none focus-visible:ring-1 focus-visible:ring-green-500/40"
                  style={{ background: "#0A0A0A", color: "#EBEBEB", border: "1px solid #222222" }} />
                <Input type="email" placeholder="Your Email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={sending}
                  className="h-10 rounded-lg text-sm border-none focus-visible:ring-1 focus-visible:ring-green-500/40"
                  style={{ background: "#0A0A0A", color: "#EBEBEB", border: "1px solid #222222" }} />
                <Textarea placeholder="Your Message" rows={5} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  disabled={sending}
                  className="rounded-lg text-sm resize-none border-none focus-visible:ring-1 focus-visible:ring-green-500/40"
                  style={{ background: "#0A0A0A", color: "#EBEBEB", border: "1px solid #222222" }} />

                <button type="submit" disabled={sending}
                  className="h-10 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                  style={{ background: "#FFFFFF", color: "#0A0A0A" }}
                  onMouseEnter={e => !sending && ((e.currentTarget as HTMLElement).style.background = "#E5E5E5")}
                  onMouseLeave={e => !sending && ((e.currentTarget as HTMLElement).style.background = "#FFFFFF")}>
                  {sending ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-black/20 border-t-black/70 rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <><Send size={13} /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
