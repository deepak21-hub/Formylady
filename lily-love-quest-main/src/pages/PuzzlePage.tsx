import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RomanticBackground } from '@/components/FloatingElements';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Puzzle, Sparkles, ArrowLeft } from 'lucide-react';
import { useGameProgress } from '@/hooks/useGameProgress';
import { toast } from 'sonner';
import lilyImage from '@/assets/lily-flower.jpg';

interface PuzzlePiece {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  correctX: number;
  correctY: number;
  placed: boolean;
}

const PUZZLE_SIZE = 400;
const PIECES_PER_ROW = 4;
const PIECE_SIZE = PUZZLE_SIZE / PIECES_PER_ROW;

export const PuzzlePage = () => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [shuffledPieces, setShuffledPieces] = useState<PuzzlePiece[]>([]);
  const [completedPieces, setCompletedPieces] = useState(0);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const navigate = useNavigate();
  const { markPuzzleComplete } = useGameProgress();

  const encouragingMessages = [
    "So close, like our souls 💕",
    "Only love fits perfectly 💖",
    "You're doing amazing! 🌸",
    "Piece by piece, like us 💑",
    "Almost there, my lady! 🦋"
  ];

  // Shuffle function for randomizing piece order
  const shuffleArray = (array: PuzzlePiece[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    // Initialize puzzle pieces
    const initialPieces: PuzzlePiece[] = [];
    for (let row = 0; row < PIECES_PER_ROW; row++) {
      for (let col = 0; col < PIECES_PER_ROW; col++) {
        const id = row * PIECES_PER_ROW + col;
        initialPieces.push({
          id,
          x: Math.random() * 300 + 50, // Random initial position
          y: Math.random() * 200 + 500,
          width: PIECE_SIZE,
          height: PIECE_SIZE,
          correctX: col * PIECE_SIZE,
          correctY: row * PIECE_SIZE,
          placed: false,
        });
      }
    }
    setPieces(initialPieces);
    setShuffledPieces(shuffleArray(initialPieces));
  }, []);

  const handleDragStart = (e: React.DragEvent, pieceId: number) => {
    setDraggedPiece(pieceId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Click to place piece functionality - much easier!
  const handlePieceClick = (pieceId: number) => {
    setPieces(prevPieces => {
      const newPieces = [...prevPieces];
      const piece = newPieces.find(p => p.id === pieceId);
      
      if (piece && !piece.placed) {
        // Auto-place the piece in its correct position
        piece.x = piece.correctX;
        piece.y = piece.correctY;
        piece.placed = true;
        
        const newCompletedCount = newPieces.filter(p => p.placed).length;
        setCompletedPieces(newCompletedCount);
        
        // Show encouraging message
        const message = encouragingMessages[Math.min(newCompletedCount - 1, encouragingMessages.length - 1)];
        toast.success(message);

        // Check if puzzle is complete
        if (newCompletedCount === PIECES_PER_ROW * PIECES_PER_ROW) {
          setTimeout(() => {
            markPuzzleComplete();
            toast.success("Perfect! Just like us, everything fits together beautifully 🌸");
            setTimeout(() => {
              navigate('/finale');
            }, 3000);
          }, 500);
        }
      }
      
      return newPieces;
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedPiece === null) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPieces(prevPieces => {
      const newPieces = [...prevPieces];
      const piece = newPieces.find(p => p.id === draggedPiece);
      
      if (piece) {
        // Check if dropped in correct position (with generous tolerance)
        const tolerance = 80;
        const isCorrectPosition = 
          Math.abs(x - piece.correctX) < tolerance && 
          Math.abs(y - piece.correctY) < tolerance;

        // Check if dropped within puzzle area but wrong position
        const isInPuzzleArea = x >= 0 && x <= PUZZLE_SIZE && y >= 0 && y <= PUZZLE_SIZE;

        if (isCorrectPosition && !piece.placed) {
          piece.x = piece.correctX;
          piece.y = piece.correctY;
          piece.placed = true;
          
          const newCompletedCount = newPieces.filter(p => p.placed).length;
          setCompletedPieces(newCompletedCount);
          
          // Show encouraging message
          const message = encouragingMessages[Math.min(newCompletedCount - 1, encouragingMessages.length - 1)];
          toast.success(message);

          // Check if puzzle is complete
          if (newCompletedCount === PIECES_PER_ROW * PIECES_PER_ROW) {
            setTimeout(() => {
              markPuzzleComplete();
              toast.success("Perfect! Just like us, everything fits together beautifully 🌸");
              setTimeout(() => {
                navigate('/finale');
              }, 3000);
            }, 500);
          }
        } else if (isInPuzzleArea && !isCorrectPosition) {
          // Wrong position but in puzzle area - show motivational message
          const motivationalMessages = [
            "You placed wrong piece, I believe in you, you can do it! 💕",
            "Almost there! Try a different spot, my lady 🌸",
            "Don't give up! You're amazing at this 💖",
            "Close but not quite! I know you can figure it out 🦋",
            "Try again, sweetie! You've got this 💕"
          ];
          const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
          toast.error(randomMessage);
          
          piece.x = x - PIECE_SIZE / 2;
          piece.y = y - PIECE_SIZE / 2;
        } else {
          piece.x = x - PIECE_SIZE / 2;
          piece.y = y - PIECE_SIZE / 2;
        }
      }
      
      return newPieces;
    });

    setDraggedPiece(null);
  };

  const progress = (completedPieces / (PIECES_PER_ROW * PIECES_PER_ROW)) * 100;

  return (
    <RomanticBackground>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/math')}
            className="glass hover:bg-romantic-glow/10"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
        </div>
        <Card className="glass-card max-w-4xl w-full">
          <div className="text-center mb-8">
            <Puzzle className="mx-auto text-romantic-glow mb-4 animate-float" size={64} />
            <h1 className="font-handwriting text-5xl text-gradient mb-4">
              Piece by Piece, Like Us 🧩
            </h1>
            <p className="text-muted-foreground text-lg mb-4">
              Arrange the lily pieces to reveal our beautiful flower
            </p>
            
            {/* Progress bar */}
            <div className="max-w-md mx-auto mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{completedPieces}/{PIECES_PER_ROW * PIECES_PER_ROW}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-romantic-glow to-accent transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
            {/* Puzzle area */}
            <div className="relative">
              <div
                className="relative border-2 border-romantic-glow/30 rounded-lg overflow-hidden glass"
                style={{ width: PUZZLE_SIZE, height: PUZZLE_SIZE }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <img 
                    src={lilyImage} 
                    alt="Lily background" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Grid lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {Array.from({ length: PIECES_PER_ROW + 1 }, (_, i) => (
                    <g key={i}>
                      <line
                        x1={i * PIECE_SIZE}
                        y1={0}
                        x2={i * PIECE_SIZE}
                        y2={PUZZLE_SIZE}
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1"
                      />
                      <line
                        x1={0}
                        y1={i * PIECE_SIZE}
                        x2={PUZZLE_SIZE}
                        y2={i * PIECE_SIZE}
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1"
                      />
                    </g>
                  ))}
                </svg>

                {/* Placed pieces */}
                {pieces.filter(piece => piece.placed).map(piece => (
                  <div
                    key={piece.id}
                    className="absolute pointer-events-none"
                    style={{
                      left: piece.x,
                      top: piece.y,
                      width: piece.width,
                      height: piece.height,
                    }}
                  >
                    <div
                      className="w-full h-full bg-cover bg-no-repeat animate-bloom"
                      style={{
                        backgroundImage: `url(${lilyImage})`,
                        backgroundPosition: `-${piece.correctX}px -${piece.correctY}px`,
                        backgroundSize: `${PUZZLE_SIZE}px ${PUZZLE_SIZE}px`,
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Floating particles around puzzle */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                  <Sparkles
                    key={i}
                    className={`absolute text-romantic-glow/40 animate-float`}
                    size={16}
                    style={{
                      left: `${-10 + (i * 30) % 120}%`,
                      top: `${-5 + (i * 25) % 110}%`,
                      animationDelay: `${i * 1.5}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Piece bank */}
            <div className="w-full lg:w-80">
              <h3 className="font-handwriting text-2xl text-center mb-4 text-romantic-glow">
                Click pieces to place them! 💕
              </h3>
              <p className="text-center text-sm text-muted-foreground mb-4">
                You can also drag them to the puzzle area
              </p>
              <div className="grid grid-cols-2 gap-4 p-4 glass-card min-h-[400px]">
                {shuffledPieces.filter(piece => !piece.placed).map(piece => (
                  <div
                    key={piece.id}
                    className="cursor-pointer rounded-lg overflow-hidden shadow-lg border-2 border-romantic-glow/20"
                    draggable
                    onDragStart={(e) => handleDragStart(e, piece.id)}
                    onClick={() => handlePieceClick(piece.id)}
                    style={{
                      width: piece.width * 0.7,
                      height: piece.height * 0.7,
                    }}
                  >
                    <div
                      className="w-full h-full bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: `url(${lilyImage})`,
                        backgroundPosition: `-${piece.correctX * 0.7}px -${piece.correctY * 0.7}px`,
                        backgroundSize: `${PUZZLE_SIZE * 0.7}px ${PUZZLE_SIZE * 0.7}px`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {completedPieces === PIECES_PER_ROW * PIECES_PER_ROW && (
            <div className="text-center mt-8 animate-bloom">
              <div className="flex items-center justify-center space-x-2 text-romantic-glow mb-4">
                <Heart className="animate-pulse" size={24} />
                <span className="font-handwriting text-2xl">Puzzle Complete!</span>
                <Heart className="animate-pulse" size={24} />
              </div>
              <p className="font-handwriting text-lg text-muted-foreground">
                Preparing your final surprise...
              </p>
            </div>
          )}
        </Card>
      </div>
    </RomanticBackground>
  );
};