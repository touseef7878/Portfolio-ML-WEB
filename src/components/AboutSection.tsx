import { useEffect, useRef } from "react";
import { gsap } from "@/lib/scrollManager";
import AnimatedCounter from "./AnimatedCounter";
import { useScrollAnimation } from "./useScrollAnimation";
import profilePhoto from "@/assets/ChatGPT Image Jul 3, 2026, 08_48_20 PM.png";

const stats = [
  { value: "4+",  label: "Projects shipped" },
  { value: "2",   label: "Internships" },
  { value: "15+", label: "Technologies" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: counterRef, isVisible } = useScrollAnimation(0.2);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading line draw
      gsap.fromTo(".about-line",
        { width: "0%" },
        { width: "100%", duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".about-line", start: "top 88%", once: true } }
      );

      gsap.fromTo(".about-heading",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".about-heading", start: "top 88%", once: true } }
      );

      gsap.fromTo(".about-photo",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".about-photo", start: "top 85%", once: true } }
      );

      gsap.fromTo(".about-text-block",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ".about-text-block", start: "top 85%", once: true } }
      );

      gsap.fromTo(".about-stat",
        { opacity: 0, y: 24, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)", stagger: 0.1,
          scrollTrigger: { trigger: ".about-stat", start: "top 90%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-28 md:py-36" style={{ background: "#0A0A0A" }}>
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Section header */}
        <div className="about-heading mb-20 opacity-0">
          <span className="section-label mb-4 inline-flex">About</span>
          <div className="flex items-end gap-6 mt-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: "#FFFFFF" }}>
              Who I Am
            </h2>
            {/* Animated line */}
            <div className="about-line hidden md:block h-px flex-1 mb-3" style={{ background: "#222222", width: 0 }} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Photo col */}
          <div className="about-photo opacity-0">
            <div className="relative w-full max-w-[320px] mx-auto md:mx-0">
              {/* Photo */}
              <div style={{ aspectRatio: "4/5", borderRadius: "8px", overflow: "hidden", border: "1px solid #1A1A1A" }}>
                <img src={profilePhoto} alt="Muhammad Touseef ur Rehman"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "grayscale(15%)" }}
                  loading="lazy" decoding="async" />
              </div>

              {/* Floating skill chips */}
              <div className="flex flex-wrap gap-2 mt-5">
                {["PyTorch", "React", "FastAPI", "YOLOv26", "Next.js"].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Text col */}
          <div className="mt-4 md:mt-12 space-y-6">
            <div className="about-text-block opacity-0">
              <p className="text-base md:text-lg leading-[1.85]" style={{ color: "#EBEBEB" }}>
                I'm a Computer Science graduate from{" "}
                <span style={{ color: "#FFFFFF", fontWeight: 600 }}>HITEC University Taxila</span>{" "}
                (2022–2026) with a strong foundation in both machine learning and full-stack web development.
              </p>
            </div>

            <div className="about-text-block opacity-0">
              <p className="text-sm md:text-base leading-[1.85]" style={{ color: "#888888" }}>
                I've worked on production ML systems — object detection pipelines, time-series
                forecasting models — and built full-stack products end to end. I co-founded{" "}
                <a href="https://duonex.net" target="_blank" rel="noopener noreferrer"
                  className="font-semibold transition-colors" style={{ color: "#22C55E" }}>
                  Duonex
                </a>
                , a studio delivering ML/AI, web, UI/UX, and Android services.
              </p>
            </div>

            <div className="about-text-block opacity-0">
              <p className="text-sm leading-[1.85]" style={{ color: "#555555" }}>
                I care about building software with real utility — especially projects that account
                for real-world constraints like unreliable internet and infrastructure gaps common
                in Pakistan.
              </p>
            </div>

            {/* Divider */}
            <div className="about-text-block opacity-0 pt-4">
              <div style={{ height: "1px", background: "#1A1A1A" }} />
            </div>

            {/* Stats */}
            <div ref={counterRef} className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
              {stats.map((s) => (
                <div key={s.label} className="about-stat opacity-0">
                  <p className="text-3xl md:text-4xl font-black mb-1" style={{ color: "#22C55E" }}>
                    <AnimatedCounter end={s.value} isVisible={isVisible} />
                  </p>
                  <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "#555555" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
