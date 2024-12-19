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
  album_cover: string;
  duration: number;
  date: string;
  album: string;
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
        "group font-inter font-light text-sm flex flex-row p-2 justify-between items-center hover:bg-space_slate h-16 sm:gap-10 gap-4" +
        (musicContext.currentPlay?.id === props.id
          ? " bg-gradient-to-r from-space_darkblue to-spacetext-space_blue text-white"
          : "text-gray-500")
      }
    >
      <p className="font-inter text-xs">{props.id + 1}</p>
      <MusicalNoteIcon
        className={
          "h-6 w-6" +
          (musicContext.currentPlay?.id === props.id
            ? " text-white group-hover:text-white"
            : " text-space_blue group-hover:text-space_darkblue")
        }
      />

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

        <p className="text-xs w-auto">Album: {props.album}</p>

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
