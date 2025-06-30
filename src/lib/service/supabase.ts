import { Database } from "@/model/database";
import { createClient } from "@supabase/supabase-js";

export const supabase = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase ENV tidak ditemukan");
  }

  return createClient<Database>(url, key);
})();
