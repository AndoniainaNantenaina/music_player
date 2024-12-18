import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import MusicPathContext from "../contexts/MusicPath";
import CurrentPlay from "../data/currentPlay";
import { getAudioData } from "../libs/audio";
import { formatHMS } from "../libs/time";

const Audio = (props: {
  id: string;
  artist: string;
  title: string;
  path: string;
  album_cover: string;
  duration: number;
  date: string;
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
        "font-inter font-light text-sm flex flex-row p-2 justify-between items-center hover:bg-m_lightblue h-10 sm:gap-10 gap-4" +
        (musicContext.currentPlay?.id === props.id
          ? " bg-m_normalblue text-white"
          : "text-gray-500")
      }
    >
      <MusicalNoteIcon
        className={
          "h-6 w-6" +
          (musicContext.currentPlay?.id === props.id
            ? " text-white"
            : " text-gray-500")
        }
      />

      <p>{formatHMS(props.duration * 100)}</p>

      <p className="text-xs w-24">{props.date}</p>

      <div className="flex flex-col w-full" onClick={playMusic}>
        <p
          className={
            "font-medium " +
            (musicContext.currentPlay?.id === props.id ? "text-white" : "")
          }
        >
          {props.title}
        </p>
        <p
          className={
            "flex flex-row text-xs gap-1 items-center" +
            (musicContext.currentPlay?.id === props.id
              ? "text-slate-300"
              : "text-slate-400")
          }
        >
          {props.artist}
        </p>
      </div>
    </div>
  );
};

export default Audio;
