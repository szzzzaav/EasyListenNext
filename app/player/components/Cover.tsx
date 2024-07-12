"use client";

import Image from "next/image";
import useWindowWidth from "./PlayerConfig";
import { useAudioContext } from "@/hooks/useAudio";

const Cover = () => {
  const { currentMusic } = useAudioContext();
  const WIDTH = useWindowWidth();
  return (
    <div
      className={`min-w-[450px] min-h-[450px] w-[${WIDTH}px] h-[${WIDTH}px] bg-slate-100 overflow-hidden border-[1px] border-solid border-neutral-800 shadow-[1px_2px_7px_#333333] relative rounded-xl`}
    >
      <Image
        fill
        className="object-cover"
        alt="cover"
        src={currentMusic?.music.image_path || "/logo.png"}
      />
    </div>
  );
};

export default Cover;
