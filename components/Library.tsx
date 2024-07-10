import { AiOutlineLoading, AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

import useUser from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import useSongsByUserId from "@/hooks/useSongsByUserId";

interface LibraryProps {}

const Library: React.FC<LibraryProps> = () => {
  const { data: songs, isFetching } = useSongsByUserId();
  const { user } = useUser();
  const AuthModal = useAuthModal();
  const UploadModal = useUploadModal();
  const onClick = () => {
    if (!user) return AuthModal.onOpen();
    return UploadModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {isFetching ? <AiOutlineLoading className="animate-spin" /> : <></>}
      </div>
    </div>
  );
};

export default Library;
