import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/scrollManager";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Qasim Shahzad",
    role: "Manager at RedFORT360",
    initials: "QS",
    text: "He showed excellent attention to detail and quickly integrated into our front-end workflow. His work greatly improved the UI consistency, responsiveness, and overall user engagement.",
    image: "/qasim-shahzad.jpg.jpeg",
  },
  {
    name: "Abdul Rehman Radwan",
    role: "CEO at Elevvo Pathways",
    initials: "AR",
    text: "He demonstrated strong problem-solving skills and quickly adapted to our ML workflow. His contribution to the data preprocessing pipeline significantly improved model performance.",
    image: null,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".testimonials-heading",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".testimonials-heading", start: "top 88%", once: true } }
      );
      gsap.fromTo(".testimonial-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".testimonial-card", start: "top 85%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const navigate = (dir: 1 | -1) => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      opacity: 0, x: -20 * dir, duration: 0.2, ease: "power2.in",
      onComplete: () => {
        setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
        gsap.fromTo(cardRef.current,
          { opacity: 0, x: 20 * dir },
          { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }
        );
      },
    });
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" ref={sectionRef} className="py-28 md:py-36" style={{ background: "#0D0D0D" }}>
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="testimonials-heading mb-16 opacity-0">
          <span className="section-label mb-4 inline-flex">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-4" style={{ color: "#FFFFFF" }}>
            What People Say
          </h2>
        </div>

        <div className="testimonial-card w-full max-w-2xl opacity-0">
          <div ref={cardRef} className="rounded-xl p-8 md:p-10" style={{ background: "#111111", border: "1px solid #1A1A1A" }}>

            {/* Quote mark */}
            <div className="text-5xl font-black leading-none mb-6 select-none" style={{ color: "#22C55E", fontFamily: "'Space Grotesk', sans-serif" }}>
              "
            </div>

            <p className="text-sm md:text-base leading-[1.9] mb-8" style={{ color: "#EBEBEB" }}>
              {t.text}
            </p>

            {/* Author + navigation */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                {t.image ? (
                  <img src={t.image} alt={t.name} loading="lazy" decoding="async"
                    className="w-10 h-10 rounded-full object-cover"
                    style={{ border: "1px solid #2A2A2A", filter: "grayscale(20%)" }} />
                ) : (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", color: "#888888" }}>
                    {t.initials}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>{t.name}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "#555555" }}>{t.role}</p>
                </div>
              </div>

              {/* Nav */}
              <div className="flex items-center gap-2">
                {/* Dots */}
                <div className="flex gap-1.5 mr-2">
                  {testimonials.map((_, i) => (
                    <div key={i} className="rounded-full transition-all duration-300"
                      style={{
                        width: i === current ? "16px" : "4px",
                        height: "4px",
                        background: i === current ? "#22C55E" : "#333333",
                      }} />
                  ))}
                </div>
                <button onClick={() => navigate(-1)} aria-label="Previous"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ border: "1px solid #222222", color: "#555555" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; (e.currentTarget as HTMLElement).style.borderColor = "#444444"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#555555"; (e.currentTarget as HTMLElement).style.borderColor = "#222222"; }}>
                  <ChevronLeft size={13} />
                </button>
                <button onClick={() => navigate(1)} aria-label="Next"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ border: "1px solid #222222", color: "#555555" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; (e.currentTarget as HTMLElement).style.borderColor = "#444444"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#555555"; (e.currentTarget as HTMLElement).style.borderColor = "#222222"; }}>
                  <ChevronRight size={13} />
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
