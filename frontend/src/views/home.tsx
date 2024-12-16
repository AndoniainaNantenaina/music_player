import {
  MusicalNoteIcon,
  PauseIcon,
  PlayIcon,
  StopIcon,
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
    if (musicList.length === 0) {
      fetchData();
    }

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
          className="text-sm bg-blue-900 text-white p-2 -mt-2 -mx-2 animate__animated animate__slideInDown animate__fast animate__repeat-1 animate__delay-1s"
        >
          {notification}
        </p>
      )}

      <h1 className="text-xl font-bold font-poppins">Home</h1>

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
          className={
            "flex flex-row items-center justify-between p-2 -mx-2 h-16 border-t-2 " +
            "border-orange-600 animate__animated animate__slideInUp animate__faster animate__repeat-1 animate__delay-0.5s"
          }
        >
          <div className="flex flex-row items-center gap-2 p-2">
            <MusicalNoteIcon className="h-6 w-6 text-slate-400 bg-blue-900 p-1 rounded-full hover:text-slate-200" />
            <div className="flex flex-col">
              <p className="text-sm font-poppins">
                {musicContext.currentPlay.title}
              </p>
              <p className="text-xs">{formatHMS(currentTime)}</p>
            </div>
          </div>

          <div id="buttons" className="flex flex-row gap-0">
            {audio && audio.paused ? (
              <button
                className="flex flex-col items-center p-2 w-20 bg-orange-400 hover:bg-orange-600 text-white rounded-l-full"
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
                className="flex flex-col items-center p-2 w-20 bg-orange-400 hover:bg-orange-600 text-white rounded-l-full"
                onClick={() => {
                  const audio = document.getElementById(
                    "audio-data"
                  ) as HTMLAudioElement;
                  audio && audio.pause();
                }}
              >
                <PauseIcon className="h-6 w-6 text-white hover:text-slate-200" />
              </button>
            )}
            <button
              className="flex flex-col items-center p-2 w-20 bg-orange-400 hover:bg-orange-600 text-white rounded-r-full"
              id="stop-button"
              onClick={() => {
                musicContext.setCurrentPlay(null);
              }}
            >
              <StopIcon className="h-6 w-6 text-white hover:text-slate-200" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;
