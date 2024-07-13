"use client";

import { useAudioContext } from "@/hooks/useAudio";
import useWindowWidth from "./PlayerConfig";

interface ControlProgressProps {
  useControl: any;
  progress: any;
  setProgress: any;
  musicLen: any;
}

const ControlProgress: React.FC<ControlProgressProps> = ({
  useControl,
  progress,
  setProgress,
  musicLen,
}) => {
  const WIDTH = useWindowWidth();
  const { currentMusic, dispatch, play, firstLoading } = useAudioContext();
  const bgWidth = (progress * WIDTH) / 100;
  return (
    <>
      <div
        className="flex items-center justify-start absolute top-0 right-0 w-full h-full"
        style={{ display: !useControl ? "none" : "" }}
      >
        <div
          className="absolute h-[5px] w-full right-0 bg-[#c9c9c9] rounded-[2px]"
          style={{ top: "calc(50% - 2.5px)" }}
        ></div>
        <div
          className="relative z-[2] h-[5px] bg-[#fff] rounded-[2px]"
          style={{ width: `${bgWidth}px` }}
        ></div>
      </div>
      <input
        className="relative z-10 w-full h-full appearance-none m-0 outline-none bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent
      [&::-webkit-slider-container]:bg-transparent
      [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:w-2.5
      [&::-webkit-slider-thumb]:h-2.5
      [&::-webkit-slider-thumb]:z-20
      [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-white
      [&::-webkit-slider-thumb]:border
    [&::-webkit-slider-thumb]:border-gray-300
      [&::-webkit-slider-thumb]:cursor-pointer"
        type="range"
        max={100}
        min={0}
        value={progress}
        onChange={(e) => {
          setProgress(e.target.value);
        }}
        disabled={firstLoading}
        onMouseUp={() => {
          console.log("---------------jumped-----------------");
          if (!play) dispatch({ type: "play" });
          currentMusic?.musicObject?.jump(
            (progress / 100) * musicLen ?? 0,
            play ? true : false
          );
        }}
        style={{ display: !useControl ? "none" : "" }}
      />
    </>
  );
};

export default ControlProgress;
