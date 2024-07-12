"use client";

import { useState } from "react";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import useWindowWidth from "./PlayerConfig";
import { useAudioContext } from "@/hooks/useAudio";

const Volumn = () => {
  const [mute, setMute] = useState(false);
  const [volumn, setVolumn] = useState(70);
  const WIDTH = 450;
  const { volumnRef, currentMusic } = useAudioContext();
  const volumnRangeWidth = WIDTH * 0.9375;
  let width = (volumn / 100) * volumnRangeWidth;
  return (
    <div
      className={`flex relative items-center justify-between gap-[5px] min-w-[450px] w-[${WIDTH}px] h-[20px]`}
    >
      {!mute && (
        <HiMiniSpeakerWave
          size={20}
          className="cursor-pointer"
          onClick={() => {
            setMute(true);
            currentMusic?.musicObject.volumn(0);
          }}
        />
      )}
      {mute && (
        <HiMiniSpeakerXMark
          size={20}
          onClick={() => {
            setMute(false);
            currentMusic?.musicObject.volumn(Number(volumn) / 100);
          }}
        />
      )}
      <div className="w-full">
        {/* container */}
        <div className={`relative w-[${volumnRangeWidth}px] h-[20px]`}>
          <div className="flex items-center justify-start absolute top-0 right-0 w-full h-full">
            <div
              className="absolute w-full h-[5px] right-0 bg-[#c9c9c9] rounded-[2px]"
              style={{ top: "calc(50% - 2.5px)" }}
            ></div>
            <div
              className="relative z-10 h-[5px] bg-[#fff] rounded-[2px]"
              style={{ width: `${width}px` }}
            ></div>
          </div>

          {/* StyledRange */}
          <input
            ref={volumnRef}
            type="range"
            max={100}
            min={0}
            value={mute ? 0 : volumn}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (mute) {
                setMute(false);
              }
              setVolumn(Number(e.target.value));
              if (Number(e.target.value) === 0) {
                setMute(true);
              }
              currentMusic?.musicObject.volumn(Number(e.target.value) / 100);
            }}
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
          />
        </div>
      </div>
    </div>
  );
};

export default Volumn;
