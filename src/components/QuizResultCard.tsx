type QuizResultCardProps = {
  userAnswer: string | null;
  correctAnswer: string | null;
  showAnswer: boolean;
  score?: number;
  showScore?: boolean;
};

export default function QuizResultCard({
  userAnswer,
  correctAnswer,
  showAnswer,
  score,
  showScore = true,
}: QuizResultCardProps) {
  return (
    <div
      className={`grid gap-4 text-center ${
        showScore ? "grid-cols-3" : "grid-cols-2"
      }`}
    >
      <div className='flex flex-col'>
        <span className='text-sm text-gray-500'>あなたの答え</span>
        <span className='text-xl font-bold'>{userAnswer || "−"}</span>
      </div>
      <div className='flex flex-col'>
        <span className='text-sm text-gray-500'>正解</span>
        <span className='text-xl font-bold'>
          {showAnswer ? correctAnswer || "−" : "−"}
        </span>
      </div>
      {showScore && (
        <div className='flex flex-col'>
          <span className='text-sm text-gray-500'>結果</span>
          <span className='text-xl font-bold'>{score ?? "−"}</span>
        </div>
      )}
    </div>
  );
}
