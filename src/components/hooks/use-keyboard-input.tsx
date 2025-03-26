"use client";

import { useEffect, useState } from "react";

interface UseKeyboardInputProps {
  onKeyPress?: (note: string) => void;
}

// Map computer keyboard keys to piano notes
const keyboardMap: Record<string, string> = {
  a: "C4",
  w: "C#4",
  s: "D4",
  e: "D#4",
  d: "E4",
  f: "F4",
  t: "F#4",
  g: "G4",
  y: "G#4",
  h: "A4",
  u: "A#4",
  j: "B4",
  k: "C5",
  o: "C#5",
  l: "D5",
  p: "D#5",
  ";": "E5",
};

export function useKeyboardInput({ onKeyPress }: UseKeyboardInputProps) {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Check if the key is mapped to a note
      if (keyboardMap[key] && !activeKeys.includes(key)) {
        setActiveKeys((prev) => [...prev, key]);
        onKeyPress?.(keyboardMap[key]);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Remove the key from active keys
      if (keyboardMap[key]) {
        setActiveKeys((prev) => prev.filter((k) => k !== key));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [activeKeys, onKeyPress]);

  // Convert keyboard keys to piano notes
  const activeNotes = activeKeys.map((key) => keyboardMap[key]);

  return {
    activeKeys,
    activeNotes,
    keyboardMap,
  };
}
