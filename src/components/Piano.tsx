// "use client";

// import { useEffect } from "react";

// interface PianoProps {
//   playNote: (note: string) => void; // ✅ `playNote` の型を定義
// }

// export default function Piano({ playNote }: PianoProps) {
//   const keyMap: { [key: string]: string } = {
//     a: "C4",
//     w: "C#4",
//     s: "D4",
//     e: "D#4",
//     d: "E4",
//     f: "F4",
//     t: "F#4",
//     g: "G4",
//     y: "G#4",
//     h: "A4",
//     u: "A#4",
//     j: "B4",
//     k: "C5",
//     o: "C#5",
//     l: "D5",
//     p: "D#5",
//     ";": "E5",
//     "'": "F5",
//     "]": "F#5",
//     "\\": "G5",
//     "[": "G#5",
//     "1": "A5",
//     "2": "A#5",
//     "3": "B5",
//   };

//   const notes = [
//     { note: "C4", type: "white" },
//     { note: "C#4", type: "black", position: "left-[33px]" },
//     { note: "D4", type: "white" },
//     { note: "D#4", type: "black", position: "left-[100px]" },
//     { note: "E4", type: "white" },
//     { note: "F4", type: "white" },
//     { note: "F#4", type: "black", position: "left-[225px]" },
//     { note: "G4", type: "white" },
//     { note: "G#4", type: "black", position: "left-[290px]" },
//     { note: "A4", type: "white" },
//     { note: "A#4", type: "black", position: "left-[355px]" },
//     { note: "B4", type: "white" },
//     { note: "C5", type: "white" },
//     { note: "C#5", type: "black", position: "left-[483px]" },
//     { note: "D5", type: "white" },
//     { note: "D#5", type: "black", position: "left-[547px]" },
//     { note: "E5", type: "white" },
//     { note: "F5", type: "white" },
//     { note: "F#5", type: "black", position: "left-[675px]" },
//     { note: "G5", type: "white" },
//     { note: "G#5", type: "black", position: "left-[740px]" },
//     { note: "A5", type: "white" },
//     { note: "A#5", type: "black", position: "left-[805px]" },
//     { note: "B5", type: "white" },
//   ];

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       const note = keyMap[event.key.toLowerCase()];
//       if (note) {
//         playNote(note);
//         const button = document.getElementById(note);
//         if (button) button.classList.add("active");
//       }
//     };

//     const handleKeyUp = (event: KeyboardEvent) => {
//       const note = keyMap[event.key.toLowerCase()];
//       if (note) {
//         const button = document.getElementById(note);
//         if (button) button.classList.remove("active");
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, []);

//   return (
//     <div className='relative flex items-center justify-center p-4 bg-gray-900 rounded-lg'>
//       {/* 白鍵 */}
//       <div className='relative flex'>
//         {notes
//           .filter(({ type }) => type === "white")
//           .map(({ note }) => (
//             <button
//               id={note}
//               key={note}
//               onClick={() => playNote(note)}
//               className='w-16 h-48 bg-white border border-gray-700 rounded-lg shadow-md active:bg-gray-300'
//             />
//           ))}
//       </div>

//       {/* 黒鍵（正しい位置に配置） */}
//       <div className='absolute flex top-3 left-6'>
//         {notes
//           .filter(({ type }) => type === "black")
//           .map(({ note, position }) => (
//             <button
//               id={note}
//               key={note}
//               onClick={() => playNote(note)}
//               className={`absolute w-10 h-28 bg-black text-white border border-gray-900 rounded-b-lg shadow-lg active:bg-gray-700 pointer-events-auto ${position} z-10`}
//             />
//           ))}
//       </div>
//     </div>
//   );
// }
"use client"

import { useState, useEffect, useRef } from "react"
import * as Tone from "tone"

interface PianoKeyboardProps {
  onNotePlay: (note: string) => void
  adsr: {
    attack: number
    decay: number
    sustain: number
    release: number
  }
}

export default function PianoKeyboard({ onNotePlay, adsr }: PianoKeyboardProps) {
  const synth = useRef<Tone.PolySynth | null>(null)
  const [activeKeys, setActiveKeys] = useState<string[]>([])

  // Initialize the synth
  useEffect(() => {
    synth.current = new Tone.PolySynth(Tone.Synth).toDestination()
    return () => {
      synth.current?.dispose()
    }
  }, [])

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
      })
    }
  }, [adsr])

  // Define keyboard layout
  const octave = 4
  const whiteKeys = ["C", "D", "E", "F", "G", "A", "B"]
  const blackKeys = ["C#", "D#", "F#", "G#", "A#"]
  const blackKeyPositions = [0, 1, 3, 4, 5] // Positions relative to white keys (0-indexed)

  const playNote = (note: string) => {
    const fullNote = `${note}${octave}`
    if (synth.current) {
      synth.current.triggerAttackRelease(fullNote, "8n")
      onNotePlay(fullNote)

      // Visual feedback
      setActiveKeys((prev) => [...prev, note])
      setTimeout(() => {
        setActiveKeys((prev) => prev.filter((key) => key !== note))
      }, 300)
    }
  }

  return (
    <div className="relative h-64 w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl border-t border-gray-700">
      {/* White keys */}
      <div className="flex h-full">
        {[...Array(21)].map((_, i) => {
          const noteIndex = i % 7
          const note = whiteKeys[noteIndex]
          const isActive = activeKeys.includes(note)

          return (
            <button
              key={`white-${i}`}
              className={`flex-1 bg-white hover:bg-gray-100 active:bg-gray-200 border-r border-gray-300 last:border-r-0 flex items-end justify-center pb-3 transition-colors ${isActive ? "bg-blue-100" : ""}`}
              onClick={() => playNote(note)}
            >
              <span className="text-gray-500 text-xs font-medium">{note}</span>
            </button>
          )
        })}
      </div>

      {/* Black keys */}
      <div className="absolute top-0 left-0 h-3/5 w-full pointer-events-none flex">
        {[...Array(21)].map((_, i) => {
          const octavePosition = i % 7
          if (!blackKeyPositions.includes(octavePosition)) return null

          const blackKeyIndex = blackKeyPositions.indexOf(octavePosition)
          const note = blackKeys[blackKeyIndex]
          const isActive = activeKeys.includes(note)

          const leftOffset = i * (100 / 21) + 100 / 42

          return (
            <button
              key={`black-${i}`}
              className={`absolute h-full w-[calc(100%/42)] bg-gray-900 hover:bg-gray-800 active:bg-gray-700 rounded-b-sm pointer-events-auto transition-colors ${isActive ? "bg-gray-700" : ""}`}
              style={{ left: `${leftOffset}%` }}
              onClick={() => playNote(note)}
            >
              <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-[10px]">
                {note}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

