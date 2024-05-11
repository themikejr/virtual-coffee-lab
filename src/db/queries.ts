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

export async function fetchRoasts(db: SupabaseClient) {
  const { data, error } = await db
    .from("roast")
    .select("*, green ( name, country )");

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  console.log("Data:", data);
  return data;
}

export async function fetchNotesForRoast(db: SupabaseClient, roastId: number) {
  const { data, error } = await db
    .from("note")
    .select("*, user (  display_name ), roast ( roast_date )")
    .eq("roast", roastId);

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  console.log("Notes for roast: ", data);
  return data;
}

export async function searchVideos(db: SupabaseClient, searchTerm: string) {
  const { data, error } = await db
    .from("video")
    .select()
    .textSearch("fts", searchTerm);

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  console.log("Notes for roast: ", data);
  return data;
}
