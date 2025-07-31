import { useState, useEffect } from 'react';

type GameStage = 'quiz' | 'math' | 'puzzle' | 'finale';

interface GameProgress {
  quizCompleted: boolean;
  mathCompleted: boolean;
  puzzleCompleted: boolean;
  currentStage: GameStage;
}

export const useGameProgress = () => {
  const [progress, setProgress] = useState<GameProgress>({
    quizCompleted: false,
    mathCompleted: false,
    puzzleCompleted: false,
    currentStage: 'quiz'
  });

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('romanticGameProgress');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProgress(parsed);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('romanticGameProgress', JSON.stringify(progress));
  }, [progress]);

  const markQuizComplete = () => {
    setProgress(prev => ({
      ...prev,
      quizCompleted: true,
      currentStage: 'math'
    }));
  };

  const markMathComplete = () => {
    setProgress(prev => ({
      ...prev,
      mathCompleted: true,
      currentStage: 'puzzle'
    }));
  };

  const markPuzzleComplete = () => {
    setProgress(prev => ({
      ...prev,
      puzzleCompleted: true,
      currentStage: 'finale'
    }));
  };

  const resetProgress = () => {
    setProgress({
      quizCompleted: false,
      mathCompleted: false,
      puzzleCompleted: false,
      currentStage: 'quiz'
    });
    localStorage.removeItem('romanticGameProgress');
  };

  const canAccess = (stage: GameStage): boolean => {
    switch (stage) {
      case 'quiz': return true;
      case 'math': return progress.quizCompleted;
      case 'puzzle': return progress.mathCompleted;
      case 'finale': return progress.puzzleCompleted;
      default: return false;
    }
  };

  return {
    progress,
    markQuizComplete,
    markMathComplete,
    markPuzzleComplete,
    resetProgress,
    canAccess
  };
};