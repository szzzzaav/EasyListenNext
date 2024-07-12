import supabase from "@/hooks/supabase";

const getSongById = async (id: string): Promise<{ music?: any }> => {
  if (!id) {
    return {};
  }
  const { data, error } = await supabase.from("songs").select("*").eq("id", id);

  if (error) {
    console.log(error.message);
    return {};
  }
  return { music: data[0] } || {};
};

export default getSongById;
