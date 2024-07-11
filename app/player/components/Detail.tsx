import LikeButton from "@/components/LikeButton";

const Detail = () => {
  return (
    <>
      <div className="flex items-start justify-around flex-col gap-0">
        <div className="text-[1.2rem] font-semibold text-[#ffffff] leading-none">
          Enjoy Your Music
        </div>
        <div className="text-[1rem] font-semibold text-[#cdcdcd] leading-none">
          EasyListen
        </div>
      </div>
      <div className="flex items-center justify-around w-[80px] flex-shrink-0">
        <LikeButton songId={""} />
      </div>
    </>
  );
};

export default Detail;
