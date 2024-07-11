"use client";

import { useState } from "react";
import { IoIosColorPalette } from "react-icons/io";

const Color = () => {
  const [close, setClose] = useState(true);
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
            className="w-[18px] h-[18px] rounded-[5px] cursor-pointer bg-gradient-to-br from-[#183e6c] to-[#313d43]"
            id="blue"
            key={"blue"}
            onClick={() => {}}
          ></div>
          <div
            className="w-[18px] h-[18px] rounded-[5px] cursor-pointer bg-gradient-to-br from-indigo-600 to-orange-600"
            id="indigoAndOrange"
            key={"indigoAndOrange"}
            onClick={() => {}}
          ></div>
          <div
            className="w-[18px] h-[18px] rounded-[5px] cursor-pointer bg-gradient-to-br from-purple-800 to-indigo-900"
            id="purple"
            key={"purple"}
            onClick={() => {}}
          ></div>
          <div
            className="w-[18px] h-[18px] rounded-[5px] cursor-pointer bg-gradient-to-br from-[#bc3e07] to-[#7e1b0c]"
            id="orange"
            key={"orange"}
            onClick={() => {}}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Color;
