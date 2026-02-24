import { useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "Project Collaborator",
    text: "Touseef delivered an exceptional AI quiz application. His attention to detail and clean code practices made the project a huge success.",
  },
  {
    name: "Sarah Ali",
    role: "Client",
    text: "Working with Touseef on the e-commerce project was a great experience. He built a modern, responsive app that exceeded expectations.",
  },
  {
    name: "Omar Farooq",
    role: "Team Lead",
    text: "Touseef's ML expertise is impressive. His loan prediction model was accurate and well-documented. Highly recommended!",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const t = testimonials[current];

  return (
    <section className="py-24 relative">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="text-gradient">Testimonials</span>
        </h2>

        <div className="max-w-2xl mx-auto glass rounded-2xl p-8 md:p-12 text-center relative">
          <Quote className="text-primary/30 mx-auto mb-6" size={40} />
          <p className="text-muted-foreground leading-relaxed mb-6 italic">
            "{t.text}"
          </p>
          <div className="w-12 h-12 rounded-full bg-primary/20 mx-auto mb-3 flex items-center justify-center text-primary font-bold">
            {t.name[0]}
          </div>
          <p className="font-semibold">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.role}</p>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prev} className="glass rounded-full p-2 hover:bg-primary/20 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="glass rounded-full p-2 hover:bg-primary/20 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
