import {
  MusicalNoteIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { useContext } from "react";
import MusicPathContext from "../contexts/MusicPath";
import CurrentPlay from "../data/music";
import { getAudioData } from "../libs/audio";

const Audio = (props: {
  id: string;
  artist: string;
  title: string;
  path: string;
}) => {
  const musicContext = useContext(MusicPathContext);

  const playMusic = async () => {
    musicContext.setCurrentPlay({
      id: props.id,
      artist: props.artist,
      title: props.title,
      status: "playing",
    } as CurrentPlay);

    await getAudioData(props.path)
      .then((audioData) => {
        if (audioData) {
          musicContext.setPlayingAudioData(audioData);
        }
      })
      .catch((error) => {
        console.error("Error fetching audio data: ", error);
      });
  };

  const pauseMusic = () => {
    musicContext.setCurrentPlay({
      id: musicContext.currentPlay?.id,
      artist: musicContext.currentPlay?.artist,
      title: musicContext.currentPlay?.title,
      status: "paused",
    } as CurrentPlay);
  };

  return (
    <div
      id={"audio-player-" + props.id}
      className="font-funnel text-sm flex flex-row items-center p-2 m-1 bg-gray-900 hover:bg-gray-800 rounded-xl h-10 sm:gap-10 gap-4"
    >
      <MusicalNoteIcon className="h-6 w-6 text-gray-500" />

      {musicContext.currentPlay?.id === props.id &&
      musicContext.currentPlay.status === "playing" ? (
        <button onClick={pauseMusic}>
          <PauseIcon className="h-6 w-6 text-gray-500 hover:text-slate-200" />
        </button>
      ) : (
        <button onClick={playMusic}>
          <PlayIcon className="h-6 w-6 text-gray-500 hover:text-slate-200" />
        </button>
      )}

      <div className="flex flex-row justify-between w-full">
        <p>{props.title}</p>
        <p>{props.artist}</p>
      </div>
    </div>
  );
};

export default Audio;
