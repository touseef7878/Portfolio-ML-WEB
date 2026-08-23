import { useEffect, useRef } from "react";
import { gsap } from "@/lib/scrollManager";
import { Download, ExternalLink, Briefcase, GraduationCap, Award, Building2 } from "lucide-react";

const experience = [
  {
    Icon: Building2,
    title: "Co-Founder",
    org: "Duonex",
    orgLink: "https://duonex.net",
    period: "2025 – Present",
    desc: "Co-founded a startup delivering ML/AI, web development, UI/UX, and Android services. Built the full brand system and delivered multiple client projects end-to-end.",
    tags: ["Next.js", "ML/AI", "Branding"],
    accent: "#22C55E",
  },
  {
    Icon: Briefcase,
    title: "Machine Learning Intern",
    org: "Elevvo — Remote",
    orgLink: null,
    period: "Sep 2025 · 1 mo",
    desc: "Delivered a computer vision pipeline (PyTorch & OpenCV), loan-approval predictive models, K-Means clustering, and a MovieLens recommendation engine.",
    tags: ["PyTorch", "OpenCV", "scikit-learn"],
    accent: "#FFFFFF",
  },
  {
    Icon: Briefcase,
    title: "Website Developer Intern",
    org: "RedFort360 — Wah Cantt",
    orgLink: null,
    period: "May–Aug 2025 · 4 mo",
    desc: "Engineered React UIs, built Flask REST APIs with Supabase PostgreSQL, deployed on Render and Railway.",
    tags: ["React", "Flask", "Supabase"],
    accent: "#FFFFFF",
  },
];

const education = {
  title: "BS Computer Science",
  org: "HITEC University Taxila",
  period: "2022 – 2026",
  gpa: "GPA 3.27 / 4.0",
  desc: "ML, Deep Learning, NLP, Computer Vision, Software Engineering, Databases, Algorithms.",
};

const certifications = [
  { title: "MLOps Specialization",              org: "Duke University" },
  { title: "Computer Vision Specialization",    org: "University of Colorado Boulder" },
  { title: "Prompt Engineering Specialization", org: "Vanderbilt University" },
  { title: "AI Essentials",                     org: "Google" },
];

const ResumeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".resume-heading",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".resume-heading", start: "top 88%", once: true } }
      );

      // Timeline items reveal one by one as user scrolls
      gsap.fromTo(".timeline-item",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.55, ease: "power3.out", stagger: 0.14,
          scrollTrigger: { trigger: ".timeline-item", start: "top 85%", once: true } }
      );

      // Timeline line grows downward
      gsap.fromTo(".timeline-line",
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: ".timeline-line", start: "top 85%", once: true } }
      );

      gsap.fromTo(".cert-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: ".cert-item", start: "top 90%", once: true } }
      );

      gsap.fromTo(".resume-cta",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".resume-cta", start: "top 90%", once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="resume" ref={sectionRef} className="py-28 md:py-36" style={{ background: "#0D0D0D" }}>
      <div className="container mx-auto px-6 max-w-6xl">

        <div className="resume-heading mb-20 opacity-0">
          <span className="section-label mb-4 inline-flex">Experience</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-4" style={{ color: "#FFFFFF" }}>
            My Journey
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">

          {/* Left — Timeline */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-8" style={{ color: "#333333" }}>
              Work Experience
            </p>
            <div className="relative">
              {/* Vertical line */}
              <div className="timeline-line absolute left-[15px] top-2 bottom-2 w-px" style={{ background: "#1A1A1A" }} />

              <div className="space-y-6">
                {experience.map((item, i) => (
                  <div key={i} className="timeline-item flex gap-5 opacity-0">
                    {/* Dot */}
                    <div className="shrink-0 mt-1 w-8 h-8 rounded-full flex items-center justify-center z-10"
                      style={{ background: "#111111", border: `1px solid ${item.accent === "#22C55E" ? "rgba(34,197,94,0.3)" : "#222222"}` }}>
                      <item.Icon size={13} style={{ color: item.accent }} />
                    </div>

                    {/* Card */}
                    <div className="flex-1 rounded-xl p-5 transition-all duration-200"
                      style={{ background: "#111111", border: "1px solid #1A1A1A" }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = "#2A2A2A")}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = "#1A1A1A")}>
                      <div className="flex justify-between items-start gap-3 mb-1 flex-wrap">
                        <h4 className="text-sm font-bold" style={{ color: "#FFFFFF" }}>{item.title}</h4>
                        <span className="text-[10px] font-mono shrink-0" style={{ color: "#444444" }}>{item.period}</span>
                      </div>
                      <p className="text-xs font-medium mb-3">
                        {item.orgLink
                          ? <a href={item.orgLink} target="_blank" rel="noopener noreferrer"
                              style={{ color: "#22C55E" }}
                              className="hover:underline">{item.org}</a>
                          : <span style={{ color: "#888888" }}>{item.org}</span>
                        }
                      </p>
                      <p className="text-xs leading-relaxed mb-3" style={{ color: "#666666" }}>{item.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <p className="text-[10px] font-bold uppercase tracking-widest mt-10 mb-6" style={{ color: "#333333" }}>
              Education
            </p>
            <div className="timeline-item opacity-0 rounded-xl p-5"
              style={{ background: "#111111", border: "1px solid #1A1A1A" }}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "#111111", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <GraduationCap size={13} style={{ color: "#22C55E" }} />
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-0.5" style={{ color: "#FFFFFF" }}>{education.title}</h4>
                  <p className="text-xs font-medium mb-1" style={{ color: "#22C55E" }}>{education.org}</p>
                  <p className="text-[10px] font-mono mb-2" style={{ color: "#444444" }}>
                    {education.period} · {education.gpa}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#666666" }}>{education.desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-8">

            {/* Certifications */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: "#333333" }}>
                Certifications
              </p>
              <div className="space-y-2">
                {certifications.map((c, i) => (
                  <div key={i} className="cert-item opacity-0 flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200"
                    style={{ background: "#111111", border: "1px solid #1A1A1A" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "#2A2A2A")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "#1A1A1A")}>
                    <Award size={13} style={{ color: "#22C55E", flexShrink: 0 }} />
                    <div>
                      <p className="text-xs font-semibold" style={{ color: "#EBEBEB" }}>{c.title}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: "#444444" }}>{c.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume download */}
            <div className="resume-cta opacity-0 rounded-xl p-7 text-center"
              style={{ background: "#111111", border: "1px solid #1A1A1A" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" }}>
                <Download size={16} style={{ color: "#22C55E" }} />
              </div>
              <h3 className="text-sm font-bold mb-2" style={{ color: "#FFFFFF" }}>Full Resume</h3>
              <p className="text-xs mb-6 max-w-[180px] mx-auto leading-relaxed" style={{ color: "#555555" }}>
                Complete PDF — skills, experience &amp; education.
              </p>
              <div className="flex gap-2 justify-center">
                <a href="/resumes/Touseef Ur Rehman.pdf" target="_blank" rel="noopener noreferrer"
                  className="btn-outline" style={{ padding: "0.5rem 1.25rem", fontSize: "0.75rem" }}>
                  <ExternalLink size={12} /> View
                </a>
                <a href="/resumes/Touseef Ur Rehman.pdf" download
                  className="btn-white" style={{ padding: "0.5rem 1.25rem", fontSize: "0.75rem" }}>
                  <Download size={12} /> Download
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
