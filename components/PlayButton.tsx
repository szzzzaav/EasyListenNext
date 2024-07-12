"use client";

import useChannel from "@/hooks/useChannel";
import { Songs } from "@/types";
import { FaPlay } from "react-icons/fa";

interface PlayButtonProps {
  data?: Songs;
}

const PlayButton: React.FC<PlayButtonProps> = ({ data }) => {
  const { channel, sendMsg } = useChannel();
  const handleClick = function () {
    if (!data) return null;
    if (!channel?.listeners?.size) {
      window.open(`/player?id=${data.id}`);
    } else {
      sendMsg(
        {
          type: "data",
          data,
        },
        channel
      );
    }
  };
  return (
    <button className="transition opacity-0 rounded-full flex items-center bg-indigo-600 p-4 drop-shadow-sm tarnslate translte-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
      <FaPlay className="text-black" onClick={handleClick} />
    </button>
  );
};
export default PlayButton;
