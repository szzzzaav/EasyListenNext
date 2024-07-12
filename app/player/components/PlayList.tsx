"use client";
import { IoMdPlay } from "react-icons/io";
import { RxDoubleArrowRight } from "react-icons/rx";
import { useAudioContext } from "@/hooks/useAudio";
import { useState } from "react";
import { SlLoop } from "react-icons/sl";
import SpinnerMini from "./SpinnerMini";
import PlayItem from "./PlayItem";
import { twMerge } from "tailwind-merge";

interface PlayListProps {
  musicObjects: any;
  setMusicObjects: Function;
  isHidden: boolean;
}

const PlayList: React.FC<PlayListProps> = ({
  musicObjects,
  setMusicObjects,
  isHidden,
}) => {
  const [open, setIsOpen] = useState(false);
  const { isPending, dispatch, playMode } = useAudioContext();
  return (
    <div
      className={twMerge(
        "fixed flex items-center justify-around flex-col gap-[20px] z-[99] bottom-[20px] w-[350px] h-auto p-y-[15px] p-x-0 bg-[#00000041] rounded-[20px] cursor-pointer transition-all",
        isHidden ? "opacity-0" : ""
      )}
      style={{ left: "calc(50% - 175px)" }}
    >
      <div
        className="flex items-center justify-center gap-[50px]"
        onClick={() => {
          setIsOpen((o) => !o);
        }}
      >
        <IoMdPlay
          size={18}
          color="#e6e6e6"
          className="transition-all"
          style={{ transform: `rotate(${open ? 90 : 0}deg)` }}
        />
        <span className="text-[18px] text-[#cecece] font-semibold">
          PlayList
        </span>
        <div
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: "setMode" });
          }}
        >
          {playMode === "loop" ? <SlLoop /> : <RxDoubleArrowRight />}
        </div>
      </div>
      {open && (
        <div className="flex items-center justify-center flex-col max-h-[500px] h-auto w-full overflow-y-scroll [&::-webkit-scrollbar]:hidden py-3">
          {musicObjects.map(({ musicObject, music, lyric }: any, idx: any) => (
            <PlayItem
              key={"music" + idx}
              id={music.id}
              imagePath={music.image_path}
              title={music.title}
              setMusicObjects={setMusicObjects}
              onClick={() => {
                dispatch({
                  type: "setMusic",
                  payload: { musicObject, music, lyric },
                });
              }}
            />
          ))}
        </div>
      )}
      {open && isPending && <SpinnerMini />}
    </div>
  );
};

export default PlayList;
