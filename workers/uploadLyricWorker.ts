import supabase from "@/hooks/supabase";

self.onmessage = async (event) => {
  const { lyricFile, uid } = event.data;

  try {
    const { data, error } = await supabase.storage
      .from("lyrics")
      .upload(`lyrics-${lyricFile.name}-${uid}`, lyricFile, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      throw new Error("Failed song upload");
    }

    self.postMessage({ success: true, lyricPath: data.path });
  } catch (error) {
    self.postMessage({ success: false, error });
  }
};
