import getLikedSongs from "@/actions/getLikedSongs";
import { useQuery } from "react-query";
import useUser from "./useUser";

function useLikedSongs() {
  const { user } = useUser();
  const { data, isFetching } = useQuery({
    queryKey: ["userLikedSongs", user?.id],
    queryFn: () => getLikedSongs(user?.id),
    staleTime: 0,
  });
  return { data, isFetching };
}

export default useLikedSongs;
