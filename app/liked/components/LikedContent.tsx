"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useLikedSongs from "@/hooks/useLikedSongs";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LikedContent = () => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const { data: songs, isFetching } = useLikedSongs();
  useEffect(() => {
    if (!isLoading && !user && !isFetching) {
      router.replace("/");
    }
  }, [isLoading, user]);

  if (isFetching) {
    return (
      <div className="flex flex-col h-full gap-4 p-10">
        <SkeletonTheme baseColor="#292929" highlightColor="#595959">
          <Skeleton count={1} className="w-full h-[100px]" />
          <Skeleton count={1} className="w-full h-full mb-10" />
          <Skeleton count={1} className="w-full h-full mb-10" />
        </SkeletonTheme>
      </div>
    );
  }

  if (songs?.length === 0 && !isFetching) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-600">
        No liked songs.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs?.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={() => {}} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
