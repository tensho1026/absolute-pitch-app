// app/api/rankings/route.ts
import { getAllUserScores } from "@/features/getAllScore";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getAllUserScores();
  // id を userId にマッピング
  const mapped = data.map((user) => ({
    userId: user.id, 
    username: user.username,
    score: user.score,
  }));

  return NextResponse.json(mapped);
}
