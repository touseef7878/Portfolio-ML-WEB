import { useEffect, useRef } from "react";
import { gsap } from "@/lib/scrollManager";

const categories = [
  {
    title: "Machine Learning / AI",
    color: "#22C55E",
    skills: [
      { name: "PyTorch",           pct: 85 },
      { name: "TensorFlow/Keras",  pct: 80 },
      { name: "YOLOv26 / OpenCV",  pct: 82 },
      { name: "scikit-learn",      pct: 88 },
      { name: "BERT Transformers", pct: 75 },
      { name: "NLTK / NLP",        pct: 80 },
    ],
  },
  {
    title: "Full-Stack Web",
    color: "#FFFFFF",
    skills: [
      { name: "React / Next.js",   pct: 88 },
      { name: "TypeScript",        pct: 82 },
      { name: "FastAPI / Flask",   pct: 85 },
      { name: "Tailwind CSS",      pct: 92 },
      { name: "Node.js",           pct: 75 },
    ],
  },
  {
    title: "Data / Infrastructure",
    color: "#888888",
    skills: [
      { name: "Supabase/PostgreSQL", pct: 82 },
      { name: "MySQL",               pct: 78 },
      { name: "Vercel",              pct: 88 },
      { name: "Render / Railway",    pct: 80 },
    ],
  },
  {
    title: "Tools",
    color: "#888888",
    skills: [
      { name: "Git & GitHub",      pct: 90 },
      { name: "n8n automation",    pct: 72 },
      { name: "Figma",             pct: 75 },
      { name: "REST APIs",         pct: 88 },
    ],
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skills-heading",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".skills-heading", start: "top 88%", once: true } }
      );

      // Each category block slides up with stagger
      gsap.fromTo(".skill-category",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ".skill-category", start: "top 85%", once: true } }
      );

      // Animate skill bars when they enter view
      document.querySelectorAll(".skill-bar-animated").forEach((el) => {
        const pct = (el as HTMLElement).dataset.pct || "0";
        gsap.fromTo(el,
          { width: "0%" },
          {
            width: `${pct}%`,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-28 md:py-36" style={{ background: "#0D0D0D" }}>
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="skills-heading mb-20 opacity-0">
          <span className="section-label mb-4 inline-flex">Tech Stack</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-4" style={{ color: "#FFFFFF" }}>
            My Skills
          </h2>
          <p className="text-sm mt-3" style={{ color: "#555555" }}>
            Tools and technologies I use to build things
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categories.map((cat) => (
            <div key={cat.title} className="skill-category opacity-0">
              {/* Category title */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: cat.color }}>
                  {cat.title}
                </span>
                <div className="flex-1 h-px" style={{ background: "#1A1A1A" }} />
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {cat.skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium" style={{ color: "#EBEBEB", fontFamily: "'JetBrains Mono', monospace" }}>
                        {s.name}
                      </span>
                      <span className="text-[10px] tabular-nums" style={{ color: "#555555", fontFamily: "'JetBrains Mono', monospace" }}>
                        {s.pct}%
                      </span>
                    </div>
                    {/* Track */}
                    <div style={{ height: "2px", background: "#1A1A1A", borderRadius: "99px", overflow: "hidden" }}>
                      <div
                        className="skill-bar-animated h-full rounded-full"
                        data-pct={s.pct}
                        style={{ background: cat.color, width: "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
