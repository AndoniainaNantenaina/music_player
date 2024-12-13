import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import MusicPathContext from "./contexts/MusicPath";
import CurrentPlay from "./data/music";
import { fetchAudio } from "./libs/audio";
import HomeView from "./views/home";
import SetPathView from "./views/setPath";
import SettingsView from "./views/settings";

function App() {
  const [musicPath, setMusicPath] = useState<string | null>(null);
  const [localMusicList, setLocalMusicList] = useState<any[]>([]);
  const [playingAudioData, setPlayingAudioData] = useState<any | null>(null);
  const [currentPlay, setCurrentPlay] = useState<CurrentPlay | null>(null);

  useEffect(() => {
    if (playingAudioData) {
      const audio = document.getElementById("audio-data") as HTMLAudioElement;
      fetchAudio(playingAudioData).then((audioUrl) => {
        audio.setAttribute("src", audioUrl);
        audio.play();
      });
    }
  }, [playingAudioData]);

  return (
    <MusicPathContext.Provider
      value={{
        musicPath,
        setMusicPath,
        localMusicList,
        setLocalMusicList,
        playingAudioData,
        setPlayingAudioData,
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
