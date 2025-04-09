"use server";

import { supabase } from "@/supabase/supabase.config";
import { auth } from "@clerk/nextjs/server";

export async function updateUserScore(newScore: number): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) {
    console.error("認証されていません。");
    return false;
  }

  const { error } = await supabase
    .from("User")
    .update({ score: newScore })
    .eq("id", userId);

  if (error) {
    console.error("スコアの更新に失敗:", error);
    return false;
  }

  return true;
}
