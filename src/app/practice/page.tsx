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

export default function PerfectPitchPractice() {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const ADSR = { attack: 0.02, decay: 0.1, sustain: 0.3, release: 0.5 };

  // 音を再生（新規 or 再再生）
  const handlePlayNote = async () => {
    if (correctAnswer) {
      const synth = new Tone.Synth().toDestination();
      await Tone.start();
      synth.triggerAttackRelease(correctAnswer, "8n");
    } else {
      const note = await playRandomNote();
      setCorrectAnswer(note);
    }
  };

  // 次の問題へ（再生してないと警告）
  const handleAnswer = () => {
    if (!correctAnswer)
      return toast.error("まずは再生ボタンを押してください！");
    if (!userAnswer) return toast.error("鍵盤を押して答えてください！");

    setUserAnswer(null);
    setCorrectAnswer(null);
    setShowAnswer(false);
  };

  // 鍵盤を押したときの処理
  const handleNotePlay = (note: string) => {
    if (!correctAnswer) {
      toast.error("まずは再生ボタンを押してください！");
      return;
    }

    setUserAnswer(note);
    setShowAnswer(true);
  };

  return (
    <div className='relative flex flex-col items-center justify-between min-h-screen p-2 bg-gradient-to-b from-slate-50 to-slate-100'>
      <Toaster position='top-center' />

      <div className='absolute top-2 left-12'>
        <Link href='/'>
          <Button variant='ghost' className='rounded-full h-12 w-12 p-0'>
            <Home />
          </Button>
        </Link>
      </div>

      <div className='w-full max-w-3xl'>
        <h1 className='text-3xl font-bold text-center mb-8 mt-4'>
          絶対音感クイズ　練習モード
        </h1>

        <div className='flex flex-col gap-6 mb-8'>
          <div className='flex justify-start'>
            <Button
              size='lg'
              className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700'
              onClick={handlePlayNote}
            >
              <Play className='w-5 h-5' />
              再生
            </Button>
          </div>

          <Card className='w-full'>
            <CardContent className='p-4'>
              <div className='grid grid-cols-2 gap-4 text-center'>
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
              </div>
            </CardContent>
          </Card>

          <Button
            size='lg'
            className='w-full bg-indigo-600 hover:bg-indigo-700'
            onClick={handleAnswer}
          >
            次の問題
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
