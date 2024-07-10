"use client";

import SongItem from "@/components/SongItem";
import useSongs from "@/hooks/useSongs";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const PageContent = () => {
  const { data: songs, isFetching } = useSongs();
  if (isFetching) {
    return (
      <div className="flex flex-col h-full gap-4">
        <SkeletonTheme baseColor="#292929" highlightColor="#595959">
          <Skeleton count={1} className="w-full h-[100px]" />
          <Skeleton count={3} className="w-full h-full" />
        </SkeletonTheme>
      </div>
    );
  }
  if (songs?.length == 0) {
    return <div className="mt-4 text-neutral-400">No songs available</div>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 mt-4">
      {songs?.map((item) => (
        <SongItem key={item.id} onClick={() => {}} data={item} />
      ))}
    </div>
  );
};

export default PageContent;
