import { useEffect, useRef } from "react";
import { gsap } from "@/lib/scrollManager";
import { Brain, Globe, Smartphone, ArrowRight } from "lucide-react";

const services = [
  {
    Icon: Brain,
    number: "01",
    title: "ML / AI Engineering",
    desc: "Production ML systems — object detection, time-series forecasting, NLP pipelines. Built with PyTorch, trained on real data, deployed.",
    items: ["Computer vision (YOLOv26, OpenCV)", "LSTM/GRU time-series forecasting", "BERT & transformer NLP", "MLOps & model evaluation"],
  },
  {
    Icon: Globe,
    number: "02",
    title: "Full-Stack Web",
    desc: "End-to-end web products — from pixel-perfect React frontends to FastAPI backends and Supabase databases.",
    items: ["React / Next.js + TypeScript", "FastAPI / Flask REST APIs", "Supabase RLS & PostgreSQL", "Vercel / Render deployments"],
  },
  {
    Icon: Smartphone,
    number: "03",
    title: "Android Development",
    desc: "Native Android apps built under Duonex — offline-first, clean UX, and built for Pakistan's market realities.",
    items: ["Native Android", "Offline-first architecture", "API integration & auth", "Local market UX"],
  },
];

/* Split a string into individual <span> chars wrapped in overflow-hidden masks */
const SplitText = ({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) => (
  <span className={className} style={{ ...style, display: "inline-block" }} aria-label={text}>
    {text.split("").map((char, i) => (
      <span
        key={i}
        className="services-char"
        style={{ display: "inline-block", overflow: "hidden", lineHeight: 1 }}
      >
        <span
          className="services-char-inner"
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ))}
  </span>
);

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Step 1: Character reveal on heading ── */
      const chars = gsap.utils.toArray<HTMLElement>(".services-char-inner");

      gsap.fromTo(
        chars,
        { y: "110%", rotation: 8, opacity: 0 },
        {
          y: "0%",
          rotation: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.028,
          scrollTrigger: {
            trigger: ".services-heading",
            start: "top 88%",
            once: true,
          },
        }
      );

      /* Sub-label fade */
      gsap.fromTo(
        ".services-label",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: ".services-heading", start: "top 88%", once: true },
        }
      );

      /* ── Step 2: Cards scale up from center (lens focus) ── */
      gsap.fromTo(
        ".service-card",
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: ".service-card",
            start: "top 85%",
            once: true,
          },
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-28 md:py-36" style={{ background: "#0A0A0A" }}>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* ── Heading ── */}
        <div className="services-heading mb-20">
          <span className="services-label section-label mb-4 inline-flex opacity-0">Services</span>
          <h2
            className="text-4xl md:text-5xl font-black tracking-tight mt-4"
            style={{ color: "#FFFFFF", lineHeight: 1.1 }}
          >
            <SplitText text="What I Offer" />
          </h2>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="service-card group opacity-0 rounded-xl p-7 transition-colors duration-300"
              style={{ background: "#111111", border: "1px solid #1A1A1A" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "#2A2A2A";
                (e.currentTarget as HTMLElement).style.background  = "#141414";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1A1A1A";
                (e.currentTarget as HTMLElement).style.background  = "#111111";
              }}
            >
              {/* Number + icon */}
              <div className="flex items-center justify-between mb-8">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.12)" }}
                >
                  <s.Icon size={18} style={{ color: "#22C55E" }} strokeWidth={1.5} />
                </div>
                <span className="text-xs font-mono" style={{ color: "#2A2A2A" }}>{s.number}</span>
              </div>

              <h3 className="text-base font-bold mb-3" style={{ color: "#FFFFFF" }}>{s.title}</h3>
              <p className="text-xs leading-[1.8] mb-6" style={{ color: "#888888" }}>{s.desc}</p>

              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs" style={{ color: "#555555" }}>
                    <ArrowRight size={10} style={{ color: "#22C55E", flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
