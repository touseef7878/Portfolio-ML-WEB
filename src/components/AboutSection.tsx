import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/scrollManager";
import AnimatedCounter from "./AnimatedCounter";
import { useScrollAnimation } from "./useScrollAnimation";
import profilePhoto from "@/assets/WhatsApp Image 2026-07-02 at 9.21.12 PM.jpeg";

const stats = [
  { value: "7+",  label: "Projects" },
  { value: "2",   label: "Domains" },
  { value: "10+", label: "Technologies" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: counterRef, isVisible } = useScrollAnimation(0.2);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal heading
      gsap.fromTo(".about-heading",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".about-heading", start: "top 88%", once: true } }
      );
      // Reveal photo from left
      gsap.fromTo(".about-photo",
        { opacity: 0, x: -70 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".about-photo", start: "top 85%", once: true } }
      );
      // Reveal text from right
      gsap.fromTo(".about-text",
        { opacity: 0, x: 70 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".about-text", start: "top 85%", once: true } }
      );
      // Stats pop in
      gsap.fromTo(".about-stat",
        { opacity: 0, y: 30, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.6)", stagger: 0.1,
          scrollTrigger: { trigger: ".about-stat", start: "top 90%", once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-28 md:py-36">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Heading */}
        <div className="about-heading text-center mb-20">
          <span className="section-label mb-5 inline-flex">About</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Who I <span className="text-gradient">Am</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Photo */}
          <div className="about-photo relative mx-auto md:mx-0 will-change-transform">
            <div className="relative w-[280px] h-[340px] md:w-[300px] md:h-[380px] mx-auto">
              {/* Offset decorative block */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border border-primary/20 bg-primary/5" />
              {/* Photo */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={profilePhoto}
                  alt="Touseef Ur Rehman"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
            </div>

            {/* Pill tags below photo */}
            <div className="absolute -bottom-5 left-0 right-0 flex justify-center gap-2 flex-wrap px-4">
              {["Python", "React", "Flask", "AI/ML"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-3 py-1.5 rounded-full glass border border-primary/20 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="about-text will-change-transform mt-8 md:mt-0">
            <h3 className="text-2xl md:text-3xl font-bold mb-5 leading-snug">
              Building at the intersection<br />
              of <span className="text-gradient">AI and the Web</span>
            </h3>

            <p className="text-muted-foreground text-sm md:text-base leading-[1.85] mb-4">
              I'm a developer who works equally at home in Python ML pipelines and React
              frontends. My work spans predictive models, NLP tools, and full-stack web
              applications — always built with clean, production-quality code.
            </p>

            <p className="text-muted-foreground text-sm md:text-base leading-[1.85] mb-10">
              Currently studying <span className="text-foreground font-medium">BS Computer Science</span> at
              HITEC University Taxila (GPA 3.27/4.0), I've interned at RedFort360 (React & Flask) and
              Elevvo (ML / computer vision), and I'm always looking for the next challenging problem to solve.
            </p>

            {/* Stats */}
            <div ref={counterRef} className="grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="about-stat text-center rounded-2xl border border-white/8 bg-white/3 p-5 hover:border-primary/30 hover:-translate-y-1 transition-all duration-200 cursor-default will-change-transform"
                >
                  <p className="text-3xl font-extrabold text-gradient mb-1">
                    <AnimatedCounter end={s.value} isVisible={isVisible} />
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
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
