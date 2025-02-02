"use client";

interface PianoProps {
  playNote: (note: string) => void; // ✅ `playNote` の型を定義
}

export default function Piano({ playNote }: PianoProps) {
  const notes = [
    { note: "C4", type: "white" },
    { note: "C#4", type: "black", position: "left-[33px]" },
    { note: "D4", type: "white" },
    { note: "D#4", type: "black", position: "left-[100px]" },
    { note: "E4", type: "white" },
    { note: "F4", type: "white" },
    { note: "F#4", type: "black", position: "left-[225px]" },
    { note: "G4", type: "white" },
    { note: "G#4", type: "black", position: "left-[290px]" },
    { note: "A4", type: "white" },
    { note: "A#4", type: "black", position: "left-[355px]" },
    { note: "B4", type: "white" },
    { note: "C5", type: "white" },
    { note: "C#5", type: "black", position: "left-[483px]" },
    { note: "D5", type: "white" },
    { note: "D#5", type: "black", position: "left-[547px]" },
    { note: "E5", type: "white" },
    { note: "F5", type: "white" },
    { note: "F#5", type: "black", position: "left-[675px]" },
    { note: "G5", type: "white" },
    { note: "G#5", type: "black", position: "left-[740px]" },
    { note: "A5", type: "white" },
    { note: "A#5", type: "black", position: "left-[805px]" },
    { note: "B5", type: "white" },
  ];

  return (
    <div className='relative flex items-center justify-center p-4 bg-gray-900 rounded-lg'>
      {/* 白鍵 */}
      <div className='relative flex'>
        {notes
          .filter(({ type }) => type === "white")
          .map(({ note }) => (
            <button
              key={note}
              onClick={() => playNote(note)}
              className='w-16 h-48 bg-white border border-gray-700 rounded-lg shadow-md active:bg-gray-300'
            />
          ))}
      </div>

      {/* 黒鍵（正しい位置に配置） */}
      <div className='absolute flex top-3 left-6'>
        {notes
          .filter(({ type }) => type === "black")
          .map(({ note, position }) => (
            <button
              key={note}
              onClick={() => playNote(note)}
              className={`absolute w-10 h-28 bg-black text-white border border-gray-900 rounded-b-lg shadow-lg active:bg-gray-700 pointer-events-auto ${position} z-10`}
            />
          ))}
      </div>
    </div>
  );
}
