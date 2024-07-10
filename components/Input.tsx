import { ReactNode, RefCallback, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps {
  id: string;
  disabled: boolean;
  className?: string;
  type?: string;
  onChange: Function;
  [k: string]: any;
  children?: ReactNode;
}

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, disabled, type, children, onChange, ...props }, ref) => {
    return (
      <input
        id={id}
        onChange={(e) => onChange(e)}
        className={twMerge(
          `flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowd disabled:opacity-50 focus:outline-none`,
          className
        )}
        disabled={disabled}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
