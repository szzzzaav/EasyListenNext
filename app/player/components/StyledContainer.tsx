import { twMerge } from "tailwind-merge";

interface StyledContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const StyledContainer: React.FC<StyledContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        `flex md:w-[500px] sm:max-w-[450px] h-auto items-center justify-between flex-row py-[16px] px-0`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default StyledContainer;
