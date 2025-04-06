"use client";

import { useState } from "react";
import {
  HelpCircle,
  BrainCircuit,
  Timer,
  Medal,
  BarChart3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function QuizHelpModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='absolute top-4 right-4 z-10'
          aria-label='使い方を表示'
        >
          <HelpCircle className='h-15 w-15' />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[90vw] max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold text-center text-primary'>
            Challengeページの使い方
          </DialogTitle>
          <div className='h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-2 rounded-full'></div>
        </DialogHeader>

        <div className='grid gap-6 py-6'>
          <section className='space-y-3'>
            <div className='flex items-center gap-2'>
              <BrainCircuit className='h-5 w-5 text-primary' />
              <h3 className='text-lg font-semibold'>クイズの概要</h3>
            </div>
            <ul className='list-none pl-5 space-y-3'>
              {[
                "全10問の音感クイズに挑戦できます。",
                "問題に対して正しい音を選択しましょう。",
                "練習の成果を生かして高得点を目指しましょう！",
              ].map((item, i) => (
                <li key={i} className='flex items-start gap-2'>
                  <span className='inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-medium'>
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className='h-px w-full bg-border'></div>

          <section className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Timer className='h-5 w-5 text-primary' />
              <h3 className='text-lg font-semibold'>採点方法</h3>
            </div>
            <p className='text-muted-foreground'>
              クイズの採点はシンプルです。
            </p>
            <div className='bg-muted/50 rounded-lg p-4 space-y-2'>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-green-600'></div>
                <h4 className='font-semibold'>1問1点の配点</h4>
              </div>
              <p className='text-sm text-muted-foreground'>
                各問題に正解すると1点が加算されます。全10問で最高10点を目指しましょう。
              </p>
              <div className='flex items-center gap-2 mt-3'>
                <div className='h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600'></div>
                <h4 className='font-semibold'>全問正解を目指そう</h4>
              </div>
              <p className='text-sm text-muted-foreground'>
                練習の成果を発揮して、10点満点を目指しましょう！
              </p>
            </div>
          </section>

          <div className='h-px w-full bg-border'></div>

          <section className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Medal className='h-5 w-5 text-primary' />
              <h3 className='text-lg font-semibold'>ランキングシステム</h3>
            </div>
            <div className='bg-primary/5 border border-primary/10 rounded-lg p-4'>
              <p className='mb-2'>
                チャレンジの結果は自動的に記録され、自分の記録はrankingページで確認できます。
              </p>
              <div className='flex flex-col gap-3 mt-4'>
                <div className='flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm'>
                  <div className='flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100 text-yellow-600 font-bold'>
                    1
                  </div>
                  <div className='flex-1'>
                    <p className='font-medium'>ゴールドランク</p>
                    <p className='text-sm text-muted-foreground'>
                      9〜10点の優秀な成績
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm'>
                  <div className='flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-600 font-bold'>
                    2
                  </div>
                  <div className='flex-1'>
                    <p className='font-medium'>シルバーランク</p>
                    <p className='text-sm text-muted-foreground'>
                      7〜8点の良い成績
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm'>
                  <div className='flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-600 font-bold'>
                    3
                  </div>
                  <div className='flex-1'>
                    <p className='font-medium'>ブロンズランク</p>
                    <p className='text-sm text-muted-foreground'>
                      5〜6点の平均的な成績
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className='h-px w-full bg-border'></div>

          <section className='space-y-3'>
            <div className='flex items-center gap-2'>
              <BarChart3 className='h-5 w-5 text-primary' />
              <h3 className='text-lg font-semibold'>成長の記録</h3>
            </div>
            <div className='bg-primary/5 border border-primary/10 rounded-lg p-4 text-center'>
              <p className='mb-2'>練習の成果を生かして記録を出そう！</p>
              <p className='text-primary font-medium'>
                全10問、あなたの音感を試す時が来ました。10点満点を目指して頑張りましょう！
              </p>
              <p className='text-sm text-muted-foreground mt-3'>
                チャレンジを繰り返すことで、音感が向上し、正解数も増えていきます。
                自分の成長をrankingページで確認しながら、継続的に挑戦しましょう。
              </p>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
