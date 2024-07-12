"use client";

import ControlProgress from "./ControlProgress";
import VisualProgress from "./VisualProgress";
import useWindowWidth from "./PlayerConfig";
import { useState } from "react";
import { useAudioContext } from "@/hooks/useAudio";

const Progress = () => {
  const WIDTH = useWindowWidth();
  const [useControl, setUseControl] = useState(false);
  const [progress, setProgress] = useState(0);
  const { progressRef, currentMusic } = useAudioContext();
  const musicLen = currentMusic?.musicObject?.getduration();
  const time = currentMusic?.musicObject?.songtimeFormat(
    Number(progress / 100) * musicLen
  );
  return (
    <div
      onMouseEnter={() => {
        setUseControl(true);
        setProgress(progressRef.current?.value ?? 0);
      }}
      onMouseLeave={() => setUseControl(false)}
      className={`flex relative items-center justify-between gap-[5px] w-[${WIDTH}px] h-[20px]`}
    >
      <div className="w-full">
        <div className={`relative w-[${WIDTH}px] min-w-[450px] h-[20px]`}>
          <VisualProgress useControl={useControl} />
          <ControlProgress
            useControl={useControl}
            progress={progress}
            setProgress={setProgress}
            musicLen={musicLen}
          />
        </div>
      </div>
      <div
        className="absolute z-10 w-[30px] text-[#f9f9f9] text-sm text-center top-[15px] ease-in-out transition-all"
        style={{ left: "calc(50% - 15px)", opacity: useControl ? 1 : 0 }}
      >
        {time || "00:00"}
      </div>
    </div>
  );
};
export default Progress;
