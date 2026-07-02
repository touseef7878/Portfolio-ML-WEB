import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
// Navbar does not use GSAP directly — no import needed from scrollManager

const navLinks = [
  { label: "Home",     href: "#hero" },
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Resume",   href: "#resume" },
  { label: "Contact",  href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [active, setActive]         = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme }         = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = navLinks.map((l) => l.href.slice(1));
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

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 border-b border-border/60 py-3 shadow-sm"
          : "py-5"
      }`}
      style={{ backdropFilter: scrolled ? "blur(20px)" : "none", WebkitBackdropFilter: scrolled ? "blur(20px)" : "none" }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 max-w-6xl">
        {/* Logo */}
        <a
          href="#hero"
          className="text-xl font-bold tracking-tight text-gradient select-none"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Touseef.
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 relative group ${
                active === link.href.slice(1)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {/* Active underline */}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-primary rounded-full transition-all duration-300 ${
                  active === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full border border-border/60 bg-background/60 hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* Mobile buttons */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border/60 bg-background/60 hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            className="p-2 rounded-full border border-border/60 hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 border-b border-border/60 px-4 pt-3 pb-5 flex flex-col gap-4"
             style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-medium py-1 transition-colors ${
                active === link.href.slice(1)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
