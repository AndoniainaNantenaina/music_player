import { createContext } from "react";
import CurrentPlay from "../data/currentPlay";

export interface MusicPathContextType {
  musicPath: string | null;
  setMusicPath: (path: string) => void;
  localMusicList: any[];
  setLocalMusicList: (localMusicList: any[]) => void;
  currentPlay: CurrentPlay | null;
  setCurrentPlay: (audio_url: CurrentPlay | null) => void;
}

const MusicPathContext = createContext<MusicPathContextType>({
  musicPath: null,
  setMusicPath: () => {},
  localMusicList: [],
  setLocalMusicList: () => {},
  currentPlay: null,
  setCurrentPlay: () => {},
});

export default MusicPathContext;
