"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Songs } from "@/types";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import NextImage from "next/image";
import LikeButton from "./LikeButton";

interface MediaItemProps {
  data: Songs;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = imagePath;
    img.onload = () => setIsLoading(false);
  }, [imagePath]);
  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        {isLoading ? (
          <SkeletonTheme baseColor="#292929" highlightColor="#595959">
            <Skeleton className="min-h-[48px] min-w-[48px]" />
          </SkeletonTheme>
        ) : (
          <NextImage
            className="object-cover"
            src={imagePath || "/images/liked.png"}
            fill
            alt="Image"
          />
        )}
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
