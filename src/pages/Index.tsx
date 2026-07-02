import { useEffect } from "react";
import { refreshScrollTrigger } from "@/lib/scrollManager";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import ResumeSection from "@/components/ResumeSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * No lazy-loading here — all sections are eager so GSAP ScrollTrigger
 * can measure correct scroll positions on first paint.
 * Lazy loading is fine for images/assets (handled by loading="lazy").
 */
const Index = () => {
  useEffect(() => {
    // Refresh after fonts / images settle
    refreshScrollTrigger();
    window.addEventListener("load", refreshScrollTrigger);
    return () => window.removeEventListener("load", refreshScrollTrigger);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ServicesSection />
      <ResumeSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
