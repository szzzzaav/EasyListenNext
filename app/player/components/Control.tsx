import { CiTextAlignCenter } from "react-icons/ci";
import { Next, Pre } from "./PreAndNext";
import { FaPlay } from "react-icons/fa";
import Color from "./Color";

const Control = () => {
  return (
    <div className="flex items-center justify-around w-full ">
      <CiTextAlignCenter
        size={20}
        color={"#ffffff"}
        className="z-50 relative cursor-pointer"
      />
      <Pre />
      <FaPlay size={21} />
      <Next />
      <Color />
    </div>
  );
};

export default Control;
