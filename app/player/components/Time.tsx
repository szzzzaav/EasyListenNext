"use client";

import { useAudioContext } from "@/hooks/useAudio";
import useWindowWidth from "./PlayerConfig";

const Time = () => {
  const WIDTH = useWindowWidth();
  const { currentMusic, timeProgressRef } = useAudioContext();
  return (
    <div
      className={`relative bottom-[20px] flex items-center justify-between min-w-[450px] w-[${WIDTH}px] text-[#cdcdcd] text-[11px]`}
    >
      <span ref={timeProgressRef}>00:00</span>
      <span>{currentMusic?.musicObject?.getFormatDuration() || "00:00"}</span>
    </div>
  );
};

export default Time;
