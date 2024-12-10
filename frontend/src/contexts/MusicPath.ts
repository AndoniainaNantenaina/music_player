import { createContext } from "react";

export interface MusicPathContextType {
  musicPath: string | null;
  setMusicPath: (path: string) => void;
  localMusicList: any[];
  setLocalMusicList: (localMusicList: any[]) => void;
}

const MusicPathContext = createContext<MusicPathContextType>({
  musicPath: null,
  setMusicPath: () => {},
  localMusicList: [],
  setLocalMusicList: () => {},
});

export default MusicPathContext;
