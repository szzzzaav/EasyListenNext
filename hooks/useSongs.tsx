import getSongs from "@/actions/getSongs";
import { useQuery } from "react-query";

function useSongs() {
  const { data, isFetching } = useQuery({
    queryKey: ["allSongs"],
    queryFn: () => getSongs(),
  });
  return { data, isFetching };
}

export default useSongs;
