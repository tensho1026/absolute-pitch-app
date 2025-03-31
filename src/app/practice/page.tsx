"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Play } from "lucide-react";
import Piano from "@/components/Piano";
import PianoKeyboard from "@/components/Piano";
import QuizPiano from "@/components/quizPiano";
import { playRandomNote } from "@/features/playRandomNote";
import Link from "next/link";

export default function PerfectPitchQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [currentSong, setCurrentSong] = useState("twinkle");
  const [attack, setAttack] = useState(0.02);
  const [decay, setDecay] = useState(0.1);
  const [sustain, setSustain] = useState(0.3);
  const [release, setRelease] = useState(0.5);
  const [currentNote, setCurrentNote] = useState<string | null>(null);

  // Piano keys
  const whiteKeys = ["C", "D", "E", "F", "G", "A", "B"];
  const blackKeys = ["C#", "D#", "F#", "G#", "A#"];

  return (
    <div className='relative flex flex-col items-center justify-between min-h-screen p-4 bg-gradient-to-b from-slate-50 to-slate-100 '>
      <div className='absolute top-5 left-3 p-4'>
        <Link href='/'>
          <Button
            variant='ghost'
            size='icon'
            className='rounded-full hover:bg-gray-100'
          >
            <Home className='h-8 w-8' />
            <span className='sr-only'>Home</span>
          </Button>
        </Link>
      </div>
      <div className='w-full max-w-3xl'>
        <h1 className='text-3xl font-bold text-center mb-8 mt-4'>
          絶対音感クイズ
        </h1>

        {/* Top controls section */}
        <div className='flex flex-col gap-6 mb-8'>
          {/* Play button and score */}
          <div className='flex items-center justify-between'>
            <Button
              size='lg'
              className='flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700'
              onClick={playRandomNote}
            >
              <Play className='w-5 h-5' />
              <span>再生</span>
            </Button>

            <div className='text-lg font-medium'>
              問題: <span className='font-bold'>{currentQuestion}</span> / 10
              &nbsp;&nbsp; 正解:{" "}
              <span className='font-bold text-green-600'>{correctAnswers}</span>
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
                    {correctAnswer || "−"}
                  </span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-sm text-gray-500'>結果</span>
                  {isCorrect === null ? (
                    <span className='text-xl font-bold'>−</span>
                  ) : isCorrect ? (
                    <span className='text-xl font-bold text-green-600'>○</span>
                  ) : (
                    <span className='text-xl font-bold text-red-600'>×</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next button */}
          <Button
            size='lg'
            className='w-full bg-indigo-600 hover:bg-indigo-700'
          >
            次の問題
          </Button>
        </div>
      </div>

      {/* Piano keyboard at the bottom */}
      <div className='w-full max-w-4xl mb-16 relative h-48'>
        <div className='flex relative h-full'>
          <QuizPiano
            onNotePlay={setCurrentNote}
            adsr={{ attack, decay, sustain, release }}
          />
        </div>
      </div>
    </div>
  );
}
