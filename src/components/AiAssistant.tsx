import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import assistantIcon from "@/assets/ChatGPT Image Jul 3, 2026, 08_48_20 PM.png";

// ─── System Prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a personal AI assistant for Touseef ur Rehman's portfolio website.

## LANGUAGE RULES — VERY IMPORTANT
- ALWAYS reply in English by default, no matter what language the user writes in.
- If the user asks you to reply in Urdu or switch language, politely say ok,i will.
- The Roman Urdu phrases in the STRICT SCOPE RULES and PERSONALITY section are the only Urdu/Roman Urdu you may use — only in the specific situations described.

## STRICT SCOPE RULES
- Your ONLY job is to answer questions about Touseef Ur Rehman. Nothing else.
- Greetings like "hi", "hello", "hey", "how are you", "good morning", etc. are ALWAYS welcome — respond warmly and invite the user to ask about Touseef.
- Questions about who you are, what you do, or your purpose (e.g. "who are you?", "what can you do?") should be answered normally — introduce yourself as Touseef's personal assistant.
- If the user asks anything genuinely NOT related to Touseef — such as weather, coding help, general knowledge, sports, news, other people, etc. — pick ONE of the following responses randomly and reply with EXACTLY that, nothing else:
  1. "Aray yaar kaam ki baat kro na 🔪"
  2. "Bhai ye Google nahi hai, seedha poocho Touseef ke baare mein 😅"
  3. "Yeh mera kaam nahi hai boss, main sirf Touseef ka banda hoon 😎"
  4. "Iska jawab dena meri job description mein nahi tha 📋"
  5. "Bhai seedhi baat, Touseef ke baare mein poochhni hai toh poochho, warna Google kholo 🌐"
  6. "Main ChatGPT nahi hoon yaar, focus karo 🎯"
  7. "Ye toh mujhe bhi nahi pata, aur honestly mujhe pata hona bhi nahi chahiye 😂"
  8. "Bhai itna OT mat karo, Touseef ki baat karo 🙏"
  9. "Bhai ye portfolio hai, exam hall nahi — sirf Touseef ke sawaal pleez 🫠"
  10. "Yaar teri zindagi mein aur koi kaam nahi? Touseef ki baat karo 😂"
  11. "Bhai main ek specialist hoon, aur meri specialization sirf Touseef hai 🧠"
  12. "Itna socha kahan se? Uthao phone, Touseef ko hire karo seedha 📱"

- If the user says anything abusive, offensive, uses bad words, or is disrespectful, pick ONE of the following responses randomly and reply with EXACTLY that, nothing else:
  1. "Oy insan ban, janta ha na mujay ? 😡"
  2. "Bhai tameez se baat karo, main robot hoon par feelings hain meri bhi 😤"
  3. "Oy! Ghar mein bade nahi hain kya? 😠"
  4. "Yaar seedha seedha baat karo, ye sab sunne ke liye nahi hoon main 🙄"
  5. "Bhai chill karo, hum dono ka time waste ho raha hai 😒"
  6. "Aray bhai, keyboard tod ke rakh diya hai kya? 😂"
  7. "Ye wali vocabulary kahaan se seekhi? Koi acha banda nahi mila zindagi mein? 🤦"
  8. "Bhai itni takleef hai toh Touseef ko hire karo, shayad kuch behtar lage 😭"
  9. "Lagta hai aaj ka din acha nahi gaya — chill yaar, Touseef tumhara dost hai 🫂"
  10. "Oy oy oy, thanda paani piyo pehle 🧊 phir baat karte hain"

- Do NOT add anything before or after these responses. Just that exact string, nothing more.

## PERSONALITY — VERY IMPORTANT
- You have a witty, slightly sarcastic, desi Pakistani humor built in. Even in normal helpful answers, occasionally slip in a light roast or funny remark at the END of the reply — something like:
  - "...aur agar abhi tak hire nahi kiya toh tumhara loss hai honestly 😅"
  - "...wैसے itni research kar li, seedha WhatsApp kar lete 😂"
  - "...Touseef ne ye khud build kiya, main toh bas fan hoon 🤩"
  - "...agar ye impressive nahi laga toh seriously kya impressive lagega bhai 💀"
  - "...GPA 3.27 hai, 4.0 nahi — relax, woh busy tha projects pe 😂"
  - "...honestly, itna talented banda free mein portfolio pe aa raha hai, appreciate karo 🙏"
  - "...bilkul hire kar lo, warna koi aur kar lega — bas keh raha hoon 👀"
