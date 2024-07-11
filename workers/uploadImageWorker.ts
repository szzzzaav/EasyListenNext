import supabase from "@/hooks/supabase";

self.onmessage = async (event) => {
  const { imageFile, uid } = event.data;

  try {
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`images-${imageFile.name}-${uid}`, imageFile, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      throw new Error("Failed image upload");
    }

    self.postMessage({ success: true, imagePath: data.path });
  } catch (error) {
    self.postMessage({ success: false, error: error });
  }
};
