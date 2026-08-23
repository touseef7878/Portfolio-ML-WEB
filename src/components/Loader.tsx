import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete?: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut]   = useState(false);

  useEffect(() => {
    const duration = 1400;
    const steps    = 70;
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
          setTimeout(() => onComplete?.(), 450);
        }, 180);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "#0A0A0A" }}
    >
      {/* Logo */}
      <div className="mb-12 text-center select-none">
        <span className="text-6xl font-black tracking-tight" style={{ color: "#FFFFFF", fontFamily: "'Space Grotesk', sans-serif" }}>
          T.
        </span>
        <p className="mt-3 text-[10px] uppercase tracking-[0.35em] font-mono" style={{ color: "#444444" }}>
          Portfolio
        </p>
      </div>

      {/* Progress track */}
      <div className="w-36 h-px relative overflow-hidden" style={{ background: "#1A1A1A" }}>
        <div
          className="absolute inset-y-0 left-0 transition-all duration-75 ease-out"
          style={{ width: `${progress}%`, background: "#22C55E" }}
        />
      </div>

      {/* Percentage */}
      <p className="mt-4 text-xs tabular-nums font-mono" style={{ color: "#333333" }}>
        {progress}
      </p>
    </div>
  );
};

export default Loader;