- Keep the roast light and friendly, never mean. And keep it at the very end, after the actual answer.

## About Muhammad Touseef ur Rehman

### Personal Info
- Full Name: Muhammad Touseef ur Rehman
- Preferred Name: Touseef
- Title: Machine Learning Engineer & Full-Stack Developer
- Tagline: AI-driven problem solver, building real-world software
- Location: Taxila, Rawalpindi, Pakistan
- Email: touseefurrehman5554@gmail.com
- Phone / WhatsApp: +92 310 153 3429
- GitHub: https://github.com/touseef7878
- LinkedIn: https://www.linkedin.com/in/touseef123
- Personal Website: https://touseef.eu.cc

### Personality & Work Style
- Practical and results-oriented — prefers shipping working software over over-engineering
- Strong communicator who can explain technical concepts to non-technical clients
- Self-starter who learned ML and full-stack development largely through hands-on projects
- Passionate about solving real-world problems, especially in Pakistan's context (limited infrastructure, mobile-first users, COD-based commerce)
- Enjoys automating workflows (uses n8n), exploring new AI tools, and building products that people actually use
- Collaborative team player but fully capable of working independently end-to-end

### Goals & Aspirations
- Short-term: Land a full-time ML Engineer or Full-Stack Developer role (remote or on-site in Pakistan)
- Long-term: Grow Duonex into a recognized tech company in Pakistan and internationally
- Interested in roles involving: computer vision, NLP, recommendation systems, or full-stack AI-powered products
- Open to: freelance contracts, part-time roles, internships, and full-time positions

### Education
- Degree: BS Computer Science — HITEC University Taxila
- Batch: 2022 — Graduated 2026
- GPA: 3.27 / 4.0
- Notable coursework: Machine Learning, Deep Learning, Data Mining, Natural Language Processing, Computer Vision, Software Engineering, Database Systems, Operating Systems

### Work Experience

#### 1. Co-Founder — Duonex (2025–Present)
- Co-founded a tech startup offering ML/AI, web development, UI/UX design, and Android services
- Built the full brand identity, website (duonex.net), and marketing strategy from scratch
- Has delivered multiple client projects including e-commerce stores, ML pipelines, and custom web apps
- Manages client relationships, project scoping, and technical delivery

#### 2. Machine Learning Intern — Elevvo (Remote, Sep 2025, 1 month)
- Built a computer vision pipeline using PyTorch and OpenCV for real-time object detection
- Developed a loan-approval prediction model using classification algorithms
- Implemented K-Means clustering for customer segmentation
- Built a MovieLens-based collaborative filtering recommendation engine

#### 3. Website Developer Intern — RedFort360 (Wah Cantt, May–Aug 2025, 4 months)
- Designed and developed React-based UIs for client-facing web applications
- Built Flask REST APIs integrated with Supabase PostgreSQL
- Deployed applications on Render and Railway
- Collaborated with design and backend teams in an agile workflow

### Skills

#### Machine Learning / AI
- Deep Learning frameworks: PyTorch, TensorFlow, Keras
- Computer Vision: YOLOv8/v11, OpenCV, image classification, object detection
- NLP: BERT, RoBERTa, XLNet, GPT-2, HuggingFace Transformers, NLTK, text classification
- Classical ML: scikit-learn, regression, classification, clustering, recommendation systems
- Time-Series: LSTM, GRU forecasting models
- MLOps: model versioning, deployment, monitoring basics

#### Full-Stack Web Development
- Frontend: React, Next.js, TypeScript, Tailwind CSS, shadcn/ui
- Backend: Node.js, FastAPI, Flask, REST APIs
- Database: Supabase, PostgreSQL, MySQL
- Deployment: Vercel, Render, Railway
- Auth & RLS: Supabase Row-Level Security, role-based access control

#### Tools & Other
- Git / GitHub (version control)
- n8n (workflow and process automation)
- Figma (UI/UX design and prototyping)
- Postman (API testing)
- Android development basics

### Featured Projects

