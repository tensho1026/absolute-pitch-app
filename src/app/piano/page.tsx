"use client";
import Piano from "@/components/Piano";
import Score from "@/components/Score";
import Slider from "@/components/Slider";

import { useState, useEffect } from "react";
import * as Tone from "tone";

let synth: Tone.Synth;

export default function PianoPage() {
  // スライダーの値を管理する state
  const [attack, setAttack] = useState(0.02);
  const [decay, setDecay] = useState(0.1);
  const [sustain, setSustain] = useState(0.3);
  const [release, setRelease] = useState(0.5);

  // シンセサイザーの初期化
  useEffect(() => {
    synth = new Tone.Synth({
      oscillator: { type: "triangle" },
      envelope: { attack, decay, sustain, release },
    }).toDestination();
  }, []);

  // スライダーの値が変わったときにシンセサイザーを更新
  useEffect(() => {
    if (synth) {
      synth.envelope.attack = attack;
      synth.envelope.decay = decay;
      synth.envelope.sustain = sustain;
      synth.envelope.release = release;
    }
  }, [attack, decay, sustain, release]);

  // 音を再生する関数（Piano.tsx に渡す）
  const playNote = async (note: string) => {
    await Tone.start();
    synth.triggerAttackRelease(note, "8n");
  };

  return (
    <div className='relative max-h-screen bg-gray-100 flex flex-col justify-end'>
      {/* スライダー（右上に配置） */}
      <div className='absolute top-4 right-0 w-auto bg-gray-800 p-4 rounded-lg shadow-lg transform scale-50 '>
        <Slider
          label='Attack'
          value={attack}
          min={0}
          max={1}
          step={0.01}
          onChange={setAttack}
        />
        <Slider
          label='Decay'
          value={decay}
          min={0}
          max={1}
          step={0.01}
          onChange={setDecay}
        />
        <Slider
          label='Sustain'
          value={sustain}
          min={0}
          max={1}
          step={0.01}
          onChange={setSustain}
        />
        <Slider
          label='Release'
          value={release}
          min={0}
          max={1}
          step={0.01}
          onChange={setRelease}
        />
      </div>

      {/* ピアノUI（画面下に配置） */}
      <div className='flex flex-col items-center justify-end min-h-screen pb-12'>
        <Score />
        <Piano playNote={playNote} />
      </div>
    </div>
  );
}
