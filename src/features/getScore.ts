"use server";

import { supabase } from "@/supabase/supabase.config";
import { auth } from "@clerk/nextjs/server";

export async function getUserScore(): Promise<number | null> {
  const { userId } = await auth();

  if (!userId) {
    // console.error("ユーザーが認証されていません。");
    return null;
  }

  const { data, error } = await supabase
    .from("User")
    .select("score")
    .eq("id", userId)
    .single();

  if (error) {
    // console.error("スコアの取得に失敗しました:", error);
    return null;
  }

  // console.log("取得したスコア:", data.score);
  return data.score;
}