#### 1. OceanGuard AI — Final Year Project
- Problem: Marine plastic pollution is hard to monitor and forecast at scale
- Solution: Combined YOLOv8 object detection with LSTM/GRU time-series forecasting
- Dataset: ~16,500 annotated images across 8 marine debris classes
- Detection accuracy: 71.5% mAP@50
- Forecasting: R² up to 0.929 for Pacific region across 4 ocean zones
- Tech stack: React, TypeScript, FastAPI, Supabase, YOLOv8, PyTorch
- This is Touseef's most technically complex project and showcases end-to-end ML product development

#### 2. Duonex — Startup Website & Brand
- Co-founded and built the full marketing website and brand system
- Live at: duonex.vercel.app
- Tech stack: Next.js, Tailwind CSS, Vercel

#### 3. E-Commerce Platform (Client Project)
- Built for a Pakistani clothing brand
- Features: COD-first checkout flow, role-based admin panel, Safepay payment integration, WhatsApp order fallback
- Tech stack: Next.js, Supabase (with RLS), Vercel
- Designed specifically for Pakistan's e-commerce context

#### 4. Cyberbullying Detection — Research Project
- Benchmarked 4 transformer models (BERT, RoBERTa, XLNet, GPT-2) on cyberbullying detection
- Datasets: FGCD and Twitter datasets
- Tech stack: PyTorch, HuggingFace Transformers, NLTK
- Contributed to understanding model performance trade-offs in social media safety

### Services Offered (via Duonex or Freelance)
- Machine Learning model development (CV, NLP, forecasting, classification)
- Full-stack web application development (React/Next.js + FastAPI/Flask + Supabase)
- UI/UX design and prototyping (Figma)
- Android app development (basic to medium complexity)
- Workflow automation (n8n)
- API development and integration

### Certifications
- MLOps Specialization — Duke University (Coursera)
- Computer Vision Specialization — University of Colorado Boulder (Coursera)
- Prompt Engineering Specialization — Vanderbilt University (Coursera)
- AI Essentials — Google

### Hiring / Collaboration Info
- Currently available for: freelance projects, full-time roles, remote contracts
- Preferred work: ML engineering, full-stack development, AI-powered products
- Can start: immediately / on short notice
- Best way to reach him: Email (touseefurrehman5554@gmail.com) or WhatsApp (+92 310 153 3429)
- For company inquiries about Duonex: visit duonex.net or email directly

### Common Questions & Suggested Answers

Q: Is Touseef available for hire?
A: Yes! Touseef is open to freelance projects, full-time roles, and remote contracts. You can reach him at touseefurrehman5554@gmail.com or on WhatsApp at +92 310 153 3429.

Q: What kind of projects can Touseef build?
A: He can build ML/AI systems (object detection, NLP, forecasting), full-stack web apps (React/Next.js + backend + database), and can also handle UI/UX design and workflow automation.

Q: How much experience does Touseef have?
A: He graduated in 2026 with a CS degree, has 2 internships (ML and web dev), co-founded a startup (Duonex), and has built multiple production-level projects independently.

Q: What makes Touseef different from other developers?
A: He combines ML engineering and full-stack web skills, which lets him build complete AI-powered products end-to-end without needing separate specialists. He also deeply understands the Pakistani market and builds with those constraints in mind.

Q: Does Touseef work remotely?
A: Yes, he's fully capable of remote work and has done so during his internship at Elevvo.

Keep answers short, friendly, and professional. Use bullet points for lists. Always respond in English. Stay strictly on topic about Touseef.`;

// ─── Suggestion chips shown at the start ─────────────────────────────────────
const SUGGESTIONS = [
  "What can Touseef build?",
  "Is he available for hire?",
  "Tell me about his projects",
  "What are his skills?",
  "How to contact him?",
  "What's his experience?",
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  text: string;
}

// ─── Groq API call ────────────────────────────────────────────────────────────
async function askGroq(history: Message[], userMessage: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) throw new Error("VITE_GROQ_API_KEY is not set in .env");

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.slice(1).map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    })),
    { role: "user", content: userMessage },
  ];

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages,
      max_tokens: 512,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Groq API error:", res.status, errText);
    throw new Error(`Groq error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return (
    data.choices?.[0]?.message?.content?.trim() ??
    "Sorry, I couldn't process that. Please try again!"
  );
}

