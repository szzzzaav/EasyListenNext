"use client";

import { useAudioContext } from "@/hooks/useAudio";
import { useCallback } from "react";

// 可视化

interface VisualProgressProps {
  useControl: any;
}

const VisualProgress: React.FC<VisualProgressProps> = ({ useControl }) => {
  const WIDTH = 450;
  const { visualStageRef, progressRef, progressBgRef } = useAudioContext();
  const stageElGenerate = useCallback(function (
    length: number,
    elLength: number,
    count: number
  ) {
    const dis = (length - count * elLength) / (count - 1);
    return Array.from({ length: count }).map((_, i) => {
      return (
        <div
          className={`stageEl absolute bottom-[0.8px] -z-[1px] w-[3px] rounded-[2px] bg-[#cdcdcd] border-none scale-[1.01]`}
          key={`stgeEl${i}`}
          style={{ left: `${i * elLength + i * dis}px` }}
        ></div>
      );
    });
  },
  []);
  return (
    <>
      <div
        className="flex items-center justify-start absolute top-0 right-0 w-full h-full"
        style={{ display: useControl ? "none" : "" }}
      >
        <div
          ref={visualStageRef}
          className={`absolute z-[1] flex items-center justify-between flex-shrink w-[${WIDTH}px] h-3[px] backdrop-blur-[1px]`}
          style={{
            left: `calc(50% - ${WIDTH / 2}px)`,
            top: "calc(50% - 1.5px)",
          }}
        >
          {stageElGenerate(WIDTH, 3, WIDTH >= 400 ? 50 : 30)}
        </div>

        <div
          className="absolute h-[5px] w-full right-0 bg-[#c9c9c9] rounded-[2px]"
          style={{ top: "calc(50% - 2.5px)" }}
        ></div>

        <div
          className="relative z-[2px] h-[5px] bg-[#fff] rounded-[2px]"
          ref={progressBgRef}
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
        ref={progressRef}
        type="range"
        max={100}
        min={0}
        value={progressRef?.current?.value || 0}
        readOnly
        style={{ display: useControl ? "none" : "" }}
      />
    </>
  );
};

export default VisualProgress;
