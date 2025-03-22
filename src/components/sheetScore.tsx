"use client"

import { useRef } from "react"

interface SheetMusicProps {
  currentSong: string
  currentNote: string | null
}

export default function SheetMusic({ currentSong, currentNote }: SheetMusicProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Song data
  const songs = {
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

  const song = songs[currentSong as keyof typeof songs]

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2">{song.title}</h2>
      <p className="text-gray-500 mb-6">{song.titleEn}</p>

      <div className="flex-1 w-full flex items-center justify-center">
        <div className="relative w-full max-w-3xl">
          {/* Staff lines */}
          <div className="w-full h-[120px] relative">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="absolute w-full h-[1px] bg-gray-800" style={{ top: `${20 + i * 20}px` }} />
            ))}

            {/* Treble clef */}
            <div className="absolute left-4 top-[-15px] text-[60px] leading-none">𝄞</div>

            {/* Time signature */}
            <div className="absolute left-[70px] top-[5px] text-[30px] leading-none">4</div>
            <div className="absolute left-[70px] top-[35px] text-[30px] leading-none">4</div>

            {/* Notes */}
            <div className="absolute left-[100px] top-0 w-[calc(100%-120px)] flex justify-between">
              {song.notes.map((note, index) => {
                const isHighlighted = note === currentNote

                // Calculate vertical position based on note
                let top = 0
                const noteName = note.charAt(0)
                const octave = Number.parseInt(note.charAt(1))

                // Basic positioning (can be improved with more accurate music notation)
                const noteMap: Record<string, number> = {
                  C: 60,
                  D: 50,
                  E: 40,
                  F: 30,
                  G: 20,
                  A: 10,
                  B: 0,
                }

                top = noteMap[noteName] || 40
                if (octave > 4) top -= 70

                return (
                  <div
                    key={index}
                    className={`absolute w-6 h-6 flex items-center justify-center transition-all duration-300 ${isHighlighted ? "scale-125" : ""}`}
                    style={{
                      left: `${(index / song.notes.length) * 100}%`,
                      top: `${top}px`,
                    }}
                  >
                    <div
                      className={`w-5 h-4 rounded-full bg-black ${isHighlighted ? "bg-blue-600" : ""} transform rotate-[-20deg]`}
                    />
                    <div className="absolute h-16 w-[1px] bg-black bottom-0 left-5" />

                    {/* Note name */}
                    <div className="absolute top-[-20px] text-xs font-medium text-gray-600">
                      {note.replace("4", "").replace("5", "")}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

