import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Contact",    href: "#contact" },
  { label: "Experience", href: "#resume" },
  { label: "Services",   href: "#services" },
  { label: "Projects",   href: "#projects" },
  { label: "Skills",     href: "#skills" },
  { label: "About",      href: "#about" },
];

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [active, setActive]         = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["hero", "about", "skills", "projects", "services", "resume", "contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        padding: scrolled ? "10px 0" : "16px 0",
        background: scrolled ? "rgba(8,12,10,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(34,197,94,0.08)" : "none",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 max-w-7xl">

        {/* Logo + status */}
        <div className="flex items-center gap-3">
          <a href="#hero"
            className="flex items-center gap-1 select-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span className="text-2xl font-black" style={{ color: "#FFFFFF" }}>T</span>
          </a>

          {/* Status pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.15)" }}>
            <span className="green-dot green-pulse" style={{ width: "5px", height: "5px" }} />
            <span className="text-[10px] font-medium" style={{ color: "#22C55E" }}>
              Available for opportunities
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              className="text-xs font-medium tracking-wide transition-colors duration-200"
              style={{ color: active === link.href.slice(1) ? "#FFFFFF" : "#4A6650" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={e => (e.currentTarget.style.color = active === link.href.slice(1) ? "#FFFFFF" : "#4A6650")}>
              {link.label}
            </a>
          ))}

          <a href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
            style={{ background: "#FFFFFF", color: "#080C0A" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#E5E5E5")}
            onMouseLeave={e => (e.currentTarget.style.background = "#FFFFFF")}>
            Hire Me →
          </a>
        </div>

        {/* Mobile */}
        <button className="md:hidden p-2 rounded-lg transition-colors"
          style={{ border: "1px solid #1A2B1E", color: "#4A6650" }}
          onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 flex flex-col gap-4"
          style={{ background: "rgba(8,12,10,0.98)", borderBottom: "1px solid #1A2B1E" }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="text-sm font-medium py-1 transition-colors"
              style={{ color: active === link.href.slice(1) ? "#22C55E" : "#4A6650" }}>
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)}
            className="px-4 py-2 rounded-full text-sm font-bold text-center mt-1"
            style={{ background: "#FFFFFF", color: "#080C0A" }}>
            Hire Me →
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
