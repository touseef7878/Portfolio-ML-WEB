import { useScrollAnimation } from "./useScrollAnimation";
import { Brain, Globe } from "lucide-react";
import serviceWebdev from "@/assets/service-webdev.png";
import serviceAiml from "@/assets/service-aiml.png";

const services = [
  {
    icon: Brain,
    title: "Python / ML / AI",
    desc: "Building intelligent models — prediction systems, sentiment analysis, NLP pipelines, and data-driven solutions using Python, Scikit-learn, and NLTK.",
    image: serviceAiml,
  },
  {
    icon: Globe,
    title: "AI Driven Web Development",
    desc: "Full-stack web applications with React, Flask, and modern UI frameworks. Clean, responsive, and production-ready solutions.",
    image: serviceWebdev,
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-24 relative">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          My <span className="text-gradient">Services</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((s) => (
            <div
              key={s.title}
              className="glass rounded-2xl overflow-hidden hover:glow-border transition-all duration-300 group text-center"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                   src={s.image}
                   alt={s.title}
                   loading="lazy"
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                 />
              </div>
              <div className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:scale-110 transition-transform">
                  <s.icon className="text-primary" size={28} />
                </div>
                <h3 className="font-semibold text-xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
