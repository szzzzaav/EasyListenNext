import { useAudioContext } from "@/hooks/useAudio";
import { twMerge } from "tailwind-merge";

const Bg = () => {
  const { color } = useAudioContext();
  let className = "";
  className += color.$blue ? "from-[#183e6c] to-[#313d43]" : "";
  className += color.$io ? "from-indigo-600 to-orange-600" : "";
  className += color.$purple ? "from-purple-800 to-indigo-900" : "";
  className += color.$orange ? "from-[#bc3e07] to-[#7e1b0c]" : "";
  return (
    <>
      <div
        className={twMerge(
          `ease-in-out fixed w-full -z-50 h-full bg-gradient-to-br from-indigo-600 transition-all to-orange-600`,
          className
        )}
      ></div>
      <div className="absolute z-[-5] w-full h-full bg-[#ffffff02] backdrop-blur-[1.5px]"></div>
    </>
  );
};

export default Bg;
