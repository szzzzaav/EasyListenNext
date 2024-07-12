"use client";

import { useAudioContext } from "@/hooks/useAudio";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
interface PlayItemProps {
  imagePath: string;
  title: string;
  setMusicObjects: Function;
  id: string;
  onClick: () => void;
}

const PlayItem: React.FC<PlayItemProps> = ({
  imagePath,
  title,
  setMusicObjects,
  id,
  onClick,
}) => {
  const { dispatch, currentMusic } = useAudioContext();
  console.log(imagePath);
  return (
    <div
      className="flex items-center justify-between w-[90%] h-[40px] rounded-[10px] transition-all hover:bg-gray-800/50 p-6"
      onClick={onClick}
    >
      <div className="h-[30px] w-[30px] border-none rounded-[5px] overflow-hidden ">
        <Image
          width={30}
          height={30}
          className="object-cover w-full min-h-full"
          src={imagePath}
          alt="cover"
        />
      </div>
      <div className="flex items-center justify-start w-[200px] overflow-hidden">
        <span className="text-[18px] font-semibold text-[#cecece] whitespace-nowrap transition-all ">
          {title}
        </span>
      </div>

      <div
        className="flex items-center justify-center w-[15px] h-[15px] rounded-[50%] bg-slate-900 transition hover:bg-slate-800"
        onClick={(e) => {
          e.stopPropagation();
          setMusicObjects((ob: any) =>
            ob.filter((o: any) => o?.music?.id !== id)
          );
          if (currentMusic?.music?.id === id) {
            currentMusic.musicObject.pause();
            currentMusic.musicObject.stop();
            dispatch({ type: "clear" });
          }
        }}
      >
        <RxCross2 size={14} color="#b7b7b7" />
      </div>
    </div>
  );
};

export default PlayItem;
