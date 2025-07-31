import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RomanticBackground } from '@/components/FloatingElements';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight, Lock } from 'lucide-react';
import { useGameProgress } from '@/hooks/useGameProgress';

const Index = () => {
  const navigate = useNavigate();
  const { progress, canAccess } = useGameProgress();

  // Auto-redirect based on progress
  useEffect(() => {
    if (progress.puzzleCompleted) {
      navigate('/finale');
    } else if (progress.mathCompleted) {
      navigate('/puzzle');
    } else if (progress.quizCompleted) {
      navigate('/math');
    }
  }, [progress, navigate]);

  const stages = [
    {
      id: 'quiz',
      title: 'Love Quest Q&A',
      description: 'Answer questions about us',
      icon: Heart,
      route: '/quiz',
      completed: progress.quizCompleted,
    },
    {
      id: 'math',
      title: 'Math of Love',
      description: 'Solve our romantic riddle',
      icon: Heart,
      route: '/math',
      completed: progress.mathCompleted,
    },
    {
      id: 'puzzle',
      title: 'Lily Puzzle',
      description: 'Complete our beautiful flower',
      icon: Heart,
      route: '/puzzle',
      completed: progress.puzzleCompleted,
    },
    {
      id: 'finale',
      title: 'Our Blooming Love',
      description: 'The final romantic surprise',
      icon: Heart,
      route: '/finale',
      completed: false,
    },
  ] as const;

  return (
    <RomanticBackground>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="glass-card max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="font-handwriting text-6xl text-gradient mb-6 animate-float">
              For You, My Lily 🌸
            </h1>
            <h2 className="font-handwriting text-3xl text-romantic-glow mb-4">
              A Romantic Puzzle Adventure
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Welcome to our special journey, my lady. Complete each puzzle to unlock 
              the next chapter of our story and discover the beautiful surprise waiting for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {stages.map((stage, index) => {
              const canAccessStage = canAccess(stage.id as any);
              const Icon = stage.icon;
              
              return (
                <Card key={stage.id} className={`glass-card transition-all duration-300 ${
                  canAccessStage 
                    ? 'hover:scale-105 cursor-pointer border-romantic-glow/30' 
                    : 'opacity-50 cursor-not-allowed'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-full ${
                      stage.completed 
                        ? 'bg-green-100 text-green-600' 
                        : canAccessStage
                        ? 'bg-romantic-glow/20 text-romantic-glow'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {stage.completed ? (
                        <Heart className="animate-pulse" size={24} />
                      ) : canAccessStage ? (
                        <Icon size={24} />
                      ) : (
                        <Lock size={24} />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-handwriting text-xl mb-1">
                        {stage.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {stage.description}
                      </p>
                      {stage.completed && (
                        <p className="text-xs text-green-600 mt-1">
                          ✓ Completed
                        </p>
                      )}
                    </div>

                    {canAccessStage && (
                      <Button
                        onClick={() => navigate(stage.route)}
                        variant="ghost"
                        size="sm"
                        className="hover:bg-romantic-glow/10"
                      >
                        {stage.completed ? 'Revisit' : 'Start'}
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <div className="glass-card inline-block p-6">
              <p className="font-handwriting text-lg text-romantic-glow mb-2">
                "Every puzzle solved brings us closer together"
              </p>
              <p className="text-sm text-muted-foreground">
                Progress is saved automatically
              </p>
            </div>
          </div>
        </Card>
      </div>
    </RomanticBackground>
  );
};

export default Index;
