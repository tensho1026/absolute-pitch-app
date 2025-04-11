"use server";

import { supabase } from "@/supabase/supabase.config";

export async function getAllUserScores() {
  const { data, error } = await supabase.from("User").select("id,username, score");

  if (error) {
    // console.error("Supabase取得エラー:", error.message);
    return [];
  }

  return data;
}
