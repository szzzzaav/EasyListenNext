import supabase from "@/hooks/supabase";
import { Songs } from "@/types";

const getLikedSongs = async (id: string | undefined): Promise<Songs[]> => {
  if (!id) return [];
  const { data, error } = await supabase
    .from("liked_songs")
    .select("*,songs(*)")
    .eq("user_id", id)
    .order("created_at", { ascending: false });
  if (error) {
    return [];
  }
  if (!data) {
    return [];
  }
  return data.map((item) => ({ ...item.songs }));
};

export default getLikedSongs;
