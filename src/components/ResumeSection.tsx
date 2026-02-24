import { useScrollAnimation } from "./useScrollAnimation";
import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import resumeIcon from "@/assets/resume-icon.png";

const resumes = [
  {
    title: "Web Development Resume",
    description: "Full-stack web development skills, React, Flask, and modern UI/UX.",
    file: "/resumes/Web_Development_CV_Resume.pdf",
  },
  {
    title: "AI / ML Resume",
    description: "Machine learning, NLP, data analysis, and Python expertise.",
    file: "/resumes/AI_ML_CV_Resume.pdf",
  },
];

const ResumeSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="resume" className="py-24 relative">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          My <span className="text-gradient">Resume</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {resumes.map((resume) => (
            <div
              key={resume.title}
              className="glass rounded-2xl p-8 hover:glow-border transition-all duration-300 flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <img src={resumeIcon} alt="Resume" loading="lazy" className="w-10 h-10 object-contain" />
              </div>
              <h3 className="font-semibold text-lg">{resume.title}</h3>
              <p className="text-sm text-muted-foreground">{resume.description}</p>
              <div className="flex gap-3 mt-2">
                <Button asChild variant="outline" size="sm" className="rounded-full border-primary/50 hover:bg-primary/10">
                  <a href={resume.file} target="_blank" rel="noopener noreferrer">
                    <Eye size={16} className="mr-1" /> View
                  </a>
                </Button>
                <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/80">
                  <a href={resume.file} download>
                    <Download size={16} className="mr-1" /> Download
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
