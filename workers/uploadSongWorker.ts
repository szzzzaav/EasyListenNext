import supabase from "@/hooks/supabase";

self.onmessage = async (event) => {
  const { songFile, uid } = event.data;
  console.log("songWorker" + songFile + songFile.name);

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

    self.postMessage({ success: true, songPath: data.path });
  } catch (error) {
    self.postMessage({ success: false, error });
  }
};
