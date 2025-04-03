"use server";

import { supabase } from "@/supabase/supabase.config";
import { auth } from "@clerk/nextjs/server";


export async function getDbUserId() {
  const { userId: clerkId } = await auth(); // ClerkのIDを取得

  if (!clerkId) {
    console.error("User is not authenticated");
    return null;
  }

  // Supabase から `id` を取得（Clerk ID = Supabase ID 前提）
  const { data, error } = await supabase
    .from("User")
    .select("id") // `id` のみ取得
    .eq("id", clerkId) // Clerk ID = Supabase ID なので `id` で検索
    .single();

  if (error) {
    console.error("Supabase からユーザーIDを取得できませんでした:", error);
    return null;
  }

  console.log("Supabase から取得したユーザーID:", data.id);
  return data.id;
}