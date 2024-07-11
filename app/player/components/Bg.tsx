import { twMerge } from "tailwind-merge";

interface BgProps {
  className?: string;
}

const Bg: React.FC<BgProps> = ({ className }) => {
  return (
    <>
      <div
        className={twMerge(
          `ease-in-out fixed w-full  -z-50 h-full bg-gradient-to-br from-indigo-600 to-orange-600`,
          className
        )}
      ></div>
      <div className="absolute -z-10 w-full h-full bg-[#ffffff02] blur-[1.5px]"></div>
    </>
  );
};

export default Bg;
