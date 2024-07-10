import supabase from "@/hooks/supabase";
import { Songs } from "@/types";

const getSongs = async (): Promise<Songs[]> => {
  const { data, error } = await supabase.from("songs").select("*");
  if (error) {
    console.log(error);
    return [];
  }
  return (data as any) || [];
};

export default getSongs;
