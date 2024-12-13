import {
  MusicalNoteIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import "animate.css";
import { useContext, useEffect, useState } from "react";
import MusicList from "../components/MusicList";
import MusicPathContext from "../contexts/MusicPath";
import { formatHMS } from "../libs/time";

const HomeView = () => {
  const musicContext = useContext(MusicPathContext);
  const [musicList, setMusicList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [notification, setNotification] = useState<string | null>("");
  const audio = document.getElementById("audio-data") as HTMLAudioElement;
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });
    }
  }, [audio.currentTime]);

  const showNotification = (message: string) => {
    setNotification(message);

    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const fetchData = () => {
    setIsFetching(true);

    if (musicContext.musicPath) {
      fetch("http://localhost:5000/files?folder=" + musicContext.musicPath)
        .then((res) => res.json())
        .then(async (response) => {
          console.log(response);

          setMusicList(response["data"]);
          setIsFetching(false);
          showNotification("Data fetched successfully");
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setIsFetching(false);
          showNotification("Error fetching data: " + error.message);
        });
    }
  };

  return (
    <div className="flex flex-col h-screen p-2">
      {notification && (
        <p
          id="notification"
          className="text-sm bg-blue-900 text-white p-2 -mt-2 -mx-2"
        >
          {notification}
        </p>
      )}

      <h1 className="text-xl font-bold font-funnel">Home</h1>

      {musicContext.musicPath && (
        <MusicList
          isFetching={isFetching}
          musicList={musicList}
          onFetchData={fetchData}
        />
      )}

      {musicContext.currentPlay && (
        <div
          id="current-play"
          className="flex flex-row items-center justify-between p-2 rounded-t-xl -mx-2 h-16 border-t-2 border-orange-600"
        >
          <div className="flex flex-row items-center gap-2 p-2">
            <MusicalNoteIcon className="h-6 w-6 text-slate-400 bg-blue-900 p-1 rounded-full hover:text-slate-200" />
            <div className="flex flex-col">
              <p className="text-sm font-funnel">
                {musicContext.currentPlay.title}
              </p>
              <p className="text-xs">{formatHMS(currentTime)}</p>
            </div>
          </div>
          {audio && audio.paused ? (
            <button
              className="flex flex-col items-center p-2 w-20 bg-orange-400 hover:bg-orange-600 text-white rounded-full"
              onClick={() => {
                const audio = document.getElementById(
                  "audio-data"
                ) as HTMLAudioElement;
                audio && audio.play();
              }}
            >
              <PlayIcon className="h-6 w-6 text-white hover:text-slate-200" />
            </button>
          ) : (
            <button
              className="flex flex-col items-center p-2 w-20 bg-orange-400 hover:bg-orange-600 text-white rounded-full"
              onClick={() => {
                const audio = document.getElementById(
                  "audio-data"
                ) as HTMLAudioElement;
                audio && audio.pause();
              }}
            >
              <PauseIcon className="h-6 w-6 text-gray-500 hover:text-slate-200" />
            </button>
          )}
          <button
            onClick={() => {
              musicContext.setCurrentPlay(null);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 hover:text-slate-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeView;
