import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import MusicPathContext from "../contexts/MusicPath";
import CurrentPlay from "../data/currentPlay";
import { getAudioData } from "../libs/audio";

const Audio = (props: {
  id: string;
  artist: string;
  title: string;
  path: string;
}) => {
  const musicContext = useContext(MusicPathContext);

  const playMusic = async () => {
    await getAudioData(props.path)
      .then((audioData) => {
        if (audioData) {
          musicContext.setCurrentPlay({
            id: props.id,
            artist: props.artist,
            title: props.title,
            audioData: audioData,
            path: props.path,
            status: "playing",
          } as CurrentPlay);
        }
      })
      .catch((error) => {
        console.error("Error fetching audio data: ", error);
      });
  };

  return (
    <div
      id={"audio-player-" + props.id}
      className={
        "font-funnel text-sm flex flex-row justify-between items-center p-2 m-1 bg-gray-100 hover:bg-gray-200 text-slate-700 rounded-xl h-10 sm:gap-10 gap-4" +
        (musicContext.currentPlay?.id === props.id ? " bg-orange-100" : "")
      }
    >
      <MusicalNoteIcon className="h-6 w-6 text-gray-500" />

      <div className="flex flex-col w-full" onClick={playMusic}>
        <p
          className={
            "font-bold " +
            (musicContext.currentPlay?.id === props.id ? "text-orange-500" : "")
          }
        >
          {props.title}
        </p>
        <p className="flex flex-row text-xs gap-1 items-center text-slate-400">
          by {props.artist}
        </p>
      </div>
    </div>
  );
};

export default Audio;
