import { useScrollAnimation } from "./useScrollAnimation";
import iconLanguages from "@/assets/icon-languages.png";
import iconAiml from "@/assets/icon-aiml.png";
import iconWeb from "@/assets/icon-web.png";
import iconTools from "@/assets/icon-tools.png";

const categories = [
  {
    image: iconLanguages,
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "HTML/CSS", "SQL"],
  },
  {
    image: iconAiml,
    title: "AI / ML",
    skills: ["NLTK", "Scikit-learn", "Linear Regression", "Sentiment Analysis"],
  },
  {
    image: iconWeb,
    title: "Web",
    skills: ["React", "Flask", "Vite", "Tailwind CSS", "shadcn/ui"],
  },
  {
    image: iconTools,
    title: "Tools",
    skills: ["Git", "GitHub", "SQLite", "REST APIs"],
  },
];

const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

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
              className="glass rounded-2xl p-6 hover:glow-border transition-all duration-300 group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
