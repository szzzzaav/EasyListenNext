"use client";

import { BiLoaderAlt } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

interface SpinnerMiniProps {
  className?: string;
}

const SpinnerMini: React.FC<SpinnerMiniProps> = ({ className }) => {
  return (
    <BiLoaderAlt
      className={twMerge("w-[2.4rem] h-[2.4rem] animate-spin", className)}
      style={{ left: "calc(50% - 1.2rem) !important" }}
    />
  );
};

export default SpinnerMini;
