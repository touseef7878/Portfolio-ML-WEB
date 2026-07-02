import { Github, Linkedin, MessageCircle, Mail, ArrowUp } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-white/6 py-10">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        <div>
          <span className="text-lg font-extrabold tracking-tight text-gradient" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Touseef.
          </span>
          <p className="text-xs text-muted-foreground mt-1">Full-Stack Developer · AI/ML Engineer</p>
        </div>

        <div className="flex gap-3">
          {[
            { href: "https://github.com/touseef7878",                          icon: <Github size={15} />,       label: "GitHub" },
            { href: "https://www.linkedin.com/in/touseef-ur-rehman-6b2888372", icon: <Linkedin size={15} />,     label: "LinkedIn" },
            { href: "mailto:touseefurrehman5554@gmail.com",                    icon: <Mail size={15} />,          label: "Email" },
            { href: "https://wa.me/923476992071",                              icon: <MessageCircle size={15} />, label: "WhatsApp" },
          ].map((s) => (
            <a
              key={s.label} href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={s.label}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/24 transition-all"
            >
              {s.icon}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Touseef Ur Rehman</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/24 transition-all"
          >
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </div>
  </footer>
);

export default Footer;
