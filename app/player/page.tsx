import UserProvider from "@/providers/userProvider";
import AudioPlayer from "./components/AudioPlayer";
import PlayList from "./components/PlayList";

const Player = () => {
  return (
    <UserProvider>
      <AudioPlayer />
      <PlayList />
    </UserProvider>
  );
};

export default Player;
