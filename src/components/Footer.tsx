import { Github, Linkedin, MessageCircle } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-white/10 py-10">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © 2026 Touseef Ur Rehman. All rights reserved.
      </p>
      <div className="flex gap-4">
        <a href="https://github.com/touseef7878" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
          <Github size={18} />
        </a>
        <a href="https://www.linkedin.com/in/touseef-ur-rehman-6b2888372" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
          <Linkedin size={18} />
        </a>
        <a href="https://wa.me/924476992071" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
          <MessageCircle size={18} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
