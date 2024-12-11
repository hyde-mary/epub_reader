import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPBASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("An error occurred! No supabase Url found!");
}

if (!supabaseAnonKey) {
  throw new Error("An error occurred! No supabase Anon key found!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
