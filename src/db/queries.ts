import { SupabaseClient } from "@supabase/supabase-js";

export async function fetchGreens(db: SupabaseClient) {
  const { data, error } = await db.from("green").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  console.log("Data:", data);
  return data;
}
