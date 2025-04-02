"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Play } from "lucide-react";
import QuizPiano from "@/components/quizPiano";
import { playRandomNote } from "@/features/playRandomNote";
import Link from "next/link";
import * as Tone from "tone";
import toast, { Toaster } from "react-hot-toast";

export default function PerfectPitchQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [attack, setAttack] = useState(0.02);
  const [decay, setDecay] = useState(0.1);
  const [sustain, setSustain] = useState(0.3);
  const [release, setRelease] = useState(0.5);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctNumber, setCorrectNumber] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const endQuiz = (finalScore: number) => {
    toast.success(`お疲れさまでした　あなたのスコアは${finalScore}点です！！`);
  };

  const resetQuiz = () => {
    setCurrentQuestion(1);
    setUserAnswer(null);
    setCorrectAnswer(null);
    setIsCorrect(null);
    setCorrectNumber(0); // ← スコアもここでリセット！
    setShowAnswer(false);
    setIsQuizFinished(false);
  };

  if (isQuizFinished) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-center'>
        <Toaster position='top-center' />
        <h2 className='text-3xl font-bold mb-4'>🎉 クイズ終了！</h2>
        <p className='text-xl mb-6'>
          あなたのスコアは {correctNumber} 点でした！
        </p>
        <Button
          className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded'
          onClick={resetQuiz}
        >
          もう一度チャレンジする
        </Button>
      </div>
    );
  }

  return (
    <div className='relative flex flex-col items-center justify-between min-h-screen p-4 bg-gradient-to-b from-slate-50 to-slate-100  '>
      <Toaster position='top-center' />
      <div className='absolute top-2 left-12  '>
        <Link href='/'>
          <Button
            variant='ghost'
            className='rounded-full hover:bg-gray-100  h-12 w-12 p-0'
          >
            <Home className='' />
          </Button>
        </Link>
      </div>
      <div className='w-full max-w-3xl'>
        <h1 className='text-3xl font-bold text-center mb-8 mt-4'>
          絶対音感クイズ チャレンジモード🔥
        </h1>

        {/* Top controls section */}
        <div className='flex flex-col gap-6 mb-8'>
          {/* Play button and score */}
          <div className='flex items-center justify-between'>
            <Button
              size='lg'
              className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700'
              onClick={async () => {
                if (correctAnswer) {
                  // 既に選ばれている音がある → それを再生するだけ
                  const synth = new Tone.Synth().toDestination();
                  await Tone.start();
                  synth.triggerAttackRelease(correctAnswer, "8n");
                  console.log("Replay:", correctAnswer);
                } else {
                  // 初回 or 次の問題後 → 新しい音をランダムで出す
                  const note = await playRandomNote();
                  setCorrectAnswer(note);
                }
              }}
            >
              <Play className='w-5 h-5' />
              <span>再生</span>
            </Button>

            <div className='text-lg font-medium'>
              問題: <span className='font-bold'>{currentQuestion}</span> / 10
            </div>
          </div>

          {/* Result display */}
          <Card className='w-full'>
            <CardContent className='p-4'>
              <div className='grid grid-cols-3 gap-4 text-center'>
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
                <div className='flex flex-col'>
                  <span className='text-sm text-gray-500'>結果</span>
                  {correctNumber}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            size='lg'
            className='w-full bg-indigo-600 hover:bg-indigo-700'
            onClick={() => {
              // 再生ボタンが押されていない＝correctAnswerがnull
              if (!correctAnswer) {
                toast.error("まずは再生ボタンを押してください！");
                return;
              }

              // ユーザーが答えてない
              if (!userAnswer) {
                toast.error("鍵盤を押して答えてください！");
                return;
              }

              // 正解処理
              if (userAnswer === correctAnswer) {
                setCorrectNumber((prev) => prev + 1);
              }

              // クイズ終了
              if (currentQuestion === 10) {
                const finalScore =
                  userAnswer === correctAnswer
                    ? correctNumber + 1
                    : correctNumber;
                endQuiz(finalScore);
                setIsQuizFinished(true);

                return;
              }

              // 次の問題へ
              setCurrentQuestion((prev) => prev + 1);
              setUserAnswer(null);
              setCorrectAnswer(null);
              setShowAnswer(false);
            }}
          >
            次の問題
          </Button>
        </div>
      </div>

      {/* Piano keyboard at the bottom */}
      <div className='w-full max-w-4xl mb-16 relative h-48'>
        <div className='flex relative h-full'>
          <QuizPiano
            onNotePlay={(note) => {
              console.log("押した音:", note);
              setUserAnswer(note);
              setShowAnswer(true);

              if (currentQuestion === 10) {
                const isAnswerCorrect = note === correctAnswer;
                const finalScore = isAnswerCorrect
                  ? correctNumber + 1
                  : correctNumber;

                if (isAnswerCorrect) {
                  setCorrectNumber(finalScore); // UI表示用に更新
                }

                endQuiz(finalScore); // 最新のスコアをトーストに渡す

                // 状態リセット（任意：次のステップでリトライボタン追加可）
                setCurrentQuestion(0);
                setUserAnswer("");
                setShowAnswer(false);
                setCorrectAnswer("");
              }
            }}
            adsr={{ attack, decay, sustain, release }}
          />
        </div>
      </div>
    </div>
  );
}
