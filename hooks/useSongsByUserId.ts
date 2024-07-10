import getSongsByUserId from "@/actions/getSongsByUserId";
import { useQuery } from "react-query";

function useSongsByUserId() {
  const { data, isFetching } = useQuery({
    queryKey: ["userSongs"],
    queryFn: () => getSongsByUserId(),
  });
  return { data, isFetching };
}

export default useSongsByUserId;
