"use client";

import { useAudioContext } from "@/hooks/useAudio";
import Lyric from "./Lyric";
import StyledStage from "./StyledStage";
import { twMerge } from "tailwind-merge";

const RightStage = () => {
  const { openLyric } = useAudioContext();
  return (
    <>
      {openLyric && (
        <StyledStage
          className={twMerge(
            "min-w-[55%]  relative bg-transparent z-[98] h-[90%] "
          )}
        >
          <Lyric />
        </StyledStage>
      )}
    </>
  );
};

export default RightStage;
