"use client";

import { useState } from "react";
import { HelpCircle, Music, Play, Sliders } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import KeyboardMap from "./keyboard-map";

export default function PianoHelpModal() {
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
            ピアノページの使い方
          </DialogTitle>
          <div className='h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-2 rounded-full'></div>
        </DialogHeader>

        <div className='grid gap-6 py-6'>
          <section className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Play className='h-5 w-5 text-primary' />
              <h3 className='text-lg font-semibold'>使い方</h3>
            </div>
            <ul className='list-none pl-5 space-y-3'>
              {[
                "鍵盤をクリックすると音が鳴ります。",
                "楽譜に表示された音を順に演奏して曲を完成させましょう。",
                "キーボード操作でも音を鳴らすことができます。",
                "右側のサウンドコントロールで音質を調整できます。",
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
              <Sliders className='h-5 w-5 text-primary' />
              <h3 className='text-lg font-semibold'>ADSRとは？</h3>
            </div>
            <p className='text-muted-foreground'>
              ADSRは音の特性を表すパラメータで、以下の4つの要素から成り立っています。
            </p>
            <div className='grid grid-cols-2 gap-4 mt-2'>
              {[
                {
                  title: "Attack",
                  desc: "音が鳴り始める速度を調整します。",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  title: "Decay",
                  desc: "音がピークから減衰する速度を調整します。",
                  color: "from-indigo-500 to-indigo-600",
                },
                {
                  title: "Sustain",
                  desc: "音が保持される強さを調整します。",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  title: "Release",
                  desc: "鍵盤を離した後に音が消えるまでの速度を調整します。",
                  color: "from-pink-500 to-pink-600",
                },
              ].map((item, i) => (
                <div key={i} className='bg-muted/50 rounded-lg p-3 space-y-1'>
                  <div className='flex items-center gap-2'>
                    <div
                      className={`h-2 w-2 rounded-full bg-gradient-to-r ${item.color}`}
                    ></div>
                    <h4 className='font-semibold'>{item.title}</h4>
                  </div>
                  <p className='text-sm text-muted-foreground'>{item.desc}</p>
                </div>
              ))}
            </div>
            <p className='text-sm text-muted-foreground mt-2'>
              ADSRを調整することで、音のアタック感や余韻を変えることができ、自分好みの音作りが可能です。
            </p>
          </section>

          <div className='h-px w-full bg-border'></div>

          <main className='flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50'>
            <h1 className='text-3xl font-bold mb-8 text-center'>
              バーチャルピアノキーボード
            </h1>
            <p className='text-lg mb-8 text-center max-w-2xl'>
              パソコンのキーボードを使ってピアノを弾くことができます。下の図で、どのキーがどの音に対応しているかを確認しましょう。
            </p>
            <KeyboardMap />
          </main>

          <section className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Music className='h-5 w-5 text-primary' />
              <h3 className='text-lg font-semibold'>実践してみましょう！</h3>
            </div>
            <div className='bg-primary/5 border border-primary/10 rounded-lg p-4 text-center'>
              <p className='mb-2'>
                音の特性を調整しながら、実際にピアノを使って音感を鍛えましょう！
              </p>
              <p className='text-primary font-medium'>
                きらきら星や他の曲を演奏し、絶対音感を目指してトレーニングを続けてください。
              </p>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
