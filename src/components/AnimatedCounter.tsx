import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  end: string;
  duration?: number;
  isVisible: boolean;
}

const AnimatedCounter = ({ end, duration = 2000, isVisible }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  // Extract number from string like "7+" or "10+"
  const numericValue = parseInt(end.replace(/\D/g, ""), 10);
  const suffix = end.replace(/\d/g, "");

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * numericValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, numericValue, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
