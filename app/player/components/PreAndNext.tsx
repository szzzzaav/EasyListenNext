import { useAudioContext } from "@/hooks/useAudio";
import { FaPlay } from "react-icons/fa";

const Pre = () => {
  const { musicObjects, currentMusic, dispatch } = useAudioContext();
  const handlePrev = function () {
    if (!currentMusic) return;
    let idx = 0;
    musicObjects.forEach((e, i) => {
      if (e.music?.id === currentMusic?.music?.id) {
        idx = i;
      }
    });
    idx--;
    if (idx === -1) {
      idx = musicObjects.length - 1;
    }
    dispatch({ type: "setMusic", payload: { ...musicObjects[idx] } });
  };
  return (
    <div className="relative cursor-pointer" onClick={handlePrev}>
      <div
        className="absolute text-center w-[20px] h-[20px] leading-[20px] text-[1.2rem] text-[#ffffff] rotate-180 -translate-x-[10px]"
        style={{ top: "calc(50% - 10px)", left: "calc(50% - 10px)" }}
      >
        <FaPlay />
      </div>
      <div
        className="absolute text-center w-[20px] h-[20px] leading-[20px] text-[1.2rem] text-[#ffffff] rotate-180"
        style={{ top: "calc(50% - 10px)", left: "calc(50% - 10px)" }}
      >
        <FaPlay />
      </div>
    </div>
  );
};

const Next = () => {
  const { musicObjects, currentMusic, dispatch } = useAudioContext();
  const handleNext = function () {
    if (!currentMusic) return;
    let idx = 0;
    musicObjects.forEach((e, i) => {
      if (e.music?.id === currentMusic?.music?.id) {
        idx = i;
      }
    });
    idx++;
    if (idx === musicObjects.length) {
      idx = 0;
    }
    dispatch({ type: "setMusic", payload: { ...musicObjects[idx] } });
  };
  return (
    <div className="relative cursor-pointer" onClick={handleNext}>
      <div
        className="absolute text-center w-[20px] h-[20px] leading-[20px] text-[1.2rem] text-[#ffffff]  -translate-x-[10px]"
        style={{ top: "calc(50% - 10px)", left: "calc(50% - 10px)" }}
      >
        <FaPlay />
      </div>
      <div
        className="absolute text-center w-[20px] h-[20px] leading-[20px] text-[1.2rem] text-[#ffffff] "
        style={{ top: "calc(50% - 10px)", left: "calc(50% - 10px)" }}
      >
        <FaPlay />
      </div>
    </div>
  );
};

export { Pre, Next };
