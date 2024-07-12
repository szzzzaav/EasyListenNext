import LikeButton from "@/components/LikeButton";
import { useAudioContext } from "@/hooks/useAudio";

const Detail = () => {
  const { currentMusic } = useAudioContext();
  return (
    <>
      <div className="flex items-start justify-around flex-col gap-0">
        <div className="text-[1.2rem] font-semibold text-[#ffffff] leading-none">
          {currentMusic?.music?.title ?? "Enjoy Your Music"}
        </div>
        <div className="text-[1rem] font-semibold text-[#cdcdcd] leading-none">
          {currentMusic?.music?.author ?? "EasyListen"}
        </div>
      </div>
      <div className="flex items-center justify-around w-[80px] flex-shrink-0">
        <LikeButton songId={currentMusic?.music?.id} color="#ff2323" />
      </div>
    </>
  );
};

export default Detail;
