import { useEffect, useState, useRef } from "react";
import { Github, Linkedin, ArrowDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-video.mp4";

const roles = ["Python Developer", "ML / AI Engineer", "Web Developer"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 80);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
    } else {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Full-page branded loader */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-all duration-1000 ${
          videoReady ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {/* Double circle spinner */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-2 border-primary/10" />
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
              style={{
                borderTopColor: "hsl(var(--primary))",
                borderRightColor: "hsl(var(--primary) / 0.3)",
                animationDuration: "1.2s",
              }}
            />
            <div
              className="absolute inset-3 rounded-full border-2 border-transparent animate-spin"
              style={{
                borderBottomColor: "hsl(var(--accent))",
                borderLeftColor: "hsl(var(--accent) / 0.3)",
                animationDirection: "reverse",
                animationDuration: "0.9s",
              }}
            />
            <div className="absolute inset-6 rounded-full border border-primary/5 animate-pulse" />
          </div>

          {/* Branded text */}
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">
              <span className="text-gradient">Touseef</span>
              <span className="text-muted-foreground font-light ml-1">Portfolio</span>
            </h2>
            <div className="w-32 h-0.5 rounded-full overflow-hidden bg-muted">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                style={{
                  animation: "loader-bar 1.5s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen background video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onCanPlayThrough={() => setVideoReady(true)}
        onPlaying={() => setVideoReady(true)}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Gradient overlay — heavier on left for text readability, lighter on right to show video */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-12 lg:px-20 flex items-center min-h-screen">
        <div className="max-w-2xl flex flex-col gap-6 md:gap-8 pl-0 md:pl-6 lg:pl-10">
          <div>
            <p className="text-muted-foreground text-sm md:text-xl mb-2 md:mb-3 tracking-wider uppercase">Hello, I'm</p>
            <h1 className="text-3xl md:text-7xl font-bold mb-3 md:mb-5 leading-tight">
              Touseef Ur Rehman
            </h1>
            <div className="h-10 md:h-12 flex items-center">
              <span className="text-lg md:text-3xl text-gradient font-semibold">
                {text}
              </span>
              <span
                className="inline-block w-0.5 h-6 md:h-8 bg-primary ml-1"
                style={{ animation: "typewriter-blink 1s step-end infinite" }}
              />
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 md:gap-5">
            <Button
              asChild
              className="rounded-full px-6 md:px-10 py-5 md:py-6 text-sm md:text-base bg-primary hover:bg-primary/80 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
            >
              <a href="#projects">View My Work</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-6 md:px-10 py-5 md:py-6 text-sm md:text-base border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:border-primary"
            >
              <a href="#contact">Contact Me</a>
            </Button>
          </div>

          {/* Socials */}
          <div className="flex gap-3 md:gap-5">
            <a href="https://github.com/touseef7878" target="_blank" rel="noopener noreferrer" className="glass rounded-full p-3 md:p-4 hover:bg-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
              <Github size={18} className="md:w-[22px] md:h-[22px]" />
            </a>
            <a href="https://www.linkedin.com/in/touseef-ur-rehman-6b2888372" target="_blank" rel="noopener noreferrer" className="glass rounded-full p-3 md:p-4 hover:bg-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
              <Linkedin size={18} className="md:w-[22px] md:h-[22px]" />
            </a>
            <a href="https://wa.me/923476992071" target="_blank" rel="noopener noreferrer" className="glass rounded-full p-3 md:p-4 hover:bg-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
              <MessageCircle size={18} className="md:w-[22px] md:h-[22px]" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ArrowDown size={24} className="text-muted-foreground" />
      </a>
    </section>
  );
};

export default HeroSection;
