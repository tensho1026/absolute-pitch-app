"use client";

import { playRandomNote } from "@/features/playRandomNote";

export default function Page() {
  return (
    <div className=''>
      <button onClick={playRandomNote}>Play Random Note</button>
    </div>
  );
}
