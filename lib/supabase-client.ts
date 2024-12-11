import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("An error occurred! No supabase Url found!");
}

if (!supabaseServiceKey) {
  throw new Error("An error occurred! No supabase Service key found!");
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
