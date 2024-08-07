import supabase from "@/hooks/supabase";

self.onmessage = async (event) => {
  const { file: songFile, uid } = event.data;

  try {
    const { data, error } = await supabase.storage
      .from("songs")
      .upload(`songs-${songFile.name}-${uid}`, songFile, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      throw new Error("Failed song upload");
    }

    self.postMessage({ success: true, path: data.path });
  } catch (error) {
    self.postMessage({ success: false, error });
  }
};
