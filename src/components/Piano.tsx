"use client";

import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

interface PianoKeyboardProps {
  onNotePlay: (note: string) => void;
  adsr: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  };
}

export default function PianoKeyboard({
  onNotePlay,
  adsr,
}: PianoKeyboardProps) {
  const synth = useRef<Tone.PolySynth | null>(null);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  // Initialize the synth
  useEffect(() => {
    synth.current = new Tone.PolySynth(Tone.Synth).toDestination();
    return () => {
      synth.current?.dispose();
    };
  }, []);

  //キーボードで音を出す関数
  useEffect(() => {
    const keyToNoteMap: { [key: string]: string } = {
      q: "C3",
      w: "C#3",
      e: "D3",
      r: "D#3",
      t: "E3",
      y: "F3",
      u: "F#3",
      i: "G3",
      o: "G#3",
      p: "A3",
      "@": "A#3",
      "[": "B3",

      a: "C4",
      s: "C#4",
      d: "D4",
      f: "D#4",
      g: "E4",
      h: "F4",
      j: "F#4",
      k: "G4",
      l: "G#4",
      ";": "A4",
      ":": "A#4", // Shift + ; （ブラウザによっては違う場合あり）
      "]": "B4", // または別キーで調整可能

      z: "C5",
      x: "C#5",
      c: "D5",
      v: "D#5",
      b: "E5",
      n: "F5",
      m: "F#5",
      ",": "G5",
      ".": "G#5",
      "/": "A5",
      "\\": "A#5", // バックスラッシュ（円記号キー）
      "1": "B5", // 例として「1」キー使用（他の空いてるキーでもOK）
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const note = keyToNoteMap[e.key];
      if (note) {
        playNote(note);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update ADSR when it changes
  useEffect(() => {
    if (synth.current) {
      synth.current.set({
        envelope: {
          attack: adsr.attack,
          decay: adsr.decay,
          sustain: adsr.sustain,
          release: adsr.release,
        },
      });
    }
  }, [adsr]);

  // Define keyboard layout
  const whiteKeys = ["C", "D", "E", "F", "G", "A", "B"];
  const blackKeys = ["C#", "D#", "F#", "G#", "A#"];
  const blackKeyPositions = [0, 1, 3, 4, 5]; // Positions relative to white keys (0-indexed)
  const startOctave = 3; // 開始オクターブ
  const octaveCount = 3; // 3オクターブ分

  const playNote = (note: string) => {
    if (synth.current) {
      synth.current.triggerAttackRelease(note, "8n");
      onNotePlay(note);

      // Visual feedback
      setActiveKeys((prev) => [...prev, note]);
      setTimeout(() => {
        setActiveKeys((prev) => prev.filter((key) => key !== note));
      }, 300);
    }
  };

  return (
    <div className='relative h-64 w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl border-t border-gray-700'>
      {/* White keys */}
      <div className='flex h-full'>
        {Array.from({ length: octaveCount * 7 }).map((_, i) => {
          const octave = startOctave + Math.floor(i / 7);
          const note = `${whiteKeys[i % 7]}${octave}`;
          const isActive = activeKeys.includes(note);

          return (
            <button
              key={`white-${note}`}
              className={`flex-1 bg-white hover:bg-gray-100 active:bg-gray-200 border-r border-gray-300 last:border-r-0 flex items-end justify-center pb-3 transition-colors ${
                isActive ? "bg-blue-100" : ""
              }`}
              onClick={() => playNote(note)}
            >
              <span className='text-gray-500 text-xs font-medium'>{note}</span>
            </button>
          );
        })}
      </div>

      {/* Black keys */}
      <div className='absolute top-0 left-0 h-3/5 w-full pointer-events-none flex z-10'>
        {Array.from({ length: octaveCount * 7 }).map((_, i) => {
          const octave = startOctave + Math.floor(i / 7);
          const whiteKeyIndex = i % 7;
          if (!blackKeyPositions.includes(whiteKeyIndex)) return null;

          const blackKeyIndex = blackKeyPositions.indexOf(whiteKeyIndex);
          const note = `${blackKeys[blackKeyIndex]}${octave}`;
          const isActive = activeKeys.includes(note);

          const leftOffset =
            i * (100 / (octaveCount * 7)) + (100 / (octaveCount * 14)) * 1.4;

          return (
            <button
              key={`black-${note}`}
              className={`absolute h-full w-[calc(100%/${
                octaveCount * 14
              })] bg-gray-900 hover:bg-gray-800 active:bg-gray-700 rounded-b-sm pointer-events-auto transition-colors ${
                isActive ? "bg-gray-600" : ""
              }`}
              style={{ left: `${leftOffset}%` }}
              onClick={() => playNote(note)}
            >
              <span className='absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-[10px]'>
                {note}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
