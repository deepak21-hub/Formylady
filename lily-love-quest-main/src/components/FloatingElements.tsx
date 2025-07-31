import { Heart, Sparkles } from "lucide-react";

export const FloatingHearts = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <Heart
          key={i}
          className={`absolute text-romantic-glow opacity-20 animate-heart-float`}
          size={20 + (i % 3) * 10}
          style={{
            left: `${10 + (i * 15) % 80}%`,
            top: `${20 + (i * 20) % 60}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${8 + (i % 3) * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export const FloatingSparkles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <Sparkles
          key={i}
          className={`absolute text-accent opacity-30 animate-sparkle`}
          size={12 + (i % 2) * 6}
          style={{
            left: `${5 + (i * 12) % 90}%`,
            top: `${10 + (i * 15) % 80}%`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${3 + (i % 2)}s`,
          }}
        />
      ))}
    </div>
  );
};

export const RomanticBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-romantic-pink/30 via-romantic-lavender/20 to-romantic-white/40"></div>
      <FloatingHearts />
      <FloatingSparkles />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};