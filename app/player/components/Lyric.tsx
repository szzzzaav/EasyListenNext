"use client";

import { useAudioContext } from "@/hooks/useAudio";
import SpinnerMini from "./SpinnerMini";

const Lyric = () => {
  const { currentLyric, firstLoading, lyricStageRef } = useAudioContext();
  return (
    <div
      ref={lyricStageRef}
      className="w-[54vw] h-[88vh] overflow-hidden"
      style={{
        transition: "all 1s cubic-bezier(0.075, 0.82, 0.165, 1)",
        animation: "stage_appear 0.3s ease-in-out 1 forwards",
      }}
    >
      <div className="absolute w-full h-[100vh] backdrop-blur-[1.5px]  z-[10]"></div>
      {Array.from({ length: 4 }).map((_, idx) => {
        return (
          <div
            className="relative block z-[-8] min-w-[600px] min-h-[90px] text-[2rem] leading-[30px] h-auto text-[#d4d4d4] font-semibold break-words"
            style={{
              transition: "all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)",
            }}
            key={"placehoder" + idx}
          ></div>
        );
      })}
      {firstLoading && (
        <SpinnerMini className="absolute w-[40px] h-[40px] text-[#fff] left-[50%] top-[50%]" />
      )}
      {!firstLoading &&
        currentLyric?.lrcContent?.map((e: any, idx: any) => {
          return (
            <div
              className="relative block z-[-8] min-w-[600px] min-h-[90px] text-[2rem] leading-[30px] h-auto text-[#d4d4d4] font-semibold break-words"
              style={{
                whiteSpace: "pre-wrap",
                transition: "all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)",
              }}
              key={"lyric" + idx}
            >
              {"  " + e}
            </div>
          );
        })}
    </div>
  );
};

export default Lyric;
