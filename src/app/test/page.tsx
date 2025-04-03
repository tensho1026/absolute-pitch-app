"use client";

import { getUserScore } from "@/features/getScore";
import { getDbUserId } from "@/features/getUserId";
import { useEffect, useState } from "react";

export default function Page() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userScore, setUserScore] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const score = await getUserScore();
      setUserScore(score);
    })();
  }, []);

  return (
    <div>
      <h1>ユーザースコア: {userScore ?? "取得中..."}</h1>
    </div>
  );
}
