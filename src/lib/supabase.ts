import { createClient } from "@supabase/supabase-js";

// VITE_SUPABASE_API_KEY는 anon/public 키입니다 (사용자 확정). .env의
// VITE_SUPABASE_SECRET_KEY(service_role)는 브라우저에 노출되면 안 되므로
// 절대 여기서 읽지 않습니다.
const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJET_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Set VITE_SUPABASE_PROJET_URL and VITE_SUPABASE_API_KEY in .env",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
