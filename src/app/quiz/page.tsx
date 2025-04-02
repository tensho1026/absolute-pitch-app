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
  const [correctNumber, setCorrectNumber] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isFinalQuestionAnswered, setIsFinalQuestionAnswered] = useState(false);

  const ADSR = { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.5 };

  const resetQuiz = () => {
    setCurrentQuestion(1);
    setUserAnswer(null);
    setCorrectAnswer(null);
    setCorrectNumber(0);
    setShowAnswer(false);
    setIsQuizFinished(false);
    setIsFinalQuestionAnswered(false);
  };

  const handleAnswer = () => {
    if (!correctAnswer)
      return toast.error("まずは再生ボタンを押してください！");
    if (!userAnswer) return toast.error("鍵盤を押して答えてください！");

    const isCorrect = userAnswer === correctAnswer;
    if (isCorrect) setCorrectNumber((prev) => prev + 1);

    if (currentQuestion === 10) {
      setIsFinalQuestionAnswered(true);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setUserAnswer(null);
    setCorrectAnswer(null);
    setShowAnswer(false);
  };

  const handleNotePlay = (note: string) => {
    setUserAnswer(note);
    setShowAnswer(true);

    if (currentQuestion === 10) {
      const isCorrect = note === correctAnswer;
      const finalScore = isCorrect ? correctNumber + 1 : correctNumber;
      if (isCorrect) setCorrectNumber(finalScore);
      setIsFinalQuestionAnswered(true);
    }
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
    <div className='relative flex flex-col items-center justify-between min-h-screen p-4 bg-gradient-to-b from-slate-50 to-slate-100'>
      <Toaster position='top-center' />
      <div className='absolute top-2 left-12'>
        <Link href='/'>
          <Button
            variant='ghost'
            className='rounded-full hover:bg-gray-100 h-12 w-12 p-0'
          >
            <Home />
          </Button>
        </Link>
      </div>

      <div className='w-full max-w-3xl'>
        <h1 className='text-3xl font-bold text-center mb-8 mt-4'>
          絶対音感クイズ チャレンジモード🔥
        </h1>

        <div className='flex flex-col gap-6 mb-8'>
          <div className='flex items-center justify-between'>
            <Button
              size='lg'
              className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700'
              onClick={async () => {
                if (correctAnswer) {
                  const synth = new Tone.Synth().toDestination();
                  await Tone.start();
                  synth.triggerAttackRelease(correctAnswer, "8n");
                } else {
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
            onClick={
              isFinalQuestionAnswered
                ? () => setIsQuizFinished(true)
                : handleAnswer
            }
          >
            {isFinalQuestionAnswered ? "結果を見る" : "次の問題"}
          </Button>
        </div>
      </div>

      <div className='w-full max-w-4xl mb-16 relative h-48'>
        <div className='flex relative h-full'>
          <QuizPiano onNotePlay={handleNotePlay} adsr={ADSR} />
        </div>
      </div>
    </div>
  );
}
