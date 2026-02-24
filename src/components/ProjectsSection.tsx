import { useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { Github, ExternalLink } from "lucide-react";
import projectQuiz from "@/assets/project-quiz.png";
import projectLibrary from "@/assets/project-library.png";
import projectSentiment from "@/assets/project-sentiment.png";
import projectLoan from "@/assets/project-loan.png";
import projectScores from "@/assets/project-scores.png";
import projectEcommerce from "@/assets/project-ecommerce.png";
import projectChat from "@/assets/project-chat.png";

type Category = "all" | "web" | "aiml";

const projects = [
  {
    title: "AI Quiz App",
    desc: "Full-stack quiz platform with user registration & performance tracking.",
    tags: ["Python", "Flask"],
    cat: "web" as Category,
    image: projectQuiz,
  },
  {
    title: "Library Management System",
    desc: "Web app for managing books, members, loans, and reviews.",
    tags: ["Flask", "SQLite"],
    cat: "web" as Category,
    image: projectLibrary,
  },
  {
    title: "Sentiment Analyzer",
    desc: "AI-powered text sentiment analysis predicting positive or negative tone.",
    tags: ["Python", "Flask", "NLTK"],
    cat: "aiml" as Category,
    image: projectSentiment,
  },
  {
    title: "Loan Approval Prediction",
    desc: "ML model predicting whether a loan application will be approved.",
    tags: ["Python", "Scikit-learn"],
    cat: "aiml" as Category,
    image: projectLoan,
  },
  {
    title: "Student Score Predictor",
    desc: "Linear regression model to predict exam scores based on study hours.",
    tags: ["Python"],
    cat: "aiml" as Category,
    image: projectScores,
  },
  {
    title: "E-Commerce App",
    desc: "Modern online store with product listings, cart, and checkout.",
    tags: ["React", "Flask"],
    cat: "web" as Category,
    image: projectEcommerce,
  },
  {
    title: "Chat Application",
    desc: "Real-time messaging app with authentication and responsive design.",
    tags: ["React", "TypeScript", "Vite"],
    cat: "web" as Category,
    image: projectChat,
  },
];

const filters: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Web Dev", value: "web" },
  { label: "AI / ML", value: "aiml" },
];

const ProjectsSection = () => {
  const [filter, setFilter] = useState<Category>("all");
  const { ref, isVisible } = useScrollAnimation();
  const filtered = filter === "all" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <section id="projects" className="py-24 relative">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          My <span className="text-gradient">Projects</span>
        </h2>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "glass hover:bg-primary/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filtered.map((project) => (
            <div
              key={project.title}
              className="glass rounded-2xl overflow-hidden group hover:glow-border transition-all duration-300 flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img
                   src={project.image}
                   alt={project.title}
                   loading="lazy"
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="glass rounded-full p-2 hover:bg-primary/20 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href="#"
                    className="glass rounded-full p-2 hover:bg-primary/20 transition-colors"
                    aria-label="Live demo"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
