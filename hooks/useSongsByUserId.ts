import getSongsByUserId from "@/actions/getSongsByUserId";
import { useQuery } from "react-query";
import useUser from "./useUser";

function useSongsByUserId() {
  const { user } = useUser();
  const { data, isFetching } = useQuery({
    queryKey: ["userSongs", user?.id],
    queryFn: () => getSongsByUserId(user?.id),
  });
  return { data, isFetching };
}

export default useSongsByUserId;