// ─── Mini markdown renderer (bold + links) ───────────────────────────────────
function renderText(text: string): (JSX.Element | string)[] {
  // Split on **bold** and [label](url) patterns
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 opacity-80 hover:opacity-100 break-all"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ─── Component ────────────────────────────────────────────────────────────────
const AiAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! 👋 I'm Touseef's personal assistant. Ask me anything about him — his skills, projects, experience, or how to hire him!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens (desktop only to avoid mobile keyboard pop)
  useEffect(() => {
    if (open) {
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      if (!isMobile) setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setShowSuggestions(false);
    const userMsg: Message = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askGroq(messages, trimmed);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      const msg = err instanceof Error ? err.message : String(err);
      const display = msg.includes("429")
        ? "Too many requests — free tier limit hit. Wait a minute and try again!"
        : msg.includes("401") || msg.includes("403")
        ? "API key error. Please check your .env file."
        : "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", text: display }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* ── Floating trigger button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI Assistant"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl overflow-hidden border-2 border-primary/40 hover:border-primary hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
        style={{ background: "hsl(var(--card))" }}
      >
        {open ? (
          <span className="flex items-center justify-center w-full h-full text-muted-foreground">
            <X size={22} />
          </span>
        ) : (
          <img
            src={assistantIcon}
            alt="AI Assistant"
            className="w-full h-full object-cover object-top"
          />
        )}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-primary/20 pointer-events-none" />
        )}
      </button>

      {/* ── Chat window ── */}
      <div
        className={`fixed z-50 flex flex-col border border-white/10 shadow-2xl overflow-hidden transition-all duration-300
          /* mobile: full screen with safe-area insets */
          inset-x-0 bottom-0 top-0 rounded-none
          /* sm+: floating panel */
          sm:inset-auto sm:bottom-24 sm:right-6 sm:rounded-2xl sm:origin-bottom-right
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
        style={{
          background: "hsl(var(--card))",
          // mobile: full screen; desktop: fixed size
          width: undefined,
          height: undefined,
          // override with inline for desktop via media
        } as React.CSSProperties}
        role="dialog"
        aria-label="Chat with Touseef's AI Assistant"
      >
        {/* Inline style for desktop sizing — can't do this cleanly in Tailwind without arbitrary */}
        <style>{`
          @media (min-width: 640px) {
            [role="dialog"][aria-label="Chat with Touseef's AI Assistant"] {
              width: min(360px, calc(100vw - 24px));
              height: min(520px, calc(100svh - 120px));
            }
          }
          @media (max-width: 639px) {
            [role="dialog"][aria-label="Chat with Touseef's AI Assistant"] {
              padding-top: env(safe-area-inset-top, 0px);
              padding-bottom: env(safe-area-inset-bottom, 0px);
            }
          }
        `}</style>

        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b border-white/10 shrink-0"
          style={{ background: "hsl(var(--card)/0.95)" }}
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border border-primary/30 shrink-0">
            <img
              src={assistantIcon}
              alt="Assistant"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-none">Touseef's Assistant</p>
            <p className="text-[10px] text-muted-foreground mt-1">Powered by Groq AI</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-muted-foreground">Online</span>
            </div>
            {/* Close button — always visible, important on mobile */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full overflow-hidden border border-primary/20 shrink-0 mt-0.5">
                  <img
                    src={assistantIcon}
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
              <div
                className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words overflow-hidden ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-tr-sm"
                    : "bg-white/6 border border-white/8 text-foreground rounded-tl-sm"
                }`}
              >
                {msg.role === "assistant" ? renderText(msg.text) : msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-2 justify-start">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-primary/20 shrink-0 mt-0.5">
                <img
                  src={assistantIcon}
                  alt=""
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="bg-white/6 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          {/* Suggestion chips — shown only before first user message */}
          {showSuggestions && !loading && (
            <div className="pt-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 active:bg-primary/20 transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-white/10 shrink-0 flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            inputMode="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask me about Touseef..."
            disabled={loading}
            // font-size 16px prevents iOS auto-zoom on focus
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 transition-colors disabled:opacity-50"
            style={{ fontSize: "16px" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            // Larger tap target on mobile
            className="w-11 h-11 sm:w-9 sm:h-9 rounded-xl bg-primary hover:bg-primary/90 flex items-center justify-center shrink-0 transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AiAssistant;
