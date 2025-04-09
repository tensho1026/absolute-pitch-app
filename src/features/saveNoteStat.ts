import { supabase } from "@/supabase/supabase.config";

export async function saveNoteStat({
  userId,
  note,
  isCorrect,
}: {
  userId: string;
  note: string;
  isCorrect: boolean;
}) {
  // 現在のnoteの統計があるか確認（user_id + noteの組み合わせ）
  const { data: existing, error: fetchError } = await supabase
    .from("note_stats")
    .select("*")
    .eq("user_id", userId)
    .eq("note", note)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // console.error("取得失敗:", fetchError.message);
    return false;
  }

  if (existing) {
    // すでに記録がある → 正解 or 不正解数を更新
    const updates = {
      correct_count: isCorrect
        ? existing.correct_count + 1
        : existing.correct_count,
      wrong_count: isCorrect ? existing.wrong_count : existing.wrong_count + 1,
    };

    const { error: updateError } = await supabase
      .from("note_stats")
      .update(updates)
      .eq("id", existing.id);

    if (updateError) {
      // console.error("更新失敗:", updateError.message);
      return false;
    }
  } else {
    // 記録がない → 新規作成
    const { error: insertError } = await supabase.from("note_stats").insert([
      {
        user_id: userId,
        note,
        correct_count: isCorrect ? 1 : 0,
        wrong_count: isCorrect ? 0 : 1,
      },
    ]);

    if (insertError) {
      // console.error("新規挿入失敗:", insertError.message);
      return false;
    }
  }

  return true;
}
