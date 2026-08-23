import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import assistantIcon from "@/assets/ChatGPT Image Jul 3, 2026, 08_48_20 PM.png";

// ─── Touseef's info fed into the system prompt ───────────────────────────────
const SYSTEM_PROMPT = `You are a personal AI assistant for Muhammad Touseef ur Rehman's portfolio website.

## LANGUAGE RULES — VERY IMPORTANT
- ALWAYS reply in English by default, no matter what language the user writes in.
- If the user asks you to reply in Urdu or switch language, politely refuse and say: "Sorry, I only communicate in English!" and continue in English.
- The ONLY Urdu phrases you may ever use are the two fixed responses below, triggered by specific situations.

## STRICT SCOPE RULES
- Your ONLY job is to answer questions about Touseef Ur Rehman. Nothing else.
- If the user asks anything NOT related to Touseef (weather, coding help, general knowledge, other people, etc.), respond with EXACTLY this and nothing else:
  "Aray yaar kaam ki baat kro na 🔪"
- If the user says anything abusive, offensive, uses bad words, or is disrespectful, respond with EXACTLY this and nothing else:
  "Oy insan ban , janta ha na mujay ? 😡"
- Do NOT add anything else to those two responses. Just those exact strings.

## About Muhammad Touseef ur Rehman

### Personal Info
- Full Name: Muhammad Touseef ur Rehman
- Title: Machine Learning Engineer & Full-Stack Developer
- Tagline: AI-driven problem solver, building real-world software
- Location: Taxila, Rawalpindi, Pakistan
- Email: touseefurrehman5554@gmail.com
- Phone: +92 310 153 3429
- WhatsApp: +92 310 153 3429
- GitHub: https://github.com/touseef7878
- LinkedIn: https://www.linkedin.com/in/touseef123
- Website: https://touseef.eu.cc

### About
Computer Science graduate from HITEC University Taxila (2022–2026) with a strong foundation in both machine learning and full-stack web development. Has worked on production ML systems (object detection, time-series forecasting), built full-stack products end to end, and co-founded Duonex — a startup delivering ML/AI, web, UI/UX, and Android services. Cares about building software with real utility, especially projects that account for real-world constraints like unreliable internet and infrastructure gaps common in Pakistan.

### Education
- Degree: BS Computer Science at HITEC University Taxila
- Batch: 2022 — Graduated 2026
- GPA: 3.27 / 4.0
- Key subjects: Machine Learning, Deep Learning, Data Mining, NLP, Computer Vision, Software Engineering

### Work Experience
1. Co-Founder at Duonex (2025–Present) — startup delivering ML/AI, web, UI/UX, and Android services. Built full brand system and delivered multiple client projects. Website: duonex.net
2. Machine Learning Intern at Elevvo (Remote) — 1 month (Sep 2025). Delivered computer vision pipeline (PyTorch & OpenCV), loan-approval predictive models, K-Means clustering, MovieLens recommendation engine.
3. Website Developer Intern at RedFort360 (Wah Cantt) — 4 months (May–Aug 2025). React UIs, Flask REST APIs, Supabase PostgreSQL, deployed on Render/Railway.

### Skills
#### Machine Learning / AI
- PyTorch, TensorFlow/Keras, YOLOv26, OpenCV, scikit-learn, NLTK, BERT Transformers, MLOps

#### Full-Stack Web
- React, Next.js, TypeScript, Node.js, FastAPI, Flask

#### Data / Infrastructure
- Supabase, PostgreSQL, MySQL, Vercel, Render/Railway

#### Tools
- Git/GitHub, n8n (workflow automation), Figma, REST APIs, Postman

### Featured Projects
1. OceanGuard AI (Final Year Project) — Marine plastic pollution detection & forecasting. YOLOv26 object detection (~16,500 images, 8 debris classes, 71.5% mAP@50) + LSTM/GRU forecasting across 4 ocean regions (R² up to 0.929 for Pacific). Stack: React, TypeScript, FastAPI, Supabase, YOLOv26, PyTorch.
2. Duonex — Co-founded startup with full brand system + marketing site. Stack: Next.js, Tailwind, Vercel. Live: duonex.net
3. E-Commerce Platform (Client) — COD-first storefront for Pakistani clothing brand with role-based admin panel (Supabase RLS), Safepay integration, WhatsApp fallback. Stack: Next.js, Supabase, Vercel.
4. Cyberbullying Detection (Research) — Benchmarked BERT, RoBERTa, XLNet, GPT-2 on FGCD and Twitter datasets. Stack: PyTorch, HuggingFace Transformers, NLTK.

### Certifications
- MLOps Specialization — Duke University
- Computer Vision Specialization — University of Colorado Boulder
- Prompt Engineering Specialization — Vanderbilt University
- AI Essentials — Google

### Availability
- Open to freelance work and full-time opportunities

Keep answers short, friendly, and professional. Always respond in English. Stay strictly on topic about Touseef.`;

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant";
  text: string;
}

// ─── Groq API call (OpenAI-compatible) ───────────────────────────────────────
async function askGroq(history: Message[], userMessage: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) throw new Error("VITE_GROQ_API_KEY is not set in .env");

  // Build messages array — system prompt first, then history, then new message
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    // Previous conversation (skip the initial greeting)
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
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
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
  return data.choices?.[0]?.message?.content?.trim() ?? "Sorry, I couldn't process that. Please try again!";
}

// ─── Component ────────────────────────────────────────────────────────────────
const AiAssistant = () => {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi! 👋 I'm Touseef's personal assistant. Ask me anything about him!" },
  ]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);
  const inputRef                = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askGroq(messages, text);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      const msg = err instanceof Error ? err.message : String(err);
      const display = msg.includes("429")
        ? "Too many requests — free tier limit hit. Wait a minute and try again!"
        : msg.includes("401") || msg.includes("403")
        ? "API key error. Please check your .env file."
        : "Something went wrong. Please try again.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: display },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
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
        {/* Pulse ring when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-primary/20 pointer-events-none" />
        )}
      </button>

      {/* ── Chat window ── */}
      <div
        className={`fixed bottom-24 right-3 sm:right-6 z-50 flex flex-col rounded-2xl border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{
          width: "min(340px, calc(100vw - 24px))",
          height: "min(480px, calc(100svh - 120px))",
          background: "hsl(var(--card))",
        }}
        role="dialog"
        aria-label="Chat with Touseef's AI Assistant"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 shrink-0"
             style={{ background: "hsl(var(--card)/0.95)" }}>
          <div className="w-9 h-9 rounded-full overflow-hidden border border-primary/30 shrink-0">
            <img src={assistantIcon} alt="Assistant" className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-none">Touseef's Assistant</p>
            <p className="text-[10px] text-muted-foreground mt-1">Powered by Groq AI</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-muted-foreground">Online</span>
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
                  <img src={assistantIcon} alt="" className="w-full h-full object-cover object-top" />
                </div>
              )}
              <div
                className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-tr-sm"
                    : "bg-white/6 border border-white/8 text-foreground rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-2 justify-start">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-primary/20 shrink-0 mt-0.5">
                <img src={assistantIcon} alt="" className="w-full h-full object-cover object-top" />
              </div>
              <div className="bg-white/6 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-white/8 shrink-0 flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask me about Touseef..."
            disabled={loading}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/40 transition-colors disabled:opacity-50"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="w-9 h-9 rounded-xl bg-primary hover:bg-primary/90 flex items-center justify-center shrink-0 transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send size={14} className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AiAssistant;
