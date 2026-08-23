import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/scrollManager";
import { Github, ArrowUpRight, ExternalLink } from "lucide-react";

// Project images
import imgOcean      from "@/assets/project-sentiment.webp";
import imgDuonex     from "@/assets/project-scores.webp";
import imgEcommerce  from "@/assets/project-ecommerce.webp";
import imgCyber      from "@/assets/project-chat.webp";

type Category = "all" | "web" | "aiml";

const projects = [
  {
    title: "OceanGuard AI",
    number: "01",
    problem: "Detect & forecast marine plastic debris for cleanup prioritization.",
    desc: "YOLOv26 object detection on ~16,500 images across 8 debris classes (71.5% mAP@50). LSTM/GRU pollution forecasting across 4 ocean regions — R² up to 0.929 for the Pacific.",
    tags: ["PyTorch", "YOLOv26", "React", "FastAPI", "Supabase"],
    cat: "aiml" as Category,
    github: "https://github.com/touseef7878",
    demo: null,
    badge: "Final Year Project",
    image: imgOcean,
    accent: "#22C55E",
  },
  {
    title: "Duonex",
    number: "02",
    problem: "Build a professional identity for an ML/AI & web studio.",
    desc: "Full brand system (logo, visual identity) + marketing site built from a complete PRD/SRS. Delivered 4+ client projects under the Duonex brand.",
    tags: ["Next.js", "Tailwind", "Vercel"],
    cat: "web" as Category,
    github: null,
    demo: "https://duonex.net",
    badge: "Co-Founder",
    image: imgDuonex,
    accent: "#22C55E",
  },
  {
    title: "E-Commerce Platform",
    number: "03",
    problem: "COD-first storefront for a Pakistani clothing brand.",
    desc: "Full storefront + role-based admin panel enforced via Supabase RLS (owner vs operator). COD checkout with Safepay integration and WhatsApp fallback.",
    tags: ["Next.js", "Supabase", "Vercel", "SMTP"],
    cat: "web" as Category,
    github: null,
    demo: null,
    badge: "Client Project",
    image: imgEcommerce,
    accent: "#22C55E",
  },
  {
    title: "Cyberbullying Detection",
    number: "04",
    problem: "Benchmark transformer models for cyberbullying detection.",
    desc: "Compared BERT, RoBERTa, XLNet, and GPT-2 on FGCD and Twitter datasets. Full reproducibility study with experiment tracking.",
    tags: ["PyTorch", "HuggingFace", "BERT", "NLTK"],
    cat: "aiml" as Category,
    github: "https://github.com/touseef7878",
    demo: null,
    badge: "Research",
    image: imgCyber,
    accent: "#22C55E",
  },
];

const FILTERS = [
  { label: "All",     value: "all"  as Category },
  { label: "Web",     value: "web"  as Category },
  { label: "AI / ML", value: "aiml" as Category },
];

const ProjectsSection = () => {
  const [filter, setFilter] = useState<Category>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.cat === filter);

  /* ── Initial scroll-in animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".projects-heading",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".projects-heading", start: "top 88%", once: true } }
      );

      /* Each card: image slides from left, text from right */
      document.querySelectorAll(".pcard").forEach((card) => {
        const img  = card.querySelector(".pcard-img");
        const text = card.querySelector(".pcard-text");

        gsap.fromTo(card,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true } }
        );
        gsap.fromTo(img,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true } }
        );
        gsap.fromTo(text,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── Filter re-animation ── */
  useEffect(() => {
    if (!cardsRef.current) return;
    gsap.fromTo(".pcard",
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.32, ease: "power2.out", stagger: 0.07 }
    );
  }, [filter]);

  return (
    <section id="projects" ref={sectionRef} className="py-28 md:py-36" style={{ background: "#0A0A0A" }}>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* ── Heading ── */}
        <div className="projects-heading mb-14 opacity-0">
          <span className="section-label mb-4 inline-flex">Portfolio</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: "#FFFFFF" }}>
              Featured Projects
            </h2>

            {/* Filter pills */}
            <div className="flex items-center gap-1 p-1 rounded-lg self-start md:self-auto"
              style={{ background: "#111111", border: "1px solid #1A1A1A" }}>
              {FILTERS.map((f) => (
                <button key={f.value} onClick={() => setFilter(f.value)}
                  className="px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
                  style={filter === f.value
                    ? { background: "#222222", color: "#FFFFFF" }
                    : { background: "transparent", color: "#555555" }
                  }>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Cards ── */}
        <div ref={cardsRef} className="space-y-6">
          {filtered.map((p) => (
            <div
              key={p.title}
              className="pcard group rounded-2xl overflow-hidden"
              style={{ background: "#111111", border: "1px solid #1A1A1A" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#2A2A2A")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
            >
              <div className="flex flex-col md:flex-row">

                {/* ── Image (left) ── */}
                <div
                  className="pcard-img relative shrink-0 overflow-hidden md:w-72 lg:w-80"
                  style={{ aspectRatio: "16/10" }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ filter: "brightness(0.85) saturate(0.9)" }}
                  />
                  {/* Overlay gradient */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent 60%, #111111 100%)",
                    }}
                  />
                  {/* Mobile overlay gradient (bottom fade) */}
                  <div
                    className="md:hidden absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(180deg, transparent 50%, #111111 100%)",
                    }}
                  />
                  {/* Number badge */}
                  <span
                    className="absolute top-3 left-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                    style={{ background: "rgba(0,0,0,0.6)", color: "#555555", backdropFilter: "blur(4px)" }}
                  >
                    {p.number}
                  </span>
                </div>

                {/* ── Text (right) ── */}
                <div className="pcard-text flex-1 flex flex-col justify-between p-5 sm:p-6 lg:p-8 min-w-0">

                  {/* Top */}
                  <div>
                    {/* Badge + links row */}
                    <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                      <span
                        className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)", color: "#22C55E" }}
                      >
                        {p.badge}
                      </span>

                      {/* Links */}
                      <div className="flex gap-2">
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="Source code"
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                            style={{ border: "1px solid #222222", color: "#555555" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; (e.currentTarget as HTMLElement).style.borderColor = "#444444"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#555555"; (e.currentTarget as HTMLElement).style.borderColor = "#222222"; }}>
                            <Github size={13} />
                          </a>
                        )}
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label="Live demo"
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                            style={{ border: "1px solid rgba(34,197,94,0.25)", color: "#22C55E" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "#22C55E"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.25)"; }}>
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black mb-1 leading-tight" style={{ color: "#FFFFFF" }}>
                      {p.title}
                    </h3>

                    {/* Problem */}
                    <p className="text-xs mb-3 italic" style={{ color: "#555555" }}>{p.problem}</p>

                    {/* Description */}
                    <p className="text-sm leading-relaxed" style={{ color: "#888888" }}>{p.desc}</p>
                  </div>

                  {/* Bottom: tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── GitHub CTA ── */}
        <div className="text-center mt-12">
          <a href="https://github.com/touseef7878" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
            style={{ color: "#555555" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#FFFFFF")}
            onMouseLeave={e => (e.currentTarget.style.color = "#555555")}>
            <Github size={14} /> View all on GitHub <ExternalLink size={11} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
