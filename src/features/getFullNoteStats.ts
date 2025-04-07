import { supabase } from "@/supabase/supabase.config";

const NOTES = [
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
];

export async function getFullNoteStats(userId: string) {
  // Supabase から現在の note_stats を取得
  const { data: stats, error } = await supabase
    .from("note_stats")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("note_stats の取得に失敗:", error.message);
    return [];
  }

  // データを Map に変換（note => 統計）
  const statsMap = new Map(stats.map((stat) => [stat.note, stat]));

  // 全12音階をループして、なければ 0 を補完
  const completeStats = NOTES.map((note) => {
    const stat = statsMap.get(note);
    return {
      note,
      correct_count: stat?.correct_count ?? 0,
      wrong_count: stat?.wrong_count ?? 0,
    };
  });

  return completeStats;
}
