"use client";

import { useState, useEffect } from "react";
import { Songs } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import NextImage from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // 引入Skeleton的样式
import PlayButton from "./PlayButton";

interface SongItemProps {
  key: string;
  onClick: Function;
  data: Songs;
}

const SongItem: React.FC<SongItemProps> = ({ onClick, data }) => {
  const imagePath = useLoadImage(data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = imagePath;
    img.onload = () => setIsLoading(false);
  }, [imagePath]);

  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        {isLoading ? (
          <SkeletonTheme baseColor="#292929" highlightColor="#595959">
            <Skeleton className="w-full h-full" />
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
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate pb-4 w-full">
          By {data.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton data={data} />
      </div>
    </div>
  );
};

export default SongItem;
