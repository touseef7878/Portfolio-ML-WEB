import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/scrollManager";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Qasim Shahzad",
    role: "Manager at RedFORT360",
    initials: "QS",
    color: "#3B82F6",
    text: "He showed excellent attention to detail and quickly integrated into our front-end workflow. His work greatly improved the UI consistency, responsiveness, and overall user engagement.",
    image: "/qasim-shahzad.jpg.jpeg",
  },
  {
    name: "Abdul Rehman Radwan",
    role: "CEO at Elevvo Pathways",
    initials: "AR",
    color: "#A855F7",
    text: "He demonstrated strong problem-solving skills and quickly adapted to our ML workflow. His contribution to the data preprocessing pipeline significantly improved model performance.",
    image: null,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef            = useRef<HTMLElement>(null);
  const cardRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".testimonials-heading",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".testimonials-heading", start: "top 88%", once: true } }
      );
      gsap.fromTo(".testimonial-card",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".testimonial-card", start: "top 85%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const navigate = (dir: 1 | -1) => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      opacity: 0, x: -30 * dir, duration: 0.22, ease: "power2.in",
      onComplete: () => {
        setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
        gsap.fromTo(cardRef.current,
          { opacity: 0, x: 30 * dir },
          { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }
        );
      },
    });
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" ref={sectionRef} className="py-28 md:py-36">
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="testimonials-heading text-center mb-16 will-change-transform">
          <span className="section-label mb-5 inline-flex">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            What People <span className="text-gradient">Say</span>
          </h2>
        </div>

        <div className="testimonial-card max-w-2xl mx-auto will-change-transform">
          <div
            ref={cardRef}
            className="bg-card border border-white/8 rounded-2xl p-10 md:p-14"
            style={{ borderTop: `2px solid ${t.color}40` }}
          >
            <Quote size={32} className="mb-6 opacity-20" style={{ color: t.color }} />

            <p className="text-base md:text-lg text-foreground/80 leading-[1.85] italic mb-8">
              "{t.text}"
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {t.image ? (
                  <img
                    src={t.image} alt={t.name}
                    loading="lazy" decoding="async"
                    className="w-12 h-12 rounded-full object-cover border-2"
                    style={{ borderColor: `${t.color}40` }}
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: `${t.color}15`, border: `2px solid ${t.color}30`, color: t.color }}
                  >
                    {t.initials}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3">
                {/* Dots */}
                <div className="flex gap-1.5 mr-1">
                  {testimonials.map((_, i) => (
                    <div
                      key={i}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === current ? "20px" : "6px",
                        background: i === current ? t.color : "rgba(255,255,255,0.15)",
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => navigate(-1)}
                  className="w-8 h-8 rounded-full border border-white/12 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/24 transition-all"
                  aria-label="Previous"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="w-8 h-8 rounded-full border border-white/12 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/24 transition-all"
                  aria-label="Next"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
