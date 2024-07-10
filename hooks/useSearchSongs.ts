import getSongsByTitle from "@/actions/getSongsByTitle";
import { useQuery } from "react-query";

function useSearchSongs(title: string) {
  const { data, isFetching } = useQuery({
    queryKey: ["userSongs", title],
    queryFn: () => getSongsByTitle(title),
  });
  return { data, isFetching };
}

export default useSearchSongs;
