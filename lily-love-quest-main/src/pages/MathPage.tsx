import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RomanticBackground } from '@/components/FloatingElements';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, ArrowRight, Calculator, ArrowLeft } from 'lucide-react';
import { useGameProgress } from '@/hooks/useGameProgress';
import { toast } from 'sonner';

export const MathPage = () => {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const { markMathComplete } = useGameProgress();

  const correctAnswer = 143; // 13 × 11 = 143

  const checkAnswer = () => {
    const userAnswer = parseInt(answer);
    
    if (userAnswer === correctAnswer) {
      setIsCorrect(true);
      markMathComplete();
      toast.success("Smart and beautiful – my favorite combo 💘");
      setTimeout(() => {
        navigate('/puzzle');
      }, 2500);
    } else {
      toast.error("Almost there! Try again, my lady 💖");
      setShowHint(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  return (
    <RomanticBackground>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/quiz')}
            className="glass hover:bg-romantic-glow/10"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
        </div>
        <Card className="glass-card max-w-2xl w-full">
          <div className="text-center mb-8">
            <Calculator className="mx-auto text-romantic-glow mb-4" size={64} />
            <h1 className="font-handwriting text-5xl text-gradient mb-4">
              You + Me = Infinite Love
            </h1>
            <h2 className="font-handwriting text-3xl mb-6">
              (And One Math Riddle) 🧮
            </h2>
            <p className="text-muted-foreground text-lg">
              Solve this to move forward on our journey
            </p>
          </div>

          <div className="space-y-8">
            {/* Floating numbers background effect */}
            <div className="relative py-12">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {['∞', '♥', '+', '=', '💕'].map((symbol, index) => (
                  <div
                    key={index}
                    className="absolute text-romantic-glow/20 text-2xl"
                    style={{
                      left: `${20 + (index * 15) % 70}%`,
                      top: `${10 + (index * 20) % 80}%`,
                      animationDelay: `${index * 1.2}s`,
                    }}
                  >
                    {symbol}
                  </div>
                ))}
              </div>

              <div className="relative z-10 text-center">
                <div className="glass-card inline-block p-8 hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-handwriting mb-6 text-romantic-glow">
                    13 × 11 = ?
                  </div>
                  
                  <div className="space-y-4">
                    <Input
                      type="number"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter your answer..."
                      className={`text-center text-xl font-semibold glass transition-all duration-300 ${
                        isCorrect 
                          ? 'border-green-400 bg-green-50/20 text-green-700' 
                          : 'focus:border-romantic-glow focus:ring-romantic-glow/20'
                      }`}
                      disabled={isCorrect}
                    />

                    {showHint && !isCorrect && (
                      <p className="text-romantic-glow/80 text-sm">
                        💡 Hint: Think about the number that represents "I love you" in numbers...
                      </p>
                    )}

                    {isCorrect && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-2 text-green-600">
                          <Heart size={20} />
                          <span className="font-handwriting text-xl">Perfect!</span>
                          <Heart size={20} />
                        </div>
                        <p className="text-romantic-glow font-handwriting text-lg">
                          Smart and beautiful – my favorite combo 💘
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {!isCorrect && (
              <div className="text-center">
                <Button
                  onClick={checkAnswer}
                  className="btn-romantic hover:scale-105 transition-transform duration-300"
                  disabled={!answer.trim()}
                >
                  Check Answer
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
            )}

            {isCorrect && (
              <div className="text-center">
                <div className="glass-card inline-block p-6">
                  <p className="font-handwriting text-xl text-romantic-glow mb-4">
                    Moving to the next chapter of our story...
                  </p>
                  <div className="flex justify-center space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-romantic-glow rounded-full"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </RomanticBackground>
  );
};