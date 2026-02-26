import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete?: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          onComplete?.();
        }, 500);
      }, 300);
    }
  }, [progress, onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-background ${fadeOut ? 'fade-out' : ''}`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-pulse-slow" />
      
      {/* Loader content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        {/* Logo or Name */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-2 animate-pulse-slow">
            Touseef
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">Loading Portfolio...</p>
        </div>

        {/* Animated Lines Container */}
        <div className="relative w-64 md:w-80 h-24 flex flex-col justify-center gap-3">
          {/* Line 1 */}
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
              }}
            />
          </div>

          {/* Line 2 - Delayed */}
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent via-primary to-accent rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${Math.max(0, progress - 10)}%`,
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
              }}
            />
          </div>

          {/* Line 3 - More Delayed */}
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary/70 via-accent/70 to-primary/70 rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${Math.max(0, progress - 20)}%`,
                boxShadow: '0 0 8px rgba(6, 182, 212, 0.3)'
              }}
            />
          </div>
        </div>

        {/* Progress Percentage */}
        <div className="text-2xl md:text-3xl font-bold text-primary tabular-nums">
          {progress}%
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 md:w-48 md:h-48 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default Loader;
