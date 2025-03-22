// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Piano utility functions
export function noteToFrequency(note: string): number {
  const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
  const octave = Number.parseInt(note.slice(-1))
  const noteName = note.slice(0, -1)

  const noteIndex = notes.indexOf(noteName)
  if (noteIndex === -1) return 440 // Default to A4 if note not found

  // A4 is 440Hz, which is note 'A' in octave 4
  const a4Index = notes.indexOf("A") + 4 * 12
  const noteDistance = octave * 12 + noteIndex - a4Index

  // Calculate frequency using the formula: f = 440 * 2^(n/12)
  return 440 * Math.pow(2, noteDistance / 12)
}

// ADSR envelope utility
export interface ADSREnvelope {
  attack: number
  decay: number
  sustain: number
  release: number
}

export function createDefaultADSR(): ADSREnvelope {
  return {
    attack: 0.02,
    decay: 0.1,
    sustain: 0.3,
    release: 0.5,
  }
}

// Song data utility
export interface Song {
  title: string
  titleEn: string
  notes: string[]
}

export const songLibrary: Record<string, Song> = {
  twinkle: {
    title: "きらきら星",
    titleEn: "Twinkle Twinkle Little Star",
    notes: ["C4", "C4", "G4", "G4", "A4", "A4", "G4", "F4", "F4", "E4", "E4", "D4", "D4", "C4"],
  },
  mary: {
    title: "メリーさんの羊",
    titleEn: "Mary Had a Little Lamb",
    notes: ["E4", "D4", "C4", "D4", "E4", "E4", "E4", "D4", "D4", "D4", "E4", "G4", "G4"],
  },
  happy: {
    title: "ハッピーバースデー",
    titleEn: "Happy Birthday",
    notes: ["C4", "C4", "D4", "C4", "F4", "E4", "C4", "C4", "D4", "C4", "G4", "F4"],
  },
}


