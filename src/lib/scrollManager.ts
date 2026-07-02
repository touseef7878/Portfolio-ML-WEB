/**
 * Singleton that initialises GSAP + ScrollTrigger once for the whole app.
 * Every component that uses ScrollTrigger imports from here, not directly
 * from gsap — guaranteeing a single registration.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Make ScrollTrigger aware of layout changes caused by lazy-loaded sections
export function refreshScrollTrigger() {
  // Small tick lets the browser finish painting before recalculating
  setTimeout(() => ScrollTrigger.refresh(), 100);
}

export { gsap, ScrollTrigger };
