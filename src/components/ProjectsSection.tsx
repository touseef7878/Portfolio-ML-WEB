import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/scrollManager";
import TiltCard from "./TiltCard";
import { Github, ArrowUpRight, ExternalLink } from "lucide-react";
import projectQuiz      from "@/assets/project-quiz.webp";
import projectLibrary   from "@/assets/project-library.webp";
import projectSentiment from "@/assets/project-sentiment.webp";
import projectLoan      from "@/assets/project-loan.webp";
import projectScores    from "@/assets/project-scores.webp";
import projectEcommerce from "@/assets/project-ecommerce.webp";
import projectChat      from "@/assets/project-chat.webp";

type Category = "all" | "web" | "aiml";

const projects = [
  {
    title: "AI Quiz App",
    desc: "Full-stack quiz platform with user registration, dynamic question generation, and performance tracking.",
    tags: ["Python", "Flask", "SQLite"],
    cat: "web" as Category,
    image: projectQuiz,
    github: "https://github.com/touseef7878/AI-Quiz-APP",
    demo: null,
    featured: true,
  },
  {
    title: "Library Management System",
    desc: "Web app for managing books, members, loans, and reviews with a clean admin interface.",
    tags: ["Flask", "SQLite", "HTML/CSS"],
    cat: "web" as Category,
    image: projectLibrary,
    github: "https://github.com/touseef7878/Library-Management-System",
    demo: "https://library-management-system-vq17.onrender.com/",
    featured: true,
  },
  {
    title: "Sentiment Analyzer",
    desc: "NLP tool that classifies text as positive, negative, or neutral using NLTK preprocessing pipelines.",
    tags: ["Python", "Flask", "NLTK"],
    cat: "aiml" as Category,
    image: projectSentiment,
    github: "https://github.com/touseef7878/Sentiment-Analyzer",
    demo: "https://sentiment-analyzer-cpwq.onrender.com/",
    featured: true,
  },
  {
    title: "Loan Approval Prediction",
    desc: "ML classifier predicting loan application outcomes based on applicant financial data.",
    tags: ["Python", "Scikit-learn", "Pandas"],
    cat: "aiml" as Category,
    image: projectLoan,
    github: "https://github.com/touseef7878/Loan-Approval-Prediction",
    demo: null,
    featured: false,
  },
  {
    title: "Student Score Predictor",
    desc: "Linear regression model predicting exam scores from study hours with interactive visualisation.",
    tags: ["Python", "Scikit-learn", "NumPy"],
    cat: "aiml" as Category,
    image: projectScores,
    github: "https://github.com/touseef7878/Predicting-student-scores",
    demo: null,
    featured: false,
  },
  {
    title: "E-Commerce App",
    desc: "Online store with product listings, shopping cart, authentication, and checkout flow.",
    tags: ["React", "Flask", "REST API"],
    cat: "web" as Category,
    image: projectEcommerce,
    github: "https://github.com/touseef7878/PRODIGY_FS_03",
    demo: null,
    featured: false,
  },
  {
    title: "Chat Application",
    desc: "Real-time messaging with authentication, chat rooms, and a fully responsive TypeScript frontend.",
    tags: ["React", "TypeScript", "Vite"],
    cat: "web" as Category,
    image: projectChat,
    github: "https://github.com/touseef7878/PRODIGY_FS_04",
    demo: null,
    featured: false,
  },
];

const FILTERS: { label: string; value: Category }[] = [
  { label: "All Projects", value: "all" },
  { label: "Web Dev",      value: "web" },
  { label: "AI / ML",      value: "aiml" },
];

const ProjectsSection = () => {
  const [filter, setFilter] = useState<Category>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.cat === filter);

  // Initial reveal on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".projects-heading",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".projects-heading", start: "top 88%", once: true } }
      );
      gsap.fromTo(".project-card",
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: cardsRef.current, start: "top 85%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate on filter change
  useEffect(() => {
    if (!cardsRef.current) return;
    gsap.fromTo(".project-card",
      { opacity: 0, y: 24, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out", stagger: 0.065 }
    );
  }, [filter]);

  return (
    <section id="projects" ref={sectionRef} className="py-28 md:py-36">
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="projects-heading text-center mb-14 will-change-transform">
          <span className="section-label mb-5 inline-flex">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-4 max-w-xs mx-auto">
            Web development and AI/ML work — built and shipped
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                filter === f.value
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 bg-transparent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <TiltCard
              key={p.title}
              className="project-card group flex flex-col bg-card border border-white/8 rounded-2xl overflow-hidden hover:border-primary/25 transition-all duration-300 shadow-sm will-change-transform"
            >
              {/* Image */}
              <div className="relative h-44 bg-white/3 overflow-hidden shrink-0">
                {p.featured && (
                  <span className="absolute top-3 left-3 z-10 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary text-white">
                    Featured
                  </span>
                )}
                <img
                  src={p.image} alt={p.title}
                  loading="lazy" decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                />
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-[15px] mb-1.5 group-hover:text-primary transition-colors duration-200">
                  {p.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                  {p.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-3 border-t border-white/6">
                  <a
                    href={p.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`${p.title} source code`}
                  >
                    <Github size={13} /> Code
                  </a>
                  {p.demo && (
                    <a
                      href={p.demo} target="_blank" rel="noopener noreferrer"
                      className="ml-auto flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                      aria-label={`${p.title} live demo`}
                    >
                      Live <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* GitHub link */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/touseef7878"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-white/10 hover:border-white/20 rounded-full px-5 py-2.5"
          >
            <Github size={14} />
            All projects on GitHub
            <ExternalLink size={12} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
