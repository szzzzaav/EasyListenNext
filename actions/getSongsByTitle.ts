import { Songs } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsByTitle = async (title: string): Promise<Songs[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  if (!title) {
    const { data: allSongs, error } = await supabase
      .from("songs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return [];
    return (allSongs as any) || [];
  }
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
  }
  return (data as any) || [];
};

export default getSongsByTitle;
