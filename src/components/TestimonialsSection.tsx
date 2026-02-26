import { useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Qasim Shahzad",
    role: "Manager at RedFORT360",
    text: "He showed excellent attention to detail and quickly integrated into our front-end workflow. His work greatly improved the UI consistency, responsiveness, and overall user engagement.",
    image: "/qasim-shahzad.jpg.jpeg",
  },
  {
    name: "Abdul Rehman Radwan",
    role: "CEO at Elevvo Pathways",
    text: "He demonstrated strong problem-solving skills and quickly adapted to our ML workflow. His contribution to the data preprocessing pipeline significantly improved model performance.",
    image: null,
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
          <p className="text-muted-foreground leading-relaxed mb-6 italic text-base">
            "{t.text}"
          </p>
          
          {t.image ? (
            <img 
              src={t.image} 
              alt={t.name}
              loading="lazy"
              decoding="async"
              width="64"
              height="64"
              className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-primary/30"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-3 flex items-center justify-center text-primary font-bold text-xl">
              {t.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          
          <p className="font-semibold text-lg">{t.name}</p>
          <p className="text-sm text-muted-foreground">{t.role}</p>

          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prev} 
              className="glass rounded-full p-2 hover:bg-primary/20 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next} 
              className="glass rounded-full p-2 hover:bg-primary/20 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
