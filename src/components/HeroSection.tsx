import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, ArrowDown, MessageCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap, ScrollTrigger } from "@/lib/scrollManager";
import profilePhoto from "@/assets/WhatsApp Image 2026-07-02 at 9.21.12 PM.jpeg";

const roles = ["Full-Stack Developer", "AI / ML Engineer", "Python Developer"];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const orbsRef    = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText]           = useState("");
  const [deleting, setDeleting]   = useState(false);

  /* ── Typewriter ── */
  useEffect(() => {
    const current = roles[roleIndex];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text.length < current.length) {
      t = setTimeout(() => setText(current.slice(0, text.length + 1)), 70);
    } else if (!deleting && text.length === current.length) {
      t = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 35);
    } else {
      setDeleting(false);
      setRoleIndex((p) => (p + 1) % roles.length);
    }
    return () => clearTimeout(t);
  }, [text, deleting, roleIndex]);

  /* ── GSAP: entrance + scrub parallax ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current!;

      // ── Entrance animations (play once on load) ──
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(textRef.current,  { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.0 }, 0.15)
        .fromTo(photoRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, 0.35);

      // ── Scrub parallax: orbs move at 50% scroll speed (background layer) ──
      // The key: NO overflow-hidden on section, scrub ties to scroll position
      gsap.to(orbsRef.current, {
        y: "40%",           // moves DOWN as user scrolls DOWN — feels like depth
        ease: "none",       // mandatory for scrub
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,      // scrub:true = perfectly tied to scroll position
        },
      });

      // ── Scrub parallax: text moves slightly slower than scroll (foreground) ──
      gsap.to(textRef.current, {
        y: "18%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // ── Scrub parallax: photo moves at a different rate ──
      gsap.to(photoRef.current, {
        y: "12%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // ── Fade out hero content as user scrolls away ──
      gsap.to(section.querySelector(".hero-content"), {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "60% top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    /* NOTE: No overflow-hidden — required for parallax to be visible outside section bounds */
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center"
      style={{ isolation: "isolate" }}
    >
      {/* ─ Layer 0: Fixed grid bg (CSS only, no JS) ─ */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ─ Layer 1: Parallax orbs (scrubbed by GSAP) ─ */}
      <div
        ref={orbsRef}
        className="absolute inset-0 -z-10 pointer-events-none will-change-transform"
        aria-hidden="true"
      >
        <div
          className="absolute top-[50%] left-[5%] w-[380px] h-[380px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(189 94% 43% / 0.18) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* ─ Content ─ */}
      <div className="hero-content relative z-10 w-full container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center min-h-screen pt-24 pb-10 md:py-0">

          {/* Left — Text */}
          <div ref={textRef} className="will-change-transform">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-5">
              Touseef<br />
              <span className="text-gradient">Ur Rehman</span>
            </h1>

            {/* Typewriter role */}
            <div className="h-10 flex items-center mb-5">
              <span
                className="text-lg md:text-2xl font-medium text-muted-foreground"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {text}
                <span
                  className="inline-block w-[2px] h-[1.1em] bg-primary align-middle ml-[2px]"
                  style={{ animation: "typewriter-blink 1s step-end infinite" }}
                />
              </span>
            </div>

            <p className="text-sm md:text-base text-muted-foreground leading-[1.75] max-w-md mb-9">
              I design and ship intelligent web applications — merging clean front-end
              engineering with Python-powered AI, from full-stack React &amp; Flask apps
              to NLP pipelines and predictive ML models.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-9">
              <Button
                asChild size="lg"
                className="rounded-full px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 font-semibold transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
              >
                <a href="#projects">View My Work</a>
              </Button>
              <Button
                asChild variant="outline" size="lg"
                className="rounded-full px-8 border-white/15 hover:bg-white/5 font-medium transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
              >
                <a href="/resumes/Touseef Ur Rehman.pdf" target="_blank" rel="noopener noreferrer" download>
                  <Download size={15} className="mr-2" />
                  Resume
                </a>
              </Button>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {[
                { href: "https://github.com/touseef7878",                          icon: <Github size={16} />,       label: "GitHub" },
                { href: "https://www.linkedin.com/in/touseef-ur-rehman-6b2888372", icon: <Linkedin size={16} />,     label: "LinkedIn" },
                { href: "https://wa.me/923476992071",                              icon: <MessageCircle size={16} />, label: "WhatsApp" },
              ].map((s) => (
                <a
                  key={s.label} href={s.href}
                  target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-white/12 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/8 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Photo */}
          <div ref={photoRef} className="flex justify-center items-center will-change-transform py-10 md:py-0">
            <div className="relative flex items-center justify-center">

              {/* Outer square ring — rotated slightly */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: "256px",
                  height: "256px",
                  borderRadius: "2rem",
                  border: "1.5px solid rgba(99,149,255,0.3)",
                  transform: "rotate(6deg) scale(1.15)",
                }}
              />

              {/* Inner square ring — just outside the image */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: "256px",
                  height: "256px",
                  borderRadius: "2rem",
                  border: "1px solid rgba(99,149,255,0.15)",
                  transform: "rotate(6deg) scale(1.04)",
                }}
              />

              {/* Soft glow */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: "256px",
                  height: "256px",
                  borderRadius: "2rem",
                  background: "radial-gradient(ellipse, hsl(217 80% 55% / 0.1) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Image clipped to rounded square */}
              <div
                style={{
                  width: "230px",
                  height: "256px",
                  borderRadius: "1.75rem",
                  overflow: "hidden",
                  flexShrink: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <img
                  src={profilePhoto}
                  alt="Touseef Ur Rehman"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-bounce-subtle"
        aria-label="Scroll down"
      >
        <span className="text-[9px] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown size={14} />
      </a>
    </section>
  );
};

export default HeroSection;
