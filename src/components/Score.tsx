"use client";
import { useState } from "react";

const scores = [
  { name: "Twinkle Twinkle Little Star", file: "/kirakira.png" },
  { name: "Happy Birthday", file: "/happy.jpg" },
  { name: "score1", file: "/score1.jpg" },
  { name: "score2", file: "/score2.jpg" },
];

function Score() {
  const [selectedScore, setSelectedScore] = useState(scores[0].file);

  return (
    <div className="flex flex-col items-center">
      <select
        className="mb-2 p-2 rounded border border-gray-400"
        onChange={(e) => setSelectedScore(e.target.value)}
      >
        {scores.map((score) => (
          <option key={score.name} value={score.file}>
            {score.name}
          </option>
        ))}
      </select>
      <div className="w-full max-w-md bg-white p-4 rounded shadow-lg">
        <div className="w-full h-80 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
          <img
            src={selectedScore}
            alt="Sheet Music"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Score;
