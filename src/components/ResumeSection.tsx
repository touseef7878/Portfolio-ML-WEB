import { useEffect, useRef } from "react";
import { gsap } from "@/lib/scrollManager";
import { FileText, Download, ExternalLink, Briefcase, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const timeline = [
  {
    type: "work",
    icon: Briefcase,
    title: "Machine Learning Intern",
    org: "Elevvo — Remote (Egypt)",
    period: "Sep 2025 · 1 Month",
    desc: "Delivered a full computer vision pipeline (PyTorch & OpenCV), built loan-approval predictive models, K-Means clustering pipelines, and a MovieLens recommendation engine.",
    color: "#A855F7",
  },
  {
    type: "work",
    icon: Briefcase,
    title: "Website Developer Intern",
    org: "RedFort360 — Wah Cantt, Pakistan",
    period: "May 2025 – Aug 2025 · 4 Months",
    desc: "Engineered responsive React UIs, built Flask REST APIs with Supabase PostgreSQL, and deployed applications on Render and Railway in agile sprints.",
    color: "#3B82F6",
  },
  {
    type: "edu",
    icon: GraduationCap,
    title: "BS Computer Science",
    org: "HITEC University Taxila — Taxila, Punjab, Pakistan",
    period: "Sep 2022 – Sep 2026 · GPA 3.27 / 4.0",
    desc: "Machine Learning, Deep Learning, Data Mining, NLP, Computer Vision, Software Engineering, Database Systems, Algorithms & Data Structures.",
    color: "#10B981",
  },
  {
    type: "cert",
    icon: Award,
    title: "Full-Stack Web Development",
    org: "Prodigy InfoTech",
    period: "2024",
    desc: "Built four real-world applications across front-end and back-end tracks.",
    color: "#F59E0B",
  },
];

const ResumeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".resume-heading",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".resume-heading", start: "top 88%", once: true } }
      );
      gsap.fromTo(".timeline-item",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ".timeline-item", start: "top 88%", once: true } }
      );
      gsap.fromTo(".resume-cta",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".resume-cta", start: "top 90%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="resume" ref={sectionRef} className="py-28 md:py-36">
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="resume-heading text-center mb-20 will-change-transform">
          <span className="section-label mb-5 inline-flex">Experience</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            My <span className="text-gradient">Journey</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start max-w-5xl mx-auto">

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/8" />

            <div className="space-y-6">
              {timeline.map((item, i) => (
                <div key={i} className="timeline-item flex gap-5 will-change-transform">
                  {/* Dot */}
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 bg-background"
                    style={{ border: `1px solid ${item.color}40`, background: `${item.color}10` }}
                  >
                    <item.icon size={15} style={{ color: item.color }} />
                  </div>

                  {/* Content */}
                  <div className="bg-card border border-white/8 rounded-xl p-5 flex-1 -mt-0.5 hover:border-white/16 transition-colors duration-200">
                    <div className="flex justify-between items-start gap-2 flex-wrap mb-0.5">
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <span
                        className="text-[10px] text-muted-foreground shrink-0"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {item.period}
                      </span>
                    </div>
                    <p className="text-xs font-medium mb-2" style={{ color: item.color }}>{item.org}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download card */}
          <div className="resume-cta will-change-transform md:sticky md:top-32">
            <div className="bg-card border border-white/8 rounded-2xl p-8 text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: "hsl(var(--primary)/0.12)", border: "1px solid hsl(var(--primary)/0.2)" }}
              >
                <FileText className="text-primary" size={24} />
              </div>

              <h3 className="font-bold text-lg mb-2">Full Resume</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-7 max-w-[200px] mx-auto">
                Download the complete PDF with skills, experience, and education.
              </p>

              <div className="flex gap-3 justify-center">
                <Button
                  asChild variant="outline" size="sm"
                  className="rounded-full border-white/15 hover:bg-white/5"
                >
                  <a href="/resumes/Touseef Ur Rehman.pdf" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={13} className="mr-1.5" /> View
                  </a>
                </Button>
                <Button asChild size="sm"
                  className="rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                  <a href="/resumes/Touseef Ur Rehman.pdf" download>
                    <Download size={13} className="mr-1.5" /> Download
                  </a>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
