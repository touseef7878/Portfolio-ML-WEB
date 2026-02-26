import { useEffect, useState } from "react";
import { Github, Linkedin, ArrowDown, MessageCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = ["Python Developer", "ML / AI Engineer", "Web Developer"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile on mount
    setIsMobile(window.innerWidth < 768);
  }, []);

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
      {/* Animated gradient background - NO VIDEO ON MOBILE */}
      {!isMobile && videoEnabled ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video-compressed.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95">
          {/* Lightweight animated gradient orbs */}
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-float"
            style={{ 
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
            }}
          />
          <div 
            className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full opacity-15 animate-float-delayed"
            style={{ 
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
            }}
          />
        </div>
      )}

      {/* Gradient overlay */}
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
              className="rounded-full px-6 md:px-10 py-5 md:py-6 text-sm md:text-base bg-primary hover:bg-primary/80 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
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

          {/* Enable Motion Button - Desktop Only */}
          {!isMobile && !videoEnabled && (
            <Button
              onClick={() => setVideoEnabled(true)}
              variant="ghost"
              size="sm"
              className="self-start text-muted-foreground hover:text-foreground"
            >
              <Play size={16} className="mr-2" /> Enable Background Video
            </Button>
          )}

          {/* Socials */}
          <div className="flex gap-3 md:gap-5">
            <a 
              href="https://github.com/touseef7878" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass rounded-full p-3 md:p-4 hover:bg-primary/20 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={18} className="md:w-[22px] md:h-[22px]" />
            </a>
            <a 
              href="https://www.linkedin.com/in/touseef-ur-rehman-6b2888372" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass rounded-full p-3 md:p-4 hover:bg-primary/20 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} className="md:w-[22px] md:h-[22px]" />
            </a>
            <a 
              href="https://wa.me/923476992071" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass rounded-full p-3 md:p-4 hover:bg-primary/20 transition-all duration-300 hover:scale-110"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} className="md:w-[22px] md:h-[22px]" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10" aria-label="Scroll to about section">
        <ArrowDown size={24} className="text-muted-foreground" />
      </a>
    </section>
  );
};

export default HeroSection;
