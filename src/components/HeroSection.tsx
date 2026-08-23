import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, MessageCircle, Globe, Download, ArrowRight, MapPin } from "lucide-react";
import { gsap } from "@/lib/scrollManager";
import profilePhoto from "@/assets/WhatsApp Image 2026-07-02 at 9.21.12 PM.jpeg";

const roles = ["Full-Stack Developer", "ML & AI Engineer", "AI Problem Solver"];

const stats = [
  { value: "2+",  label: "Years Exp." },
  { value: "10+", label: "Projects" },
  { value: "3+",  label: "Startups" },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText]           = useState("");
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text.length < current.length) {
      t = setTimeout(() => setText(current.slice(0, text.length + 1)), 60);
    } else if (!deleting && text.length === current.length) {
      t = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 28);
    } else {
      setDeleting(false);
      setRoleIndex((p) => (p + 1) % roles.length);
    }
    return () => clearTimeout(t);
  }, [text, deleting, roleIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "power4.out" } });
      tl.fromTo(".hero-photo-wrap",    { opacity: 0, x: -30 },           { opacity: 1, x: 0, duration: 0.8 }, 0);
      tl.fromTo(".hero-name-line",     { opacity: 0, y: 30 },            { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 }, 0.2);
      tl.fromTo(".hero-stat-chip",     { opacity: 0, y: 14, scale: 0.9 },{ opacity: 1, y: 0, scale: 1, duration: 0.38, stagger: 0.07 }, 0.4);
      tl.fromTo(".hero-role-row",      { opacity: 0, y: 12 },            { opacity: 1, y: 0, duration: 0.38 }, 0.55);
      tl.fromTo(".hero-bio",           { opacity: 0, y: 10 },            { opacity: 1, y: 0, duration: 0.38 }, 0.65);
      tl.fromTo(".hero-btn",           { opacity: 0, y: 8 },             { opacity: 1, y: 0, duration: 0.32, stagger: 0.08 }, 0.75);
      tl.fromTo(".hero-social",        { opacity: 0, y: 6 },             { opacity: 1, y: 0, duration: 0.28, stagger: 0.05 }, 0.85);
      tl.fromTo(".hero-right-socials", { opacity: 0, x: 10 },            { opacity: 1, x: 0, duration: 0.32, stagger: 0.05 }, 0.9);

      gsap.to(".hero-photo-wrap", {
        y: "6%", ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
      gsap.to(".hero-fade-out", {
        opacity: 0, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "55% top", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative overflow-x-hidden"
      style={{ background: "#080C0A", minHeight: "100svh" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(20,60,30,0.3) 0%, transparent 70%)",
      }} />
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(34,197,94,0.06) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="hero-fade-out relative z-10 container mx-auto px-4 sm:px-5 max-w-7xl py-24 md:py-0 md:h-screen md:flex md:items-center">

        {/* ── Mobile layout: single column ── */}
        {/* ── Desktop layout: 2-col grid ── */}
        <div className="w-full flex flex-col md:grid md:gap-3" style={{ gridTemplateColumns: "200px 1fr" }}>

          {/* ── LEFT: Photo + socials ── */}
          <div className="hero-photo-wrap opacity-0 flex flex-col items-center gap-4 mb-4 md:mb-0">

            {/* Glass photo card */}
            <div className="relative" style={{ width: "min(185px, 55vw)", aspectRatio: "185/215" }}>
              <div className="absolute inset-0 rounded-2xl" style={{
                transform: "rotate(5deg) translate(7px,7px)",
                background: "rgba(34,197,94,0.06)",
                border: "1px solid rgba(34,197,94,0.15)",
              }} />
              <div className="absolute inset-0 rounded-2xl" style={{
                transform: "rotate(2.5deg) translate(3px,3px)",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.05)",
              }} />
              <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
              }}>
                <img src={profilePhoto} alt="Touseef Ur Rehman"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "brightness(0.92)" }}
                  loading="eager" decoding="async" draggable={false} />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(180deg, rgba(20,80,40,0.1) 0%, transparent 40%)",
                }} />
              </div>
              {/* Available badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full whitespace-nowrap"
                style={{ background: "#0D1410", border: "1px solid rgba(34,197,94,0.25)", boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }}>
                <span className="green-dot green-pulse" />
                <span className="text-[9px] font-semibold" style={{ color: "#22C55E" }}>Available</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-1.5 mt-2">
              {[
                { href: "https://touseef.eu.cc",                       icon: <Globe size={13} />,         label: "Website" },
                { href: "https://www.linkedin.com/in/touseef123",      icon: <Linkedin size={13} />,      label: "LinkedIn" },
                { href: "https://github.com/touseef7878",               icon: <Github size={13} />,        label: "GitHub" },
                { href: "https://wa.me/923101533429",                   icon: <MessageCircle size={13} />, label: "WhatsApp" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="hero-social opacity-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ background: "#111814", border: "1px solid #1E2A20", color: "#4A6650" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#22C55E"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#4A6650"; (e.currentTarget as HTMLElement).style.borderColor = "#1E2A20"; }}>
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Info cards — visible on desktop, hidden on mobile (shown inline in right card instead) */}
            <div className="w-full flex flex-col gap-2 mt-1 hidden md:flex">
              {[
                { label: "Location", value: "Taxila, Pakistan", icon: "📍" },
                { label: "Education", value: "HITEC Uni ", icon: "🎓" },
                { label: "Co-Founder", value: "Duonex Studio", icon: "🚀" },
              ].map((item) => (
                <div key={item.label}
                  className="hero-social opacity-0 rounded-xl px-3 py-2.5 flex items-center gap-2.5"
                  style={{ background: "#111814", border: "1px solid #1E2A20" }}>
                  <span className="text-[11px]" style={{ flexShrink: 0 }}>{item.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[8px] uppercase tracking-widest" style={{ color: "#3A5040" }}>{item.label}</p>
                    <p className="text-[10px] font-semibold truncate" style={{ color: "#EBEBEB" }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: 2 stacked cards ── */}
          <div className="flex flex-col gap-3">

            {/* Card 1: Name + stats */}
            <div className="rounded-2xl p-4 sm:p-5" style={{ background: "#0F1612", border: "1px solid #1A2B1E" }}>
              <div className="flex items-start justify-between gap-3">
                {/* Name */}
                <div className="min-w-0">
                  <div className="overflow-hidden">
                    <h1 className="hero-name-line opacity-0 font-black tracking-tight leading-none"
                      style={{ fontSize: "clamp(1.9rem, 8vw, 3.6rem)", color: "#FFFFFF" }}>
                      Touseef
                    </h1>
                  </div>
                  <div className="overflow-hidden">
                    <h1 className="hero-name-line opacity-0 font-black tracking-tight leading-none"
                      style={{ fontSize: "clamp(1.9rem, 8vw, 3.6rem)", color: "#22C55E" }}>
                      Ur Rehman
                    </h1>
                  </div>
                </div>
                {/* Stat chips — desktop shows all 3, mobile shows only 2 to save space */}
                <div className="flex gap-1.5 sm:gap-2 shrink-0 pt-1">
                  {stats.map((s, i) => (
                    <div key={s.label}
                      className={`hero-stat-chip opacity-0 text-center rounded-xl px-2 sm:px-3 py-2 min-w-[48px] sm:min-w-[58px]${i === 2 ? " hidden sm:block" : ""}`}
                      style={{ background: "#151F17", border: "1px solid #1E2B20" }}>
                      <p className="text-sm sm:text-base font-black leading-none mb-0.5" style={{ color: "#22C55E" }}>{s.value}</p>
                      <p className="text-[7px] sm:text-[8px] uppercase tracking-widest font-medium" style={{ color: "#4A6650" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Role + bio + buttons */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #1A2B1E" }}>
              <div className="flex overflow-hidden">

                {/* Main content */}
                <div className="flex-1 p-4 sm:p-5" style={{ background: "#0F1612", minWidth: 0 }}>
                  {/* Typewriter */}
                  <div className="hero-role-row opacity-0 flex items-center gap-1.5 mb-3">
                    <span className="text-xs sm:text-sm font-bold" style={{ color: "#FFFFFF" }}>
                      {text}
                      <span className="inline-block w-[2px] h-[0.9em] bg-green-400 align-middle ml-[1px]"
                        style={{ animation: "typewriter-blink 1s step-end infinite" }} />
                    </span>
                  </div>
                  <p className="hero-bio opacity-0 text-xs leading-[1.8] mb-4 sm:mb-5" style={{ color: "#8A9E8E" }}>
                    AI-driven problem solver, building real-world software. Co-founder of{" "}
                    <a href="https://duonex.net" target="_blank" rel="noopener noreferrer"
                      className="font-semibold transition-colors" style={{ color: "#FFFFFF" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#22C55E")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#FFFFFF")}>
                      Duonex
                    </a>{" "}
                    — ML/AI, web &amp; Android solutions.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
                    <a href="#projects"
                      className="hero-btn opacity-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                      style={{ background: "#22C55E", color: "#080C0A" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#16A34A")}
                      onMouseLeave={e => (e.currentTarget.style.background = "#22C55E")}>
                      View My Work <ArrowRight size={12} />
                    </a>
                    <a href="/resumes/Touseef Ur Rehman.pdf" download
                      className="hero-btn opacity-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200"
                      style={{ border: "1px solid #2A3D2E", color: "#EBEBEB" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#4A6650"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#2A3D2E"; }}>
                      <Download size={11} /> Resume
                    </a>
                  </div>

                  {/* Tech stack tags */}
                  <div className="hero-bio opacity-0">
                    <p className="text-[8px] uppercase tracking-widest mb-2" style={{ color: "#3A5040" }}>Tech Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["PyTorch", "YOLOv2", "React", "Next.js", "FastAPI", "Supabase", "TypeScript", "scikit-learn"].map((t) => (
                        <span key={t}
                          className="text-[9px] px-2 py-1 rounded-md font-medium"
                          style={{ background: "#151F17", border: "1px solid #1E2B20", color: "#4A7A5A", fontFamily: "'JetBrains Mono', monospace" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mobile-only: info cards (Location / Edu / Co-Founder) */}
                  <div className="md:hidden flex flex-col gap-2 mt-4">
                    {[
                      { label: "Location", value: "Taxila, Pakistan", icon: "📍" },
                      { label: "Education", value: "HITEC Uni", icon: "🎓" },
                      { label: "Co-Founder", value: "Duonex Studio", icon: "🚀" },
                    ].map((item) => (
                      <div key={item.label}
                        className="hero-social opacity-0 rounded-xl px-3 py-2.5 flex items-center gap-2.5"
                        style={{ background: "#111814", border: "1px solid #1E2A20" }}>
                        <span className="text-[11px]" style={{ flexShrink: 0 }}>{item.icon}</span>
                        <div className="min-w-0">
                          <p className="text-[8px] uppercase tracking-widest" style={{ color: "#3A5040" }}>{item.label}</p>
                          <p className="text-[10px] font-semibold truncate" style={{ color: "#EBEBEB" }}>{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider + Mini stats sidebar — hidden on small mobile, visible from sm up */}
                <div className="hidden sm:flex" style={{ flexShrink: 0 }}>
                  <div style={{ width: "1px", background: "#1A2B1E" }} />
                  <div className="flex flex-col justify-between items-center py-4 px-3 gap-2"
                    style={{ background: "#0F1612", minWidth: "76px" }}>
                    {stats.map((s) => (
                      <div key={s.label} className="hero-stat-chip opacity-0 text-center">
                        <p className="text-xl font-black leading-none mb-0.5" style={{ color: "#22C55E" }}>{s.value}</p>
                        <p className="text-[7px] uppercase tracking-widest" style={{ color: "#4A6650" }}>{s.label}</p>
                      </div>
                    ))}
                    <div style={{ height: "1px", width: "40px", background: "#1A2B1E" }} />
                    <div className="hero-right-socials opacity-0 flex flex-col gap-1.5 items-center">
                      {[
                        { href: "https://touseef.eu.cc",                       icon: <Globe size={11} />,         label: "Website" },
                        { href: "https://github.com/touseef7878",               icon: <Github size={11} />,        label: "GitHub" },
                        { href: "https://www.linkedin.com/in/touseef123",      icon: <Linkedin size={11} />,      label: "LinkedIn" },
                        { href: "https://wa.me/923101533429",                   icon: <MessageCircle size={11} />, label: "WhatsApp" },
                        { href: "#contact",                                       icon: <MapPin size={11} />,        label: "Location" },
                      ].map((s) => (
                        <a key={s.label} href={s.href}
                          target={s.href.startsWith("#") ? undefined : "_blank"}
                          rel={s.href.startsWith("#") ? undefined : "noopener noreferrer"}
                          aria-label={s.label}
                          className="w-7 h-7 rounded-md flex items-center justify-center transition-all duration-200"
                          style={{ background: "#151F17", border: "1px solid #1E2B20", color: "#4A6650" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#22C55E"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.25)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#4A6650"; (e.currentTarget as HTMLElement).style.borderColor = "#1E2B20"; }}>
                          {s.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
