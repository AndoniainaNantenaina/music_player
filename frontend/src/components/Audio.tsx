import { MusicalNoteIcon, PlayIcon } from "@heroicons/react/24/solid";

const Audio = (props: {
  id: string;
  artist: string;
  title: string;
  audio_url: string;
}) => {
  return (
    <div
      id={"audio-player-" + props.id}
      className="font-funnel text-sm flex flex-row items-center p-2 m-1 bg-gray-900 hover:bg-gray-800 rounded-xl h-10 sm:gap-10 gap-4"
    >
      <MusicalNoteIcon className="h-6 w-6 text-gray-500" />

      <button>
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
