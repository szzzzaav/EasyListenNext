import { CiTextAlignCenter } from "react-icons/ci";
import { Next, Pre } from "./PreAndNext";
import { FaPlay } from "react-icons/fa";
import Color from "./Color";
import { useAudioContext } from "@/hooks/useAudio";
import SpinnerMini from "./SpinnerMini";
import { FaPause } from "react-icons/fa6";

const Control = () => {
  const {
    play,
    firstLoading: isPending,
    dispatch,
    currentMusic,
    progressRef,
    progressBgRef,
    timeProgressRef,
    visualStageRef,
  } = useAudioContext();
  return (
    <div className="flex items-center justify-around w-full ">
      <CiTextAlignCenter
        onClick={() => dispatch({ type: "changeLyric" })}
        size={20}
        color={"#ffffff"}
        className="z-50 relative cursor-pointer"
      />
      <Pre />
      {isPending && <SpinnerMini />}
      {!isPending && !play && (
        <FaPlay
          className="cursor-pointer"
          size={21}
          onClick={() => {
            if (!currentMusic) return;
            if (!currentMusic?.musicObject?.progressRef) {
              currentMusic?.musicObject?.init?.({
                progressRef,
                progressBgRef,
                timeProgressRef,
                visualStageRef,
              });
            }
            if (play === null) {
              currentMusic?.musicObject?.jump(0, 0);
            } else {
              currentMusic?.musicObject?.continueplay();
            }
            dispatch({ type: "play" });
          }}
        />
      )}
      {!isPending && play && (
        <FaPause
          className="cursor-pointer"
          size={21}
          onClick={() => {
            if (!currentMusic) return;
            dispatch({ type: "pause" });
            currentMusic?.musicObject?.pause();
          }}
        />
      )}
      <Next />
      <Color />
    </div>
  );
};

export default Control;
