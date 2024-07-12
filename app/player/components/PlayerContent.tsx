"use client";

import { useRouter } from "next/navigation";
import AudioPlayer from "./AudioPlayer";
import PlayList from "./PlayList";
import useChannel from "@/hooks/useChannel";
import useMusicObjects from "@/hooks/useMusicObjects";
import { useEffect, useState } from "react";
import useMouseHide from "@/hooks/useMouseHidden";

interface PlayerContentProps {
  id: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ id }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { data } = useChannel("listener", id);
  const { musicObjects, setMusicObjects } = useMusicObjects({ data });
  const { isHidden } = useMouseHide();
  const router = useRouter();
  if (!id) {
    router.replace("/");
  }
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <AudioPlayer isHidden={isHidden} />
      <PlayList
        musicObjects={musicObjects}
        setMusicObjects={setMusicObjects}
        isHidden={isHidden}
      />
    </>
  );
};

export default PlayerContent;
