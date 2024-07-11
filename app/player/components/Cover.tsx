"use client";

import Image from "next/image";
import WIDTH from "./PlayerConfig";

const Cover = () => {
  return (
    <div
      className={`w-[${WIDTH}px] h-[${WIDTH}px] bg-slate-100 border-r-[15px] overflow-hidden border-[1px] border-solid border-neutral-800 shadow-[1px_2px_7px_#333333] relative rounded-xl`}
    >
      <Image fill className="object-cover" alt="cover" src={"/logo.png"} />
    </div>
  );
};

export default Cover;
