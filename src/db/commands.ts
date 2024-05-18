import { SupabaseClient } from "@supabase/supabase-js";

async function getUserId(db: SupabaseClient) {
  const { data: session } = await db.auth.getSession();
  const id = session.session?.user.id;

  const { data, error } = await db.from("user").select("*").eq("auth_id", id);

  if (data) {
    return data[0].id;
  }
}

export async function saveNote(
  db: SupabaseClient,
  noteContent: string,
  roastId: number,
) {
  const userId = await getUserId(db);

  const { data, error } = await db
    .from("note")
    .insert([{ author: userId, roast: roastId, content: noteContent }]);

  if (error) {
    console.error("Error inserting data:", error);
    return null;
  }

  console.log("Inserted data:", data);
  return data;
}

export async function saveRoast(
  db: SupabaseClient,
  green: number,
  roastDate: string,
  drySeconds: number,
  fcsSeconds: number,
  dropSeconds: number,
  weightLoss: number,
) {
  // const userId = await getUserId(db);

  const { data, error } = await db.from("roast").insert([
    {
      green,
      roast_date: roastDate,
      dry_time: drySeconds,
      fcs_time: fcsSeconds,
      drop_time: dropSeconds,
      weight_loss: weightLoss,
    },
  ]);

  if (error) {
    console.error("Error inserting data:", error);
    return null;
  }

  console.log("Inserted data:", data);
  return data;
}
