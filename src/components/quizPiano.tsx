"use client";

import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

interface QuizPianoProps {
  onNotePlay: (note: string) => void;
  adsr: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  };
}

export default function QuizPiano({ onNotePlay, adsr }: QuizPianoProps) {
  const synth = useRef<Tone.PolySynth | null>(null);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  useEffect(() => {
    synth.current = new Tone.PolySynth(Tone.Synth).toDestination();
    return () => {
      if (synth.current) {
        synth.current.dispose();
        synth.current = null;
      }
    };
  }, []);

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

  const playNote = (note: string) => {
    if (synth.current) {
      synth.current.triggerAttackRelease(note, "8n");
      onNotePlay(note);

      setActiveKeys((prev) => [...prev, note]);
      setTimeout(() => {
        setActiveKeys((prev) => prev.filter((key) => key !== note));
      }, 300);
    }
  };

  const whiteKeys = ["C", "D", "E", "F", "G", "A", "B"];
  const blackKeys = ["C#", "D#", "F#", "G#", "A#"];
  const blackKeyPositions = [0, 1, 3, 4, 5]; // 0-indexed

  const octave = 4;

  return (
    <div className='relative h-64 w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl border-t border-gray-700'>
      {/* White Keys */}
      <div className='flex h-full'>
        {whiteKeys.map((note, i) => {
          const fullNote = `${note}${octave}`;
          const isActive = activeKeys.includes(fullNote);

          return (
            <button
              key={`white-${fullNote}`}
              className={`flex-1 bg-white hover:bg-gray-100 active:bg-gray-200 border-r border-gray-300 last:border-r-0 flex items-end justify-center pb-3 transition-colors ${
                isActive ? "bg-blue-100" : ""
              }`}
              onClick={() => playNote(fullNote)}
            >
              <span className='text-gray-500 text-xs font-medium'>
                {fullNote}
              </span>
            </button>
          );
        })}
      </div>

      {/* Black Keys */}
      <div className='absolute top-0 left-12 h-3/5 w-full pointer-events-none flex z-10'>
        {whiteKeys.map((_, i) => {
          if (!blackKeyPositions.includes(i)) return null;

          const note = `${blackKeys[blackKeyPositions.indexOf(i)]}${octave}`;
          const isActive = activeKeys.includes(note);
          const leftOffset = i * (100 / 7) + (100 / 14) * 0.7;

          return (
            <button
              key={`black-${note}`}
              className={`absolute h-full w-[calc(100%/14)] bg-gray-900 hover:bg-gray-800 active:bg-gray-700 rounded-b-sm pointer-events-auto transition-colors ${
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
