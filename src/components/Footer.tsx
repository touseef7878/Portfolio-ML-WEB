import { Github, Linkedin, MessageCircle, Mail, ArrowUp, Globe } from "lucide-react";

const Footer = () => (
  <footer className="py-12" style={{ borderTop: "1px solid #1A1A1A", background: "#0A0A0A" }}>
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div>
          <a href="#hero"
            className="text-sm font-black tracking-tight transition-colors duration-200"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#FFFFFF" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#22C55E")}
            onMouseLeave={e => (e.currentTarget.style.color = "#FFFFFF")}>
            Touseef.
          </a>
          <p className="text-[10px] mt-1" style={{ color: "#444444" }}>
            ML Engineer · Full-Stack Developer · Co-founder @ Duonex
          </p>
        </div>

        {/* Socials */}
        <div className="flex gap-2">
          {[
            { href: "https://github.com/touseef7878",           icon: <Github size={14} />,        label: "GitHub" },
            { href: "https://www.linkedin.com/in/touseef123",   icon: <Linkedin size={14} />,      label: "LinkedIn" },
            { href: "mailto:touseefurrehman5554@gmail.com",      icon: <Mail size={14} />,           label: "Email" },
            { href: "https://wa.me/923101533429",                icon: <MessageCircle size={14} />,  label: "WhatsApp" },
            { href: "https://touseef.eu.cc",                     icon: <Globe size={14} />,           label: "Website" },
          ].map((s) => (
            <a key={s.label} href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={s.label}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ border: "1px solid #1A1A1A", color: "#444444" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "#22C55E";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.2)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "#444444";
                (e.currentTarget as HTMLElement).style.borderColor = "#1A1A1A";
              }}>
              {s.icon}
            </a>
          ))}
        </div>

        {/* Copyright + back to top */}
        <div className="flex items-center gap-4 flex-wrap justify-center md:justify-end">
          <p className="text-[10px] font-mono" style={{ color: "#333333" }}>
            © 2026 Muhammad Touseef ur Rehman
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{ border: "1px solid #1A1A1A", color: "#444444" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
              (e.currentTarget as HTMLElement).style.borderColor = "#333333";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "#444444";
              (e.currentTarget as HTMLElement).style.borderColor = "#1A1A1A";
            }}>
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </div>
  </footer>
);

export default Footer;
