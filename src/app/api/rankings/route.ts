// app/api/rankings/route.ts
import { getAllUserScores } from "@/features/getAllScore";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getAllUserScores();
  return NextResponse.json(data);
}
