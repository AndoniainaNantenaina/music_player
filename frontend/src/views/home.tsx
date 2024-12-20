import {
  BackwardIcon,
  ChevronDownIcon,
  ForwardIcon,
  MusicalNoteIcon,
  PauseCircleIcon,
  PauseIcon,
  PlayCircleIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  StopIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import "animate.css";
import { useContext, useEffect, useState } from "react";
import MusicList from "../components/MusicList";
import MusicPathContext from "../contexts/MusicPath";
import { truncate } from "../libs/string";
import { formatHMS } from "../libs/time";

const HomeView = () => {
  const musicContext = useContext(MusicPathContext);
  const [musicList, setMusicList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [notification, setNotification] = useState<string | null>("");
  const audio = document.getElementById("audio-data") as HTMLAudioElement;
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentMaximized, setCurrentMaximized] = useState<boolean>(false);

  useEffect(() => {
    if (musicList.length === 0) {
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

      {currentMaximized && musicContext.currentPlay && (
        <div
          id="maximized-current-playing"
          className={"absolute top-0 right-0 h-screen w-screen z-10"}
        >
          <div
            className={
              "animate__animated animate__slideInDown animate__faster animate__repeat-1 animate__delay-0.5s bg-space_darkblue " +
              "w-screen h-screen " +
              "flex flex-col gap-2 items-center justify-center text-center"
            }
          >
            <XMarkIcon
              onClick={() => {
                setCurrentMaximized(false);
              }}
              className="absolute right-5 top-5 h-6 w-6 text-slate-400 hover:cursor-pointer"
            />

            <MusicalNoteIcon className="h-36 w-36 bg-space_blue p-1 rounded-xl text-white" />

            <div id="infos" className="flex flex-col text-white">
              <p className="text-sm font-inter font-medium">
                {musicContext.currentPlay.title}
              </p>
              <p className="text-xs">{musicContext.currentPlay.artist}</p>
              <p className="text-xs">{formatHMS(currentTime)}</p>
            </div>

            <div className="flex flex-row">
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
                  setCurrentMaximized(false);
                }}
              >
                <StopIcon className="h-6 w-6 text-white hover:text-slate-200" />
              </button>
            </div>

            <div
              id="progress-bar"
              className="bg-slate-300 top-0 h-1 w-1/5 -mx-2 rounded-full"
            >
              <div
                className="bg-gradient-to-r from-space_darkblue to-space_blue h-1 rounded-full"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>

            <div
              id="current-volume"
              className="flex flex-row gap-2 items-center justify-center"
            >
              {audio &&
                (audio.volume === 0 ? (
                  <SpeakerXMarkIcon
                    onClick={() => {
                      audio && (audio.volume = 1);
                    }}
                    className="h-5 w-5 text-white hover:cursor-pointer"
                  />
                ) : (
                  <SpeakerWaveIcon
                    onClick={() => {
                      audio && (audio.volume = 0);
                    }}
                    className="h-5 w-5 text-white hover:cursor-pointer"
                  />
                ))}
              <input
                value={audio ? audio.volume * 100 : 0}
                onChange={(e) => {
                  audio && (audio.volume = parseFloat(e.target.value) / 100);
                }}
                id="current-playing-volume"
                type="range"
                className="bg-space_blue accent-space_slate"
                style={{
                  width: "100px",
                  height: "5px",
                  borderRadius: "5px",
                  appearance: "none",
                }}
              />
            </div>
          </div>
        </div>
      )}

      <h1 className="text-xl font-bold font-inter p-2 text-slate-900">Home</h1>
      {musicContext.currentPlay && (
        <div
          id="current-play"
          className={
            "flex flex-row backdrop-blur-md items-center justify-between h-16 p-2 bg-gradient-to-br from-space_orange to-orange-500 rounded-xl m-2"
          }
        >
          <div className="flex flex-row items-center gap-2 p-2 w-1/3">
            <MusicalNoteIcon className="h-8 w-8 bg-space_blue p-1 rounded-lg text-white" />
            <div className="flex flex-col text-white">
              <p className="text-sm font-inter font-medium">
                {truncate(musicContext.currentPlay.title, 35)}
              </p>
              <p className="text-xs">
                {truncate(musicContext.currentPlay.artist, 50)}
              </p>
              <p className="text-xs">{formatHMS(currentTime)}</p>
            </div>
          </div>

          <div
            id="control-buttons"
            className="flex flex-col gap-2 w-1/3 justify-center items-center"
          >
            <div
              id="action-buttons"
              className="flex flex-row gap-0 items-center"
            >
              <BackwardIcon
                onClick={() => {
                  const currentPlay = musicContext.currentPlay;
                  if (currentPlay) {
                    if (currentPlay.id !== 0) {
                      musicContext.setCurrentIndex(currentPlay.id - 1);
                    }
                  }
                }}
                className="h-6 w-6 text-white mr-2 hover:cursor-pointer hover:text-slate-200"
              />

              {audio && audio.paused ? (
                <PlayCircleIcon
                  onClick={() => {
                    const audio = document.getElementById(
                      "audio-data"
                    ) as HTMLAudioElement;
                    audio && audio.play();
                  }}
                  className="h-10 w-10 text-white hover:text-slate-200 hover:cursor-pointer"
                />
              ) : (
                <PauseCircleIcon
                  onClick={() => {
                    const audio = document.getElementById(
                      "audio-data"
                    ) as HTMLAudioElement;
                    audio && audio.pause();
                  }}
                  className="h-10 w-10 text-white hover:text-slate-200 hover:cursor-pointer"
                />
              )}

              <ForwardIcon
                onClick={() => {
                  const currentPlay = musicContext.currentPlay;
                  if (currentPlay) {
                    if (currentPlay.id !== 0) {
                      musicContext.setCurrentIndex(currentPlay.id + 1);
                    }
                  }
                }}
                className="h-6 w-6 text-white ml-2 hover:cursor-pointer hover:text-slate-200"
              />
            </div>

            <div
              id="progress-bar"
              className="bg-slate-300 top-0 h-0.5 w-full -mx-2 flex flex-row items-center"
            >
              <div
                className="container bg-gradient-to-r from-space_darkblue to-space_blue h-0.5"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
              <div
                className="bg-white h-3 w-3 rounded-full"
                id="right-dot"
              ></div>
            </div>
          </div>

          <div
            id="current-volume"
            className="flex flex-row gap-2 w-1/3 items-center justify-center"
          >
            {audio &&
              (audio.volume === 0 ? (
                <SpeakerXMarkIcon
                  onClick={() => {
                    audio && (audio.volume = 1);
                  }}
                  className="h-4 w-4 text-white hover:cursor-pointer"
                />
              ) : (
                <SpeakerWaveIcon
                  onClick={() => {
                    audio && (audio.volume = 0);
                  }}
                  className="h-4 w-4 text-white hover:cursor-pointer"
                />
              ))}
            <input
              value={audio ? audio.volume * 100 : 0}
              onChange={(e) => {
                audio && (audio.volume = parseFloat(e.target.value) / 100);
              }}
              id="current-playing-volume"
              type="range"
              className="bg-[#F5F0CD] accent-space_darkblue"
              style={{
                width: "100px",
                height: "3px",
                borderRadius: "5px",
                appearance: "none",
                accentColor: "FADA7A",
              }}
            />
            <ChevronDownIcon
              onClick={() => {
                setCurrentMaximized(true);
              }}
              className="h-6 w-6 text-white hover:text-space_blue hover:cursor-pointer"
            />
          </div>
        </div>
      )}

      {musicContext.musicPath && (
        <MusicList
          isFetching={isFetching}
          musicList={musicContext.localMusicList}
          onFetchData={() => {}}
        />
      )}
    </div>
  );
};

export default HomeView;
