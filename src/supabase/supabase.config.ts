// import { useUser } from "@clerk/nextjs";
// import { auth, getAuth } from "@clerk/nextjs/server";
// import { createClient } from "@supabase/supabase-js";

// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);





// const getAuthToken = async () => {
//   try {
//     const { getToken }:any = auth();
//     const token = await getToken({ template: "supabase" });
//     console.log("🔑 Clerkトークン:", token);
//     return token;
//   } catch (error) {
//     console.error("❌ トークン取得エラー:", error);
//     return null;
//   }
// };

// getAuthToken();
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function getAuthToken() {
  try {
    const response = await fetch("/api/token");
    const { token } = await response.json();
    console.log("🔑 Clerkトークン:", token);
    return token;
  } catch (error) {
    console.error("❌ トークン取得エラー:", error);
    return null;
  }
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  global: {
    fetch: async (input, init) => {
      const token = await getAuthToken();
      if (!init) init = {};
      init.headers = {
        ...init.headers,
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token}`,
      };
      return fetch(input, init);
    },
  },
});
