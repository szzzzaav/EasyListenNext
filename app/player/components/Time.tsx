"use client";

import WIDTH from "./PlayerConfig";

const Time = () => {
  return (
    <div
      className={`relative bottom-[20px] flex items-center justify-between w-[${WIDTH}px] text-[#cdcdcd] text-[11px]`}
    >
      <span>00:00</span>
      <span>00:00</span>
    </div>
  );
};

export default Time;
