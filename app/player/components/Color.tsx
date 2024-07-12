"use client";

import { useAudioContext } from "@/hooks/useAudio";
import { useState } from "react";
import { IoIosColorPalette } from "react-icons/io";
import { twMerge } from "tailwind-merge";

const Color = () => {
  const { color, dispatch } = useAudioContext();
  const [close, setClose] = useState(true);
  const mergeStr = "border-[2px] border-solid border-white";
  return (
    <div className="relative">
      <IoIosColorPalette
        size={20}
        className="cursor-pointer"
        onClick={() => {
          setClose((c) => !c);
        }}
      />
      {!close && (
        <div
          className="absolute flex w-[100px] h-[30px] left-[-110px] sm:left-[40px] items-center justify-around bg-[#00000063] rounded-[5px]"
          style={{ top: "calc(50% - 15px)" }}
        >
          <div
            className={twMerge(
              "w-[18px] h-[18px] rounded-[5px] cursor-pointer bg-gradient-to-br from-[#183e6c] to-[#313d43] ",
              color.$blue && mergeStr
            )}
            id="blue"
            key={"blue"}
            onClick={() =>
              dispatch({ type: "setColor", payload: { $blue: 1 } })
            }
          ></div>
          <div
            className={twMerge(
              "w-[18px] h-[18px] rounded-[5px] cursor-pointer bg-gradient-to-br from-indigo-600 to-orange-600",
              color.$io && mergeStr
            )}
            id="indigoAndOrange"
            key={"indigoAndOrange"}
            onClick={() => dispatch({ type: "setColor", payload: { $io: 1 } })}
          ></div>
          <div
            className={twMerge(
              "w-[18px] h-[18px] rounded-[5px] cursor-pointer bg-gradient-to-br from-purple-800 to-indigo-900",
              color.$purple && mergeStr
            )}
            id="purple"
            key={"purple"}
            onClick={() =>
              dispatch({ type: "setColor", payload: { $purple: 1 } })
            }
          ></div>
          <div
            className={twMerge(
              "w-[18px] h-[18px] rounded-[5px] cursor-pointer bg-gradient-to-br from-[#bc3e07] to-[#7e1b0c]",
              color.$orange && mergeStr
            )}
            id="orange"
            key={"orange"}
            onClick={() =>
              dispatch({ type: "setColor", payload: { $orange: 1 } })
            }
          ></div>
        </div>
      )}
    </div>
  );
};

export default Color;
