import { MusicalNoteIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Audio = (props: {
  id: string;
  artist: string;
  title: string;
  path: string;
  setOnPlaying: (audioUrl: string) => void;
}) => {
  const [fetching, setFetching] = useState<boolean>(false);
  const fetchAudioData = async () => {
    setFetching(true);

    await fetch("http://localhost:5000/read?path=" + props.path)
      .then((res) => res.json())
      .then((response) => {
        props.setOnPlaying(response["audio"]);
        setFetching(false);
      });
  };

  return (
    <div
      id={"audio-player-" + props.id}
      className="font-funnel text-sm flex flex-row items-center p-2 m-1 bg-gray-900 hover:bg-gray-800 rounded-xl h-10 sm:gap-10 gap-4"
    >
      <MusicalNoteIcon className="h-6 w-6 text-gray-500" />

      <button onClick={fetchAudioData}>
        <PlayIcon className="h-6 w-6 text-gray-500 hover:text-slate-200" />
      </button>
      <div className="flex flex-row justify-between w-full">
        <p>{props.title}</p>
        <p>{props.artist}</p>
      </div>
    </div>
  );
};

export default Audio;
