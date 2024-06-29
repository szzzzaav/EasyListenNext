import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SideBarItemProps {
  children?: React.ReactNode;
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
  websiteLogo?: string;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  children,
  icon: Icon,
  label,
  active,
  href,
  websiteLogo,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`,
        active && "text-white"
      )}
    >
      {websiteLogo ? (
        <Image
          src={websiteLogo}
          alt="Easy-Listen"
          className={twMerge(
            `rounded-full overflow-hidden hover:scale-[1.2] transition`
          )}
          width={"26"}
          height={"26"}
        ></Image>
      ) : (
        <Icon size={26} />
      )}
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SideBarItem;
