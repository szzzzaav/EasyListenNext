"use client";

import ControlProgress from "./ControlProgress";
import VisualProgress from "./VisualProgress";
import WIDTH from "./PlayerConfig";

const Progress = () => {
  return (
    <div
      className={`flex relative items-center justify-between gap-5 w-[${WIDTH}px] h-[20px]`}
    >
      <div className="w-full">
        <div className={`relative w-[${WIDTH}px] h-[20px]`}>
          <VisualProgress />
          <ControlProgress />
        </div>
      </div>
      <div
        className="absolute z-10 w-[30px] text-[#f9f9f9] text-sm text-center top-[15px] ease-in-out"
        style={{ left: "calc(50% - 15px)" }}
      >
        {"00:00"}
      </div>
    </div>
  );
};
export default Progress;
