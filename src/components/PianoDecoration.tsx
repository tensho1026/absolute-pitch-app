// components/PianoDecoration.tsx
import React from "react";

type PianoDecorationProps = {
  position?: "top" | "bottom";
};

export default function PianoDecoration({ position = "top" }: PianoDecorationProps) {
  const isBottom = position === "bottom";

  return (
    <div
      className={`absolute ${isBottom ? "bottom-0" : "top-0"} left-0 w-full h-16 flex overflow-hidden ${
        isBottom ? "rotate-180" : ""
      }`}
    >
      {[...Array(24)].map((_, i) => (
        <div
          key={i}
          className={`h-full ${
            [1, 3, 6, 8, 10].includes(i % 12)
              ? "bg-slate-800 w-[4%]"
              : "bg-white w-[6%]"
          } border-l border-slate-300`}
        />
      ))}
    </div>
  );
}
