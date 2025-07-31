import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RomanticBackground } from '@/components/FloatingElements';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, RotateCcw, ArrowLeft } from 'lucide-react';
import { useGameProgress } from '@/hooks/useGameProgress';
import lilyImage from '@/assets/lily-flower.jpg';

export const FinalePage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showLoveNote, setShowLoveNote] = useState(false);
  const { resetProgress } = useGameProgress();
  const navigate = useNavigate();

  const messages = [
    "Like this Nicole, your love makes me bloom.",
    "Every piece, every step you took here,",
    "is a mirror of how you complete me. 🌸🦋"
  ];

  useEffect(() => {
    // Start showing messages after a delay
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showMessage && messageIndex < messages.length) {
      const timer = setTimeout(() => {
        setMessageIndex(prev => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showMessage, messageIndex, messages.length]);

  const handleShowLoveNote = () => {
    setShowLoveNote(true);
  };

  const handlePlayAgain = () => {
    resetProgress();
    window.location.href = '/';
  };

  return (
    <RomanticBackground>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/puzzle')}
            className="glass hover:bg-romantic-glow/10"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
        </div>
        <Card className="glass-card max-w-4xl w-full text-center">
          <div className="mb-8">
            <h1 className="font-handwriting text-5xl text-gradient mb-6 animate-float">
              You Did It, My Blooming Star 🌟
            </h1>
          </div>

          {/* Blooming lily with butterfly */}
          <div className="relative mb-12">
            <div className="relative mx-auto w-80 h-80 rounded-full overflow-hidden animate-bloom">
              <img 
                src={lilyImage}
                alt="Blooming lily"
                className="w-full h-full object-cover"
              />
              
              {/* Butterfly animation */}
              <div className="absolute -top-8 -right-8">
                <div className="text-6xl animate-butterfly">🦋</div>
              </div>
              
              {/* Floating petals */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-romantic-glow/60 animate-float text-2xl"
                    style={{
                      left: `${10 + (i * 15) % 80}%`,
                      top: `${20 + (i * 20) % 60}%`,
                      animationDelay: `${i * 1.5}s`,
                      animationDuration: `${4 + (i % 2) * 2}s`,
                    }}
                  >
                    🌸
                  </div>
                ))}
              </div>
            </div>

            {/* Glass reflection effect */}
            <div className="absolute inset-0 mx-auto w-80 h-80 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
          </div>

          {/* Animated messages */}
          {showMessage && (
            <div className="space-y-6 mb-12">
              {messages.slice(0, messageIndex + 1).map((message, index) => (
                <p
                  key={index}
                  className="font-handwriting text-2xl text-romantic-glow animate-bloom"
                  style={{
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  {message}
                </p>
              ))}
            </div>
          )}

          {/* Loading quote */}
          {messageIndex >= messages.length && (
            <div className="space-y-8 animate-bloom">
              <div className="glass-card max-w-2xl mx-auto p-8">
                <p className="font-handwriting text-xl text-muted-foreground italic mb-4">
                  "You've solved the puzzles of this game...
                </p>
                <p className="font-handwriting text-xl text-muted-foreground italic">
                  just like you've solved the puzzle of my heart."
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={handleShowLoveNote}
                  className="btn-romantic"
                >
                  <Heart className="mr-2" size={20} />
                  Click to reveal a special note from me
                </Button>

                <Button
                  onClick={handlePlayAgain}
                  variant="outline"
                  className="glass hover:bg-romantic-glow/10"
                >
                  <RotateCcw className="mr-2" size={20} />
                  Play Again
                </Button>
              </div>
            </div>
          )}

          {/* Love note modal */}
          {showLoveNote && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card className="glass-card max-w-2xl w-full animate-bloom">
                <div className="text-center space-y-6">
                  <h2 className="font-handwriting text-4xl text-gradient">
                    Letter to Lady 💕
                  </h2>
                  
                  <div className="space-y-4 text-left">
                    <p className="font-handwriting text-lg leading-relaxed">
                      My Dearest Nicole,
                    </p>
                    <p className="leading-relaxed">
                      Every day with you feels like solving the most beautiful puzzle. 
                      Each moment we share, each laugh we have, each dream we build 
                      together - they're all perfect pieces that make our love story complete.
                    </p>
                    <p className="leading-relaxed">
                      Just like you solved these puzzles with patience and love, 
                      you've helped me discover parts of myself I never knew existed. 
                      You make everything brighter, more beautiful, more meaningful.
                    </p>
                    <p className="leading-relaxed">
                      Thank you for being my person, my best friend, my everything. 
                      I love you more than all the stars in the sky and all the 
                      flowers in all the gardens of the world.
                    </p>
                    <p className="font-handwriting text-lg text-romantic-glow text-right">
                      Forever yours,<br />
                      Deo 💖
                    </p>
                  </div>

                  <Button
                    onClick={() => setShowLoveNote(false)}
                    className="btn-romantic"
                  >
                    Close
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </Card>
      </div>
    </RomanticBackground>
  );
};