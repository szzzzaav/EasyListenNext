"use client";

import { useRouter } from "next/navigation";
import { HiHome } from "react-icons/hi2";
import { BiSearch } from "react-icons/bi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const handleLogout = () => {};
  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-indigo-600 p-6`)}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opactiy-75 transition"
          >
            <RxCaretLeft size={36} className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opactiy-75 transition"
          >
            <RxCaretRight size={36} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <>
            <div>
              <Button className="bg-transparent text-neutral-300 font-medium">
                Sign Up
              </Button>
            </div>
            <div>
              <Button className="bg-white px-6 py-2">Log in</Button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};
export default Header;
