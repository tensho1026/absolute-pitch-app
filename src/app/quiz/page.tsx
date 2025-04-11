"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Play } from "lucide-react";
import QuizPiano from "@/components/quizPiano";
import { playRandomNote } from "@/features/playRandomNote";
import Link from "next/link";
import * as Tone from "tone";
import toast, { Toaster } from "react-hot-toast";
import { getUserScore } from "@/features/getScore";
import { updateUserScore } from "@/features/updateScore";
import QuizHelpModal from "@/components/quizModal";
import { useUser } from "@clerk/nextjs";
import { saveNoteStat } from "@/features/saveNoteStat";
import QuizResultCard from "@/components/QuizResultCard";
import QuizFinished from "@/components/QuizFinished";

export default function PerfectPitchQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [correctNumber, setCorrectNumber] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isFinalQuestionAnswered, setIsFinalQuestionAnswered] = useState(false);

  const ADSR = { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.5 };

  const { user } = useUser();

  useEffect(() => {
    if (isQuizFinished) {
      (async () => {
        const previousScore = await getUserScore();

        // 初プレイ（前回スコアが null） or 新記録の場合に保存を試みる
        if (previousScore === null || correctNumber > previousScore) {
          const success = await updateUserScore(correctNumber);

          if (success) {
            toast.success("新記録！スコアを更新しました 🎉");
          } else {
            toast.error("スコアの更新に失敗しました。");
          }
        } else {
          // 記録更新なし
          toast("今回のスコアは更新されませんでした 👀");
        }
      })();
    }
  }, [isQuizFinished]);

  const resetQuiz = () => {
    setCurrentQuestion(1);
    setUserAnswer(null);
    setCorrectAnswer(null);
    setCorrectNumber(0);
    setShowAnswer(false);
    setIsQuizFinished(false);
    setIsFinalQuestionAnswered(false);
  };

  const handleAnswer = async () => {
    if (!correctAnswer)
      return toast.error("まずは再生ボタンを押してください！");
    if (!userAnswer) return toast.error("鍵盤を押して答えてください！");
    if (!user) return toast.error("ユーザー情報が取得できません");

    const isAnswerCorrect = userAnswer === correctAnswer;

    // 出題された音階に対して正誤を記録
    await saveNoteStat({
      userId: user.id,
      note: correctAnswer,
      isCorrect: isAnswerCorrect,
    });

    if (isAnswerCorrect) {
      setCorrectNumber((prev) => prev + 1);
    }

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
    if (!correctAnswer) {
      toast.error("まずは再生ボタンを押してください！");
      return;
    }

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
    return <QuizFinished score={correctNumber} onRetry={resetQuiz} />;
  }

  return (
    <div className='relative flex flex-col items-center justify-between min-h-screen p-4 bg-gradient-to-b from-slate-50 to-slate-100'>
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

      <div className='absolute top-2 right-12'>
        <QuizHelpModal />
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
              <QuizResultCard
                userAnswer={userAnswer}
                correctAnswer={correctAnswer}
                showAnswer={showAnswer}
                score={correctNumber}
              />
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
