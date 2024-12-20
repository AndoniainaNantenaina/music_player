import { createContext } from "react";
import CurrentPlay from "../data/currentPlay";

export interface MusicPathContextType {
  musicPath: string | null;
  localMusicList: any[];
  currentPlay: CurrentPlay | null;
  setMusicPath: (path: string) => void;
  setCurrentPlay: (audio_url: CurrentPlay | null) => void;
  setCurrentIndex: (index: number | null) => void;
}

const MusicPathContext = createContext<MusicPathContextType>({
  musicPath: null,
  localMusicList: [],
  currentPlay: null,
  setMusicPath: () => {},
  setCurrentPlay: () => {},
  setCurrentIndex: () => {},
});

export default MusicPathContext;
