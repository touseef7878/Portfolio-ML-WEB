import { useScrollAnimation } from "./useScrollAnimation";
import { useState } from "react";
import { Eye, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const resumes = [
  {
    title: "Web Development",
    subtitle: "Full-Stack Expertise",
    description: "React, Flask, TypeScript, and modern UI/UX frameworks",
    file: "/resumes/Web_Development_CV_Resume.pdf",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-400",
    previewText: [
      "TOUSEEF UR REHMAN",
      "Full-Stack Web Developer",
      "• React & TypeScript Expert",
      "• Flask Backend Development",
      "• Modern UI/UX Design",
      "• Responsive Web Apps",
    ],
  },
  {
    title: "AI / ML Engineering",
    subtitle: "Intelligent Systems",
    description: "Machine learning, NLP, data analysis, and Python",
    file: "/resumes/AI_ML_CV_Resume.pdf",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-pink-400",
    previewText: [
      "TOUSEEF UR REHMAN",
      "AI/ML Engineer",
      "• Machine Learning Models",
      "• Natural Language Processing",
      "• Data Analysis & Visualization",
      "• Python & Scikit-learn",
    ],
  },
];

const ResumeCard = ({ resume, index, showPreview, onPreviewChange }: {
  resume: typeof resumes[0];
  index: number;
  showPreview: boolean;
  onPreviewChange: (show: boolean) => void;
}) => {
  return (
    <div
      className="relative group"
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="relative glass rounded-3xl overflow-hidden hover:glow-border transition-all duration-300">
        <div className="relative z-10 p-8">
          <div className="flex justify-center mb-6">
            <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${resume.color} flex items-center justify-center`}>
              <FileText className={`${resume.iconColor}`} size={36} />
            </div>
          </div>

          <div className="text-center mb-6">
            <h3 className="font-bold text-xl mb-1">
              {resume.title}
            </h3>
            <p className="text-sm text-primary/80 font-medium mb-3">{resume.subtitle}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {resume.description}
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-6" />

          <div className="flex gap-3 justify-center">
            <div 
              className="relative"
              onMouseEnter={() => onPreviewChange(true)}
              onMouseLeave={() => onPreviewChange(false)}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full border-primary/50 hover:bg-primary/10 transition-all duration-300"
              >
                <Eye size={16} className="mr-2" /> Preview
              </Button>

              <div 
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 transition-all duration-300 pointer-events-none z-50 ${
                  showPreview ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                <div className="relative">
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black" />
                  
                  <div className={`bg-black rounded-xl p-3 w-52 shadow-2xl border-2 ${
                    index === 0 ? 'border-cyan-500/50' : 'border-pink-500/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/20">
                      <FileText className={resume.iconColor} size={14} />
                      <span className="text-[10px] font-semibold text-white">Resume Preview</span>
                    </div>
                    
                    <div className="space-y-1 font-mono text-[9px] leading-relaxed">
                      {resume.previewText.map((line, i) => (
                        <div 
                          key={i}
                          className={`${
                            i === 0 ? 'font-bold text-[10px] text-gradient' : 
                            i === 1 ? 'text-primary/90 font-semibold text-[9px]' : 
                            'text-gray-300'
                          } transition-all duration-300`}
                          style={{
                            transitionDelay: `${i * 50}ms`,
                            opacity: showPreview ? 1 : 0,
                            transform: showPreview ? 'translateX(0)' : 'translateX(-10px)'
                          }}
                        >
                          {line}
                        </div>
                      ))}
                    </div>

                    <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${resume.color} rounded-tr-xl rounded-bl-full opacity-20`} />
                  </div>
                </div>
              </div>
            </div>

            <Button 
              asChild
              size="sm" 
              className="rounded-full bg-primary hover:bg-primary/80 shadow-lg shadow-primary/25 transition-all duration-300"
            >
              <a href={resume.file} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="mr-2" /> View
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResumeSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [showPreview, setShowPreview] = useState<number | null>(null);

  return (
    <section id="resume" className="py-24 relative overflow-hidden">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            My <span className="text-gradient">Resume</span>
          </h2>
          <p className="text-muted-foreground text-sm">Choose your preferred version</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {resumes.map((resume, index) => (
            <ResumeCard
              key={resume.title}
              resume={resume}
              index={index}
              showPreview={showPreview === index}
              onPreviewChange={(show) => setShowPreview(show ? index : null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
