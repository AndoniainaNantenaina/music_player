import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import MusicPathContext from "./contexts/MusicPath";
import { fetchData } from "./controllers/dataController";
import CurrentPlay from "./data/currentPlay";
import { Music, Tag } from "./data/music";
import { fetchAudio, getAudioData } from "./libs/audio";
import HomeView from "./views/home";
import SetPathView from "./views/setPath";
import SettingsView from "./views/settings";

function App() {
  // Hooks
  const [musicPath, setMusicPath] = useState<string | null>(null);
  const [localMusicList, setLocalMusicList] = useState<Music[]>([]);
  const [currentPlay, setCurrentPlay] = useState<CurrentPlay | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    // If music path is set
    if (musicPath) {
      // If there is no music list to play
      if (localMusicList.length === 0) {
        fetchData(musicPath)
          .then((data: any[]) => {
            data.forEach((music) => {
              const musicData = {
                id: music["id"],
                name: music["name"],
                path: music["path"],
                tag: music["tag"] as Tag,
                album_cover: music["album_cover"],
              } as Music;
              setLocalMusicList((prevList) => [...prevList, musicData]);
            });
          })

          // If error
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      }

      // If there is a music list to play
      else {
        if (currentIndex) {
          // Fetching the audio data from the API
          getAudioData(localMusicList[currentIndex].path)
            .then((audioData) => {
              if (audioData) {
                fetchAudio(audioData)
                  .then((audioUrl) => {
                    // The main audio element
                    const audio = document.getElementById(
                      "audio-data"
                    ) as HTMLAudioElement;

                    audio.addEventListener("ended", () => {
                      if (currentIndex !== localMusicList.length - 1) {
                        setCurrentIndex((prevIndex) => prevIndex! + 1);
                      } else {
                        setCurrentIndex(0);
                      }
                    });

                    if (audioUrl !== audio.src) {
                      audio.setAttribute("src", audioUrl);
                      audio.play();
                    }
                  })
                  .then(() => {
                    setCurrentPlay({
                      id: localMusicList[currentIndex].id,
                      artist: localMusicList[currentIndex].tag.artist,
                      title: localMusicList[currentIndex].tag.title,
                      audioData: audioData,
                      path: localMusicList[currentIndex].path,
                      status: "playing",
                    } as CurrentPlay);
                  });
              }
            })
            .catch((error) => {
              console.error("Error fetching audio data: ", error);
            });
        }
      }
    }
  }, [musicPath, currentIndex]);

  return (
    <MusicPathContext.Provider
      value={{
        musicPath,
        localMusicList,
        currentPlay,
        setMusicPath,
        setCurrentPlay,
        setCurrentIndex,
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
