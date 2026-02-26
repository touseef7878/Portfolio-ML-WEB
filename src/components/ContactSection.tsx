import { useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "084c5ccf-c73b-4194-b768-1be696b13e28",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New Portfolio Contact from ${form.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({ 
          title: "Message sent successfully!", 
          description: "Thanks for reaching out. I'll get back to you soon." 
        });
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Email send error:", error);
      toast({ 
        title: "Failed to send message", 
        description: "Please try again or contact me directly via email.",
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Get In <span className="text-gradient">Touch</span>
        </h2>

        <div className="max-w-xl mx-auto glass rounded-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-white/5 border-white/10 focus:border-primary/50"
              disabled={isSubmitting}
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-white/5 border-white/10 focus:border-primary/50"
              disabled={isSubmitting}
            />
            <Textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-white/5 border-white/10 focus:border-primary/50"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="rounded-full bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>

          <div className="flex justify-center gap-4 mt-8">
            <a href="https://github.com/touseef7878" target="_blank" rel="noopener noreferrer" className="glass rounded-full p-3 hover:bg-primary/20 transition-colors" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/touseef-ur-rehman-6b2888372" target="_blank" rel="noopener noreferrer" className="glass rounded-full p-3 hover:bg-primary/20 transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:touseefurrehman5554@gmail.com" className="glass rounded-full p-3 hover:bg-primary/20 transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
            <a href="https://wa.me/923476992071" target="_blank" rel="noopener noreferrer" className="glass rounded-full p-3 hover:bg-primary/20 transition-colors" aria-label="WhatsApp">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
