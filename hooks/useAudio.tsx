"use client";

import React, {
  Reducer,
  useEffect,
  useRef,
  useState,
  useContext,
  useReducer,
  createContext,
} from "react";

interface AudioContextType {
  currentMusic: any;
  currentLyric: any;
  openLyric: boolean;
  color: { [key: string]: number };
  play: boolean | null;
  firstLoading: boolean;
  isPending: boolean;
  playMode: string;
  dispatch: React.Dispatch<Action>;
  volumnRef: React.RefObject<any>;
  progressRef: React.RefObject<any>;
  progressBgRef: React.RefObject<any>;
  lyricStageRef: React.RefObject<any>;
  visualStageRef: React.RefObject<any>;
  timeProgressRef: React.RefObject<any>;
  musicObjects: any[];
  setMusicObjects: React.Dispatch<React.SetStateAction<any[]>>;
}

type StateType = {
  currentMusic: any;
  currentLyric: any;
  openLyric: boolean;
  color: { [key: string]: number };
  play: boolean | null;
  firstLoading: boolean;
  isPending: boolean;
  playMode: string;
};

type Action =
  | { type: "setPending" }
  | { type: "setFirstLoading" }
  | { type: "finishPending" }
  | { type: "finishFirstLoad" }
  | { type: "setMusic"; payload: { music: any; musicObject: any; lyric: any } }
  | { type: "setColor"; payload: { [key: string]: number } }
  | { type: "changeLyric" }
  | { type: "play" }
  | { type: "pause" }
  | { type: "clear" }
  | { type: "reset" }
  | { type: "setMode" };

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const InitialState: StateType = {
  currentMusic: null,
  currentLyric: null,
  openLyric: true,
  color: { $orange: 1 },
  play: null,
  firstLoading: false,
  isPending: false,
  playMode: "loop",
};

const reducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case "setPending":
      return { ...state, isPending: true };
    case "setFirstLoading":
      return { ...state, firstLoading: true };
    case "finishPending":
      return { ...state, isPending: false };
    case "finishFirstLoad":
      return { ...state, firstLoading: false };
    case "setMusic": {
      const isOld = state.currentMusic?.music?.id === action.payload?.music?.id;

      if (!isOld) {
        state.currentMusic?.musicObject?.stop();
        state.currentMusic?.musicObject?.resetEls();
        action.payload?.musicObject?.volumn(
          state.currentMusic?.musicObject?.volumnSet
        );
      }
      return {
        ...state,
        currentMusic: isOld
          ? state.currentMusic
          : {
              musicObject: action.payload?.musicObject,
              music: action.payload?.music,
            },
        currentLyric: isOld ? state.currentLyric : action.payload.lyric,
      };
    }
    case "setColor":
      return { ...state, color: action.payload };
    case "changeLyric": {
      return { ...state, openLyric: !state.openLyric };
    }
    case "play":
      return { ...state, play: true };
    case "pause":
      return { ...state, play: false };
    case "clear": {
      state.currentMusic?.musicObject?.resetEls();
      return { ...state, currentMusic: {}, play: false, currentLyric: {} };
    }
    case "reset": {
      return InitialState;
    }
    case "setMode": {
      return {
        ...state,
        playMode: state.playMode === "loop" ? "order" : "loop",
      };
    }
    default:
      return state;
  }
};

interface AudioContextProviderProps {
  children?: React.ReactNode;
}

const AudioContextProvider: React.FC<AudioContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, InitialState);
  const volumnRef = useRef<any>(null);
  const progressRef = useRef<any>(null);
  const progressBgRef = useRef<any>(null);
  const lyricStageRef = useRef<any>(null);
  const visualStageRef = useRef<any>(null);
  const timeProgressRef = useRef<any>(null);
  const [musicObjects, setMusicObjects] = useState<any[]>([]);

  const { currentMusic, isPending, playMode } = state;

  useEffect(() => {
    const handleSwitchNext = (currentMusic: any) => {
      if (!currentMusic) return;
      let idx = 0;
      musicObjects.forEach((e, i) => {
        if (e.music?.id === currentMusic?.music?.id) {
          idx = i;
        }
      });
      idx++;
      if (idx === musicObjects.length) {
        idx = 0;
      }
      dispatch({ type: "setMusic", payload: { ...musicObjects[idx] } });
    };

    if (playMode !== "loop" && musicObjects.length !== 1) {
      currentMusic?.musicObject?.setEvent({
        e: () => handleSwitchNext(currentMusic),
      });
    } else {
      currentMusic?.musicObject?.setEvent({});
    }
  }, [playMode, musicObjects, currentMusic]);

  useEffect(() => {
    if (currentMusic && !isPending) {
      if (currentMusic.musicObject) dispatch({ type: "play" });
      currentMusic?.musicObject?.jump(0, 0);
    }
  }, [currentMusic, isPending]);

  useEffect(() => {
    window.addEventListener("unload", () => {
      dispatch({ type: "reset" });
    });
  }, []);

  return (
    <AudioContext.Provider
      value={{
        ...state,
        dispatch,
        volumnRef,
        progressRef,
        progressBgRef,
        lyricStageRef,
        visualStageRef,
        timeProgressRef,
        musicObjects,
        setMusicObjects,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("This context is used outside of the provider");
  }
  return context;
};

export { useAudioContext, AudioContextProvider };
