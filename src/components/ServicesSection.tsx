import { useScrollAnimation } from "./useScrollAnimation";
import { useState } from "react";
import { Globe, Brain, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "Modern, responsive, high-performance websites using React and modern tools.",
    color: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    details: [
      "Full-stack web applications with React, TypeScript, and Flask",
      "Responsive design with Tailwind CSS and modern UI frameworks",
      "RESTful API development and integration",
      "Database design and optimization with SQLite",
      "Clean, maintainable, and production-ready code",
      "Performance optimization and SEO best practices",
    ],
  },
  {
    icon: Brain,
    title: "Machine Learning Solutions",
    desc: "Predictive models, data analysis, and AI-powered applications.",
    color: "text-pink-400",
    iconBg: "bg-pink-500/10",
    details: [
      "Predictive modeling with Scikit-learn and Python",
      "Natural Language Processing (NLP) with NLTK",
      "Sentiment analysis and text classification",
      "Linear regression and classification models",
      "Data preprocessing and feature engineering",
      "Model evaluation and performance optimization",
    ],
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`glass rounded-3xl p-8 hover:glow-border transition-all duration-700 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 200}ms` : '0ms',
              }}
            >
              <div className={`w-16 h-16 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={service.color} size={32} strokeWidth={2} />
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient transition-all duration-300">
                {service.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.desc}
              </p>

              <div 
                className={`overflow-hidden transition-all duration-500 ${
                  expandedIndex === index ? 'max-h-96 mb-6' : 'max-h-0'
                }`}
              >
                <div className="glass-strong rounded-2xl p-4 space-y-2">
                  {service.details.map((detail, i) => (
                    <div 
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                      style={{
                        transitionDelay: expandedIndex === index ? `${i * 50}ms` : '0ms',
                        opacity: expandedIndex === index ? 1 : 0,
                        transform: expandedIndex === index ? 'translateX(0)' : 'translateX(-10px)',
                        transition: 'all 0.3s ease-out'
                      }}
                    >
                      <span className={`${service.color} mt-1`}>•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="group/btn p-0 h-auto font-semibold text-primary hover:text-primary/80 hover:bg-transparent"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                {expandedIndex === index ? (
                  <>
                    Show Less
                    <X size={16} className="ml-2" />
                  </>
                ) : (
                  <>
                    Learn More
                    <ArrowRight 
                      size={16} 
                      className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" 
                    />
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
