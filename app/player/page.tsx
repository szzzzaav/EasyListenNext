import UserProvider from "@/providers/userProvider";
import PlayerContent from "./components/PlayerContent";
import { Metadata } from "next";
import ReactQueryClientProvider from "@/providers/ReactQueryProvider";
import { AudioContextProvider } from "@/hooks/useAudio";
import SupabaseProvider from "@/providers/supabaseProviders";

interface SearchProps {
  searchParams: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Easy-Listen-Player",
  description: "Listen to Music",
};

const Player = ({ searchParams }: SearchProps) => {
  return (
    <SupabaseProvider>
      <UserProvider>
        <ReactQueryClientProvider>
          <AudioContextProvider>
            <PlayerContent id={searchParams.id} />
          </AudioContextProvider>
        </ReactQueryClientProvider>
      </UserProvider>
    </SupabaseProvider>
  );
};

export default Player;
