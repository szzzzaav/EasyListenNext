"use client";

import { useAudioContext } from "@/hooks/useAudio";
import Lyric from "./Lyric";
import StyledStage from "./StyledStage";
import { twMerge } from "tailwind-merge";

const RightStage = () => {
  const { openLyric } = useAudioContext();
  return (
    <StyledStage
      className={`min-w-[55%] relative z-[98] h-[90%] ${
        !openLyric ? "hidden" : ""
      }`}
    >
      <Lyric />
    </StyledStage>
  );
};

export default RightStage;
