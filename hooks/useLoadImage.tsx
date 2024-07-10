import { Songs } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (song: Songs) => {
  const supabaseClient = useSupabaseClient();
  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.image_path);
  return imageData.publicUrl;
};

export default useLoadImage;
