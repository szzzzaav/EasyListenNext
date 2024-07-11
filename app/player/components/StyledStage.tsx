import { twMerge } from "tailwind-merge";

interface StyledStageProps {
  className?: string;
  children?: React.ReactNode;
}
const StyledStage: React.FC<StyledStageProps> = ({ className, children }) => {
  return (
    <div
      className={twMerge(
        `flex items-center justify-around flex-col flex-shrink-0`,
        className
      )}
    >
      {children}
    </div>
  );
};
export default StyledStage;
