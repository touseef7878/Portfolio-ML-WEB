import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete?: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 1600;
    const steps = 80;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      setProgress(Math.round(eased * 100));
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => onComplete?.(), 500);
        }, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <div className="mb-10 text-center select-none">
        <span className="text-5xl font-bold tracking-tight text-gradient" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          T.
        </span>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Portfolio
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-40 h-px bg-border relative overflow-hidden rounded-full">
        <div
          className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <p className="mt-4 text-xs tabular-nums text-muted-foreground"
         style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {progress}%
      </p>
    </div>
  );
};

export default Loader;
