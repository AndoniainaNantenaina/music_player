import {
  MusicalNoteIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
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

  const calculateProgress = () => {
    if (audio) {
      const duration = audio.duration;
      const progress = (currentTime / duration) * 100;
      return progress;
    }
    return 0;
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
    <div className="flex flex-col h-screen">
      {notification && (
        <p
          id="notification"
          className={
            "absolute w-full text-center font-poppins items-center" +
            "text-sm bg-blue-900 text-white animate__animated animate__slideInDown animate__fast animate__repeat-1 animate__delay-0.5s"
          }
        >
          {notification}
        </p>
      )}

      <h1 className="text-xl font-bold font-poppins p-2">Home</h1>

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
            "flex flex-row absolute bottom-0 left-0 w-full backdrop-blur-md items-center justify-between h-16 p-2 " +
            "animate__animated animate__slideInUp animate__faster animate__repeat-1 animate__delay-0.5s"
          }
        >
          <div
            id="progress-bar"
            className="absolute bg-slate-300 top-0 h-0.5 w-full -mx-2"
          >
            <div
              className="bg-orange-600 h-0.5"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>

          <div className="flex flex-row items-center gap-2 p-2">
            <MusicalNoteIcon className="h-6 w-6 text-slate-400 bg-blue-900 p-1 rounded-full hover:text-slate-200" />
            <div className="flex flex-col">
              <p className="text-sm font-poppins font-bold">
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
          <div className="flex flex-row gap-2 items-center justify-center p-2 bg-gray-300 rounded-full">
            {audio &&
              (audio.volume === 0 ? (
                <SpeakerXMarkIcon
                  onClick={() => {
                    audio && (audio.volume = 1);
                  }}
                  className="h-6 w-6 text-slate-500 hover:cursor-pointer"
                />
              ) : (
                <SpeakerWaveIcon
                  onClick={() => {
                    audio && (audio.volume = 0);
                  }}
                  className="h-6 w-6 text-slate-500 hover:cursor-pointer"
                />
              ))}
            <input
              value={audio ? audio.volume * 100 : 0}
              onChange={(e) => {
                audio && (audio.volume = parseFloat(e.target.value) / 100);
              }}
              id="current-playing-volume"
              type="range"
              className="bg-slate-500 text-green-500"
              style={{
                width: "100px",
                height: "5px",
                borderRadius: "5px",
                appearance: "none",
                accentColor: "orangered",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;
