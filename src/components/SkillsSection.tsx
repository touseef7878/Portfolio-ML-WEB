import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/scrollManager";
import iconLanguages from "@/assets/icon-languages.webp";
import iconAiml      from "@/assets/icon-aiml.webp";
import iconWeb       from "@/assets/icon-web.webp";
import iconTools     from "@/assets/icon-tools.webp";

const categories = [
  {
    image: iconLanguages,
    title: "Languages",
    accentColor: "#3B82F6",
    skills: [
      { name: "Python",     pct: 90 },
      { name: "JavaScript", pct: 80 },
      { name: "TypeScript", pct: 75 },
      { name: "HTML / CSS", pct: 88 },
      { name: "SQL",        pct: 72 },
    ],
    desc: "Multi-language proficiency for backend logic and frontend interfaces.",
  },
  {
    image: iconAiml,
    title: "AI / ML",
    accentColor: "#A855F7",
    skills: [
      { name: "Scikit-learn",       pct: 82 },
      { name: "NLTK / NLP",         pct: 78 },
      { name: "Linear Regression",  pct: 85 },
      { name: "Sentiment Analysis", pct: 80 },
    ],
    desc: "Intelligent, data-driven systems with ML and natural language processing.",
  },
  {
    image: iconWeb,
    title: "Web",
    accentColor: "#06B6D4",
    skills: [
      { name: "React",        pct: 85 },
      { name: "Flask",        pct: 88 },
      { name: "Tailwind CSS", pct: 90 },
      { name: "Vite",         pct: 80 },
      { name: "shadcn/ui",    pct: 82 },
    ],
    desc: "Fast, responsive web apps with modern frameworks and UI systems.",
  },
  {
    image: iconTools,
    title: "Tools",
    accentColor: "#F97316",
    skills: [
      { name: "Git & GitHub", pct: 87 },
      { name: "SQLite",       pct: 80 },
      { name: "REST APIs",    pct: 85 },
      { name: "Postman",      pct: 78 },
    ],
    desc: "Essential toolchain for collaborative, production-ready development.",
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skills-heading",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".skills-heading", start: "top 88%", once: true } }
      );
      gsap.fromTo(".skill-card",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ".skill-card", start: "top 88%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-28 md:py-36">
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="skills-heading text-center mb-20 will-change-transform">
          <span className="section-label mb-5 inline-flex">Tech Stack</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-4 max-w-xs mx-auto">
            Hover any card to reveal proficiency levels
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className="skill-card perspective-1200 h-[280px] cursor-pointer will-change-transform"
              onMouseEnter={() => setFlipped(i)}
              onMouseLeave={() => setFlipped(null)}
              onFocus={() => setFlipped(i)}
              onBlur={() => setFlipped(null)}
              tabIndex={0}
              aria-label={`${cat.title} — click to see skill levels`}
            >
              <div
                className={`relative w-full h-full transform-style-3d transition-transform duration-700 ${
                  flipped === i ? "rotate-y-180" : ""
                }`}
              >
                {/* ── Front ── */}
                <div className="absolute inset-0 backface-hidden rounded-2xl border border-white/8 bg-card/80 p-6 flex flex-col hover:border-white/16 transition-colors duration-300 shadow-sm">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
                    style={{ background: `${cat.accentColor}15`, border: `1px solid ${cat.accentColor}30` }}
                  >
                    <img src={cat.image} alt={cat.title} className="w-6 h-6 object-contain" loading="lazy" />
                  </div>

                  <h3 className="font-bold text-base mb-1.5" style={{ color: cat.accentColor }}>
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">{cat.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {cat.skills.map((s) => (
                      <span
                        key={s.name}
                        className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/8 text-muted-foreground"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Back ── */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border border-white/10 bg-card/90 p-6 flex flex-col justify-center shadow-sm">
                  <h3 className="font-bold text-sm mb-5" style={{ color: cat.accentColor }}>
                    {cat.title}
                  </h3>
                  <div className="space-y-3.5">
                    {cat.skills.map((s) => (
                      <div key={s.name}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[11px] font-medium text-foreground/80">{s.name}</span>
                          <span className="text-[10px] text-muted-foreground">{s.pct}%</span>
                        </div>
                        <div className="h-[3px] rounded-full bg-white/8 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: flipped === i ? `${s.pct}%` : "0%",
                              background: `linear-gradient(90deg, ${cat.accentColor}, ${cat.accentColor}99)`,
                              transitionDelay: flipped === i ? "200ms" : "0ms",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
