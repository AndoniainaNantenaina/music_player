import { createContext } from "react";
import CurrentPlay from "../data/music";

export interface MusicPathContextType {
  musicPath: string | null;
  setMusicPath: (path: string) => void;
  localMusicList: any[];
  setLocalMusicList: (localMusicList: any[]) => void;
  playingAudioData: any | null;
  setPlayingAudioData: (audio_url: string) => void;
  currentPlay: CurrentPlay | null;
  setCurrentPlay: (audio_url: CurrentPlay | null) => void;
}

const MusicPathContext = createContext<MusicPathContextType>({
  musicPath: null,
  setMusicPath: () => {},
  localMusicList: [],
  setLocalMusicList: () => {},
  playingAudioData: null,
  setPlayingAudioData: () => {},
  currentPlay: null,
  setCurrentPlay: () => {},
});

export default MusicPathContext;
