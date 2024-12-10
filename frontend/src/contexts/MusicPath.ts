import { createContext } from "react";

export interface MusicPathContextType {
  musicPath: string | null;
  setMusicPath: (path: string) => void;
}

const MusicPathContext = createContext<MusicPathContextType>({
  musicPath: null,
  setMusicPath: () => {},
});

export default MusicPathContext;
