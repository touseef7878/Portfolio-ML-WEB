import { useScrollAnimation } from "./useScrollAnimation";
import AnimatedCounter from "./AnimatedCounter";
import profilePhoto from "@/assets/profile-photo.webp";

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/3 rounded-full pointer-events-none opacity-50" />

      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-3">
          About <span className="text-gradient">Me</span>
        </h2>
        <p className="text-muted-foreground text-center mb-10 md:mb-14 max-w-md mx-auto text-xs md:text-sm px-4">
          A quick look at who I am and what I do
        </p>

        <div className="glass rounded-2xl md:rounded-3xl p-6 md:p-14 max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center relative group hover:border-primary/20 transition-all duration-500">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-accent/30 rounded-br-3xl pointer-events-none" />

          {/* Profile photo */}
          <div className="relative shrink-0 group/photo">
            <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl opacity-50 group-hover/photo:opacity-80 transition-opacity duration-500" />
            
            <div className="relative overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl group-hover/photo:scale-105 transition-transform duration-500">
              <img
                src={profilePhoto}
                alt="Touseef Ur Rehman"
                loading="lazy"
                decoding="async"
                width="224"
                height="224"
                className="w-40 h-40 md:w-56 md:h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-500 group-hover/photo:animate-shine" />
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 w-full">
            <p className="text-muted-foreground leading-relaxed mb-6 md:mb-8 text-sm md:text-lg">
              I'm a passionate developer specializing in{" "}
              <span className="text-foreground font-semibold">
                Python, AI/ML, and Full-Stack Web Development
              </span>
              . I love building intelligent systems — from sentiment analyzers
              and prediction models to modern web applications with React and
              Flask. My goal is to solve real-world problems through clean code
              and smart algorithms.
            </p>

            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="text-center glass rounded-lg md:rounded-xl p-2 md:p-5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group/stat cursor-default"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <p className="text-xl md:text-4xl font-bold text-gradient mb-0.5 md:mb-1 group-hover/stat:scale-110 transition-transform duration-300">
                    <AnimatedCounter end={s.value} isVisible={isVisible} />
                  </p>
                  <p className="text-[8px] md:text-xs text-muted-foreground uppercase tracking-tight md:tracking-wider leading-tight break-words">
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
