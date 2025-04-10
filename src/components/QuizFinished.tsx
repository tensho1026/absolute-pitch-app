import { Trophy, Music } from "lucide-react";
import { Button } from "@/components/button";
import Link from "next/link";

export default function QuizFinished({
  score,
  onRetry,
}: {
  score: number;
  onRetry: () => void;
}) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[#111827] text-center relative overflow-hidden'>
      <div className='z-10 max-w-md w-full mx-auto px-6 py-12 rounded-lg bg-[#1e293b]/70 backdrop-blur-sm border border-[#334155] shadow-xl'>
        <div className='flex justify-center mb-6'>
          <div className='p-4 rounded-full bg-[#f59e0b] text-[#111827]'>
            <Trophy className='w-12 h-12' />
          </div>
        </div>

        <h2 className='text-4xl font-bold mb-4 text-[#f59e0b]'>
          🎉 クイズ終了！
        </h2>

        <p className='text-xl mb-8 text-gray-200'>
          あなたのスコアは{" "}
          <span className='text-[#f59e0b] font-bold text-2xl'>{score}</span>{" "}
          点でした！
        </p>

        <div className='flex flex-col gap-4'>
          <Button
            className='bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg text-lg flex items-center justify-center gap-2'
            onClick={onRetry}
          >
            <Music className='w-5 h-5' />
            もう一度チャレンジする
          </Button>

          <Link href='/'>
            <Button
              variant='outline'
              className='border-gray-600 text-black hover:bg-gray-100 hover:text-gray-800 px-6 py-3 rounded-lg'
            >
              ホームに戻る
            </Button>
          </Link>
        </div>
      </div>

      <div className='absolute bottom-20 w-full text-center text-gray-400 italic'>
        Master your musical ear through practice and play
      </div>
    </div>
  );
}
