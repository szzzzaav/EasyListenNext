import supabase from "@/hooks/supabase";
import { Songs } from "@/types";

const getSongsByUserId = async (id: string | undefined): Promise<Songs[]> => {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error.message);
    return [];
  }
  return (data as any) || [];
};

export default getSongsByUserId;
