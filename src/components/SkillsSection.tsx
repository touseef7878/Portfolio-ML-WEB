import { useScrollAnimation } from "./useScrollAnimation";
import { useState } from "react";
import iconLanguages from "@/assets/icon-languages.png";
import iconAiml from "@/assets/icon-aiml.png";
import iconWeb from "@/assets/icon-web.png";
import iconTools from "@/assets/icon-tools.png";

const categories = [
  {
    image: iconLanguages,
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "HTML/CSS", "SQL"],
    description: "Proficient in multiple programming languages for diverse development needs",
  },
  {
    image: iconAiml,
    title: "AI / ML",
    skills: ["NLTK", "Scikit-learn", "Linear Regression", "Sentiment Analysis"],
    description: "Building intelligent systems with machine learning and natural language processing",
  },
  {
    image: iconWeb,
    title: "Web",
    skills: ["React", "Flask", "Vite", "Tailwind CSS", "shadcn/ui"],
    description: "Creating modern, responsive web applications with cutting-edge frameworks",
  },
  {
    image: iconTools,
    title: "Tools",
    skills: ["Git", "GitHub", "SQLite", "REST APIs"],
    description: "Leveraging essential development tools for efficient workflow and collaboration",
  },
];

const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section id="skills" className="py-24 relative">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          My <span className="text-gradient">Skills</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className="relative h-64 perspective-1000"
              style={{ transitionDelay: `${i * 100}ms` }}
              onMouseEnter={() => setFlipped(i)}
              onMouseLeave={() => setFlipped(null)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                  flipped === i ? "rotate-y-180" : ""
                }`}
              >
                {/* Front of card */}
                <div className="absolute inset-0 glass rounded-2xl p-6 backface-hidden hover:glow-border transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden animate-bounce-subtle">
                    <img src={cat.image} alt={cat.title} loading="lazy" className="w-8 h-8 object-contain" />
                  </div>
                  <h3 className="font-semibold text-lg mb-4">{cat.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 italic">Hover to learn more</p>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 glass-strong rounded-2xl p-6 backface-hidden rotate-y-180 flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 animate-pulse-slow">
                    <img src={cat.image} alt={cat.title} loading="lazy" className="w-10 h-10 object-contain" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gradient">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
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
