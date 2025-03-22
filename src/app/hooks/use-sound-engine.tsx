"use client"

import { useState, useEffect, useRef } from "react"
import * as Tone from "tone"
import type { ADSREnvelope } from "@/lib/utils"

interface UseSoundEngineProps {
  adsr: ADSREnvelope
}

export function useSoundEngine({ adsr }: UseSoundEngineProps) {
  const synth = useRef<Tone.PolySynth | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize the synth
  useEffect(() => {
    // Create synth only on client side
    if (typeof window !== "undefined") {
      synth.current = new Tone.PolySynth(Tone.Synth).toDestination()
      setIsInitialized(true)

      // Clean up on unmount
      return () => {
        if (synth.current) {
          synth.current.dispose()
          synth.current = null
        }
      }
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

  // Function to play a note
  const playNote = (note: string, duration = "8n") => {
    if (!isInitialized || !synth.current) {
      // Initialize Tone.js if not already done
      Tone.start().then(() => {
        if (synth.current) {
          synth.current.triggerAttackRelease(note, duration)
        }
      })
    } else {
      synth.current.triggerAttackRelease(note, duration)
    }
  }

  // Function to play a chord
  const playChord = (notes: string[], duration = "8n") => {
    if (!isInitialized || !synth.current) {
      // Initialize Tone.js if not already done
      Tone.start().then(() => {
        if (synth.current) {
          synth.current.triggerAttackRelease(notes, duration)
        }
      })
    } else {
      synth.current.triggerAttackRelease(notes, duration)
    }
  }

  // Function to play a sequence of notes
  const playSequence = (notes: string[], tempo = 120) => {
    if (!isInitialized) return

    const noteLength = 60 / tempo

    // Create a sequence
    const seq = new Tone.Sequence(
      (time, note) => {
        if (synth.current) {
          synth.current.triggerAttackRelease(note, "8n", time)
        }
      },
      notes,
      noteLength,
    )

    // Start the sequence
    seq.start(0)
    Tone.Transport.start()

    // Stop after playing all notes
    setTimeout(
      () => {
        seq.stop()
        seq.dispose()
      },
      noteLength * notes.length * 1000 + 500,
    )
  }

  return {
    playNote,
    playChord,
    playSequence,
    isInitialized,
  }
}

