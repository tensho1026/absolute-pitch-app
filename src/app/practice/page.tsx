"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";
import QuizPiano from "@/components/quizPiano";
import { playRandomNote } from "@/features/playRandomNote";
import Link from "next/link";
import * as Tone from "tone";

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

  return (
    <div className='relative flex flex-col items-center justify-between min-h-screen p-2 bg-gradient-to-b from-slate-50 to-slate-100 '>
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
          絶対音感クイズ　練習モード
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
              再生
            </Button>
          </div>

          {/* Result display */}
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
            onClick={() => {
              setCurrentQuestion((prev) => prev + 1);
              setUserAnswer(null);
              setCorrectAnswer(null); // ← 正解の音をクリア！
              setIsCorrect(null);
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
            // onNotePlay={setCurrentNote}
            onNotePlay={(note) => {
              console.log("押した音:", note);
              setUserAnswer(note);
              setShowAnswer(true); // ← 正解の表示フラグをオン！
            }}
            adsr={{ attack, decay, sustain, release }}
          />
        </div>
      </div>
    </div>
  );
}
