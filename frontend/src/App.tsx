import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import MusicPathContext from "./contexts/MusicPath";
import CurrentPlay from "./data/currentPlay";
import { fetchAudio } from "./libs/audio";
import HomeView from "./views/home";
import SetPathView from "./views/setPath";
import SettingsView from "./views/settings";

function App() {
  const [musicPath, setMusicPath] = useState<string | null>(null);
  const [localMusicList, setLocalMusicList] = useState<any[]>([]);
  const [currentPlay, setCurrentPlay] = useState<CurrentPlay | null>(null);

  useEffect(() => {
    const path = sessionStorage.getItem("musicPath");

    if (path) {
      setMusicPath(path);
    }

    const audio = document.getElementById("audio-data") as HTMLAudioElement;

    if (currentPlay?.audioData) {
      fetchAudio(currentPlay.audioData).then((audioUrl) => {
        if (audioUrl !== audio.src) {
          audio.setAttribute("src", audioUrl);
          audio.play();
        }
      });
    } else {
      if (audio) {
        audio.pause();
      }
    }
  }, [currentPlay?.path, currentPlay?.status]);

  return (
    <MusicPathContext.Provider
      value={{
        musicPath,
        setMusicPath,
        localMusicList,
        setLocalMusicList,
        currentPlay,
        setCurrentPlay,
      }}
    >
      <audio id="audio-data" hidden></audio>
      <Routes>
        <Route path="/" element={musicPath ? <HomeView /> : <SetPathView />} />
        <Route path="settings" element={<SettingsView />} />
      </Routes>
    </MusicPathContext.Provider>
  );
}

export default App;
