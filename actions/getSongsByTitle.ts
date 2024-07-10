import supabase from "@/hooks/supabase";
import { Songs } from "@/types";

const getSongsByTitle = async (title: string): Promise<Songs[]> => {
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
  if (error) {
    console.log(error.message);
    return [];
  }
  return (data as any) || [];
};

export default getSongsByTitle;
