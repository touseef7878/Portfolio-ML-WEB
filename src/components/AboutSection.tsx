import { useScrollAnimation } from "./useScrollAnimation";
import AnimatedCounter from "./AnimatedCounter";
import profilePhoto from "@/assets/profile-photo.jpeg";

const stats = [
  { value: "7+", label: "Projects" },
  { value: "2", label: "Service Areas" },
  { value: "10+", label: "Technologies" },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          About <span className="text-gradient">Me</span>
        </h2>
        <p className="text-muted-foreground text-center mb-14 max-w-md mx-auto text-sm">
          A quick look at who I am and what I do
        </p>

        <div className="glass rounded-3xl p-10 md:p-14 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center relative group hover:border-primary/20 transition-all duration-500">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-accent/30 rounded-br-3xl pointer-events-none" />

          {/* Profile photo with glow */}
          <div className="relative shrink-0 group/photo">
            {/* Static gradient glow */}
            <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-lg opacity-60 group-hover/photo:opacity-100 transition-opacity duration-500" />
            
            {/* Image container with magnetic effect */}
            <div 
              className="relative overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl group-hover/photo:scale-105 transition-transform duration-500"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                e.currentTarget.style.transform = `scale(1.05) translate(${x * 0.05}px, ${y * 0.05}px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img
                src={profilePhoto}
                alt="Touseef Ur Rehman"
                loading="lazy"
                className="w-48 h-48 md:w-56 md:h-56 object-cover"
              />
              {/* Shine effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-500 group-hover/photo:animate-shine" />
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1">
            <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg">
              I'm a passionate developer specializing in{" "}
              <span className="text-foreground font-semibold">
                Python, AI/ML, and Full-Stack Web Development
              </span>
              . I love building intelligent systems — from sentiment analyzers
              and prediction models to modern web applications with React and
              Flask. My goal is to solve real-world problems through clean code
              and smart algorithms.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="text-center glass rounded-xl p-5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 group/stat cursor-default"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <p className="text-3xl md:text-4xl font-bold text-gradient mb-1 group-hover/stat:scale-110 transition-transform duration-300">
                    <AnimatedCounter end={s.value} isVisible={isVisible} />
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
