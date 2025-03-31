"use client";

import { playRandomNote } from "@/features/playRandomNote";

export default function Page() {
  

  return (
    <button onClick={playRandomNote}>Play Random Note</button>
  );
}
