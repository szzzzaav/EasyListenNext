"use client";

import { useEffect } from "react";
import { useAudioContext } from "./useAudio";
import getSongById from "@/actions/getSongsById";
import supabase from "./supabase";
import { AudioControlObject } from "@/util/AudioControlObject.js";
import { lyricObject } from "@/util/LyricObject.js";

interface UseMusicObjectsProps {
  data: any[];
}

const useMusicObjects = ({ data }: UseMusicObjectsProps) => {
  const {
    dispatch,
    volumnRef,
    progressRef,
    lyricStageRef,
    progressBgRef,
    visualStageRef,
    timeProgressRef,
    musicObjects,
    setMusicObjects,
  } = useAudioContext();

  useEffect(() => {
    if (!data.length) return;

    const getData = async () => {
      dispatch({ type: "setPending" });
      if (data.length === 1) {
        dispatch({ type: "setFirstLoading" });
      }
      try {
        let music: any;
        const latestData = data.at(-1);
        if (latestData.music) {
          music = latestData.music;
        } else {
          const { music: audioData } = await getSongById(latestData);
          music = audioData;
        }

        let find = false;
        musicObjects.forEach((e) => {
          if (e.music.id === music.id) {
            find = true;
          }
        });
        if (find) return;

        const loadAudio = (Worker: Worker, url: string) => {
          return new Promise<{
            success: boolean;
            ArrayBuffer: ArrayBuffer;
            error?: string;
          }>((resolve) => {
            Worker.onmessage = (event) => resolve(event.data);
            Worker.postMessage({ url });
          });
        };

        const loadLyric = (Worker: Worker, url: string) => {
          return new Promise<{
            success: boolean;
            text: string;
            error?: string;
          }>((resolve) => {
            Worker.onmessage = (event) => resolve(event.data);
            Worker.postMessage({ url });
          });
        };

        const songWorker = new Worker(
          new URL("@/workers/loadAudioWorker.ts", import.meta.url)
        );
        const lyricWorker = new Worker(
          new URL("@/workers/loadLyricWorker.ts", import.meta.url)
        );

        const songUrl = supabase.storage
          .from("songs")
          .getPublicUrl(music.song_path);
        const lyricUrl = supabase.storage
          .from("lyrics")
          .getPublicUrl(music.lyric_path);
        const imageUrl = supabase.storage
          .from("images")
          .getPublicUrl(music.image_path);
        music.image_path = imageUrl.data.publicUrl;

        const [songResult, lyricResult] = await Promise.all([
          loadAudio(songWorker, songUrl.data.publicUrl),
          loadLyric(lyricWorker, lyricUrl.data.publicUrl),
        ]);

        const newMusicObject = await new AudioControlObject(
          songResult.ArrayBuffer,
          {
            visualStageRef,
            progressRef,
            progressBgRef,
            volumnRef,
            timeProgressRef,
          }
        );
        const newLyric = new lyricObject({
          text: lyricResult.text as any,
          lyricStageRef: lyricStageRef as any,
          offset: 4,
          id: music.id as any,
        });

        setMusicObjects((m) => [
          ...m,
          { musicObject: newMusicObject, music, lyric: newLyric },
        ]);

        newMusicObject.register({
          showlryonlrcstage: newLyric.showlryonlrcstage.bind(newLyric),
        });

        if (data.length === 1) {
          dispatch({
            type: "setMusic",
            payload: { musicObject: newMusicObject, music, lyric: newLyric },
          });
        }
      } catch (error) {
        alert(error);
      } finally {
        dispatch({ type: "finishPending" });
        if (data.length === 1) {
          dispatch({ type: "finishFirstLoad" });
        }
      }
    };

    getData();
  }, [data]);

  return {
    musicObjects,
    setMusicObjects,
  };
};

export default useMusicObjects;
