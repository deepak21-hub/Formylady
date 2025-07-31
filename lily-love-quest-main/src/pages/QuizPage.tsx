import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RomanticBackground } from '@/components/FloatingElements';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import { useGameProgress } from '@/hooks/useGameProgress';
import { toast } from 'sonner';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  {
    question: "when did we first talk for hours and fell asleep ?",
    options: ["During morning on whatsapp", "At night, talking on instagram", "On pinterest chat"],
    correct: 1
  },
  {
    question: "What's my favorite thing about you?",
    options: ["Your beautiful smile", "Your kind heart", "Everything about you"],
    correct: 2
  },
  {
    question: "What makes our love special?",
    options: ["We complete each other", "We laugh together", "All of the above"],
    correct: 2
  }
];

export const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const { markQuizComplete } = useGameProgress();

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 800);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 800);
    }
  };

  const checkResults = () => {
    const allCorrect = selectedAnswers.every((answer, index) => 
      answer === questions[index].correct
    );

    if (allCorrect) {
      markQuizComplete();
      toast.success("Perfect! You know me so well 💕");
      setTimeout(() => {
        navigate('/math');
      }, 2000);
    } else {
      toast.error("Almost there! Let's try again 💖");
      setCurrentQuestion(0);
      setSelectedAnswers([]);
      setShowResults(false);
    }
  };

  const isAnswerCorrect = (questionIndex: number, answerIndex: number) => {
    return answerIndex === questions[questionIndex].correct;
  };

  return (
    <RomanticBackground>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="glass hover:bg-romantic-glow/10 hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
        </div>
        <Card className="glass-card max-w-2xl w-full">
          <div className="text-center mb-8 relative">
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {['💕', '✨', '💖', '🌸', '💫'].map((emoji, index) => (
                <div
                  key={index}
                  className="absolute text-romantic-glow/20 text-2xl animate-float"
                  style={{
                    left: `${10 + (index * 20) % 80}%`,
                    top: `${20 + (index * 15) % 60}%`,
                    animationDelay: `${index * 0.3}s`,
                    animationIterationCount: '1',
                    animationDuration: '2s',
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>

            <h1 className="font-handwriting text-5xl text-gradient mb-4 animate-float" style={{ animationIterationCount: '1', animationDuration: '1.5s' }}>
              Let's Begin Our Little Love Quest... 💕
            </h1>
            <p className="text-muted-foreground text-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Answer these questions about us to continue our journey
            </p>
          </div>

          {!showResults ? (
            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                  <div className="flex space-x-2">
                    {questions.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 animate-pulse ${
                          index <= currentQuestion 
                            ? 'bg-romantic-glow' 
                            : 'bg-muted'
                        }`}
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          animationIterationCount: '1',
                          animationDuration: '1s',
                        }}
                      />
                    ))}
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="font-handwriting text-3xl mb-6 text-center text-card-foreground bg-white/80 p-4 rounded-lg shadow-sm animate-pulse" style={{ animationDuration: '3s' }}>
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`w-full p-6 text-left justify-start bg-white/90 border-2 hover:bg-romantic-glow/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-romantic-glow text-card-foreground font-medium animate-pulse ${
                        selectedAnswers[currentQuestion] !== undefined ? 'pointer-events-none opacity-75' : ''
                      }`}
                      style={{ 
                        animationDuration: `${3.5 + index * 0.5}s` 
                      }}
                      onClick={() => handleAnswer(index)}
                    >
                      <span className="mr-3 text-romantic-glow font-bold">
                        {String.fromCharCode(65 + index)})
                      </span>
                      {option}
                      {selectedAnswers[currentQuestion] === index && (
                        <CheckCircle className="ml-auto text-romantic-glow" size={20} />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="animate-fade-in">
                <Heart className="mx-auto text-romantic-glow mb-4" size={64} />
                <h2 className="font-handwriting text-3xl mb-4">
                  Let's see how you did...
                </h2>
              </div>

              <div className="space-y-4">
                {questions.map((question, qIndex) => (
                  <div key={qIndex} className="text-left glass-card hover:scale-105 transition-all duration-300">
                    <p className="font-medium mb-2">{question.question}</p>
                    <div className="space-y-1">
                      {question.options.map((option, aIndex) => (
                        <div
                          key={aIndex}
                          className={`p-2 rounded ${
                            isAnswerCorrect(qIndex, aIndex)
                              ? 'bg-green-100 text-green-800'
                              : selectedAnswers[qIndex] === aIndex
                              ? 'bg-red-100 text-red-800'
                              : ''
                          }`}
                        >
                          {String.fromCharCode(65 + aIndex)}) {option}
                          {isAnswerCorrect(qIndex, aIndex) && ' ✓'}
                          {selectedAnswers[qIndex] === aIndex && !isAnswerCorrect(qIndex, aIndex) && ' ✗'}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={checkResults}
                className="btn-romantic hover:scale-105 transition-all duration-300"
              >
                Continue Our Journey
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </RomanticBackground>
  );
};