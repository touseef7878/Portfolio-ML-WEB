import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/scrollManager";
import { Globe, Brain, ChevronDown } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    tagline: "From idea to deployed product",
    desc: "Modern, performant full-stack applications built with React, TypeScript, and Flask.",
    accentColor: "#3B82F6",
    details: [
      "Full-stack apps — React, TypeScript, Flask",
      "Responsive UI with Tailwind CSS & shadcn/ui",
      "RESTful API design and integration",
      "SQLite database modeling",
      "Performance optimisation & SEO",
    ],
  },
  {
    icon: Brain,
    title: "AI / ML Engineering",
    tagline: "Data-driven intelligent systems",
    desc: "Predictive models, NLP pipelines, and AI-powered tools built in Python.",
    accentColor: "#A855F7",
    details: [
      "Predictive modeling — Scikit-learn & Python",
      "NLP & sentiment analysis with NLTK",
      "Regression and classification pipelines",
      "Data preprocessing & feature engineering",
      "Model evaluation & performance tuning",
    ],
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".services-heading",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".services-heading", start: "top 88%", once: true } }
      );
      gsap.fromTo(".service-card",
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.18,
          scrollTrigger: { trigger: ".service-card", start: "top 85%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-28 md:py-36">
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="services-heading text-center mb-20 will-change-transform">
          <span className="section-label mb-5 inline-flex">Services</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            What I <span className="text-gradient">Offer</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="service-card bg-card border border-white/8 rounded-2xl p-8 hover:border-white/16 transition-all duration-300 shadow-sm will-change-transform"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: `${s.accentColor}12`, border: `1px solid ${s.accentColor}25` }}
              >
                <s.icon size={22} style={{ color: s.accentColor }} strokeWidth={1.75} />
              </div>

              <h3 className="font-bold text-xl mb-1">{s.title}</h3>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: s.accentColor }}>
                {s.tagline}
              </p>
              <p className="text-sm text-muted-foreground leading-[1.8] mb-6">{s.desc}</p>

              {/* Expandable detail list */}
              <div
                className="overflow-hidden transition-all duration-500"
                style={{ maxHeight: expanded === i ? "300px" : "0px", opacity: expanded === i ? 1 : 0 }}
              >
                <ul className="mb-6 space-y-2.5">
                  {s.details.map((d, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: s.accentColor }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-75"
                style={{ color: s.accentColor }}
              >
                {expanded === i ? "Show less" : "Learn more"}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${expanded === i ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
