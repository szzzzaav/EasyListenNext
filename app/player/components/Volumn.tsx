"use client";

import { useState } from "react";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import WIDTH from "./PlayerConfig";

const volumnRangeWidth = WIDTH * 0.9375;

const Volumn = () => {
  const [mute, setMute] = useState(false);
  const [volumn, setVolumn] = useState(70);

  return (
    <div
      className={`flex relative items-center justify-between gap-[5px] w-[${WIDTH}px] h-[20px]`}
    >
      {!mute && (
        <HiMiniSpeakerWave
          size={20}
          onClick={() => {
            setMute(true);
            // TODO:setMusicVolumnToZero
          }}
        />
      )}
      {mute && (
        <HiMiniSpeakerXMark
          size={20}
          onClick={() => {
            setMute(false);
            // TODO:setMusicVolumn
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
            <div className="relative z-10 h-[5px] bg-[#fff] rounded-[2px]"></div>
          </div>

          {/* StyledRange */}
          <input
            type="range"
            max={100}
            min={0}
            value={10}
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
