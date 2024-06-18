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

export async function saveGreen(
  db: SupabaseClient,
  name: string,
  country: string,
  region: string,
  process: string,
  elevationMasl: number,
  initialQuantity: number,
  importer: string,
  cultivar: number,
  purchaseDate: string,
) {
  // const userId = await getUserId(db);

  const { data, error } = await db.from("green").insert([
    {
      name,
      country,
      region,
      process,
      elevation_masl: elevationMasl,
      initial_quantity: initialQuantity,
      importer,
      cultivar,
      date_purchased: purchaseDate,
    },
  ]);

  if (error) {
    console.error("Error inserting data:", error);
    return null;
  }

  console.log("Inserted data:", data);
  return data;
}

export async function deleteGreen(db: SupabaseClient, id: number) {
  // const userId = await getUserId(db);

  const { error } = await db.from("green").delete().eq("id", id);

  if (error) {
    console.error("Error deleting data:", error);
    return null;
  }

  console.log("deleted data:", id);
  // return data;
}
