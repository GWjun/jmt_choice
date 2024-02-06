// supabaseClient.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY as string;
const redirectUrl = process.env.REACT_APP_REDIRECT_URL as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function googleLogin() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: redirectUrl,
    },
  });
}

export async function googleLogout() {
  const { error } = await supabase.auth.signOut();
  alert("로그아웃 되었습니다.");
  window.location.href = "/";
}
