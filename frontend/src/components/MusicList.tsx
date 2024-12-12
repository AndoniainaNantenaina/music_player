import { ArrowPathIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";
import "animate.css";
import Audio from "./Audio";

const MusicList = (props: {
  musicList: never[];
  onFetchData: () => void;
  isFetching: boolean;
}) => {
  return (
    <div className="flex flex-col overflow-auto h-full">
      {props.musicList.length > 0 ? (
        props.musicList.map((music) => (
          <Audio
            artist={music["tag"]["artist"]}
            title={music["name"]}
            audio_url={music["audio_url"]}
            id={music["id"]}
          />
        ))
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <MusicalNoteIcon className="h-6 w-6 text-gray-500" />
          <p className="text-center text-gray-500">No music found</p>
          <p className="text-xs text-center text-gray-500">Please fetch data</p>
          <button
            className="px-2 py-1 mt-2 bg-blue-700 hover:bg-blue-600 text-white font-funnel rounded-full w-auto text-sm font-bold flex flex-row items-center gap-1"
            onClick={props.onFetchData}
          >
            <ArrowPathIcon
              className={
                `h-4 w-4` +
                (props.isFetching
                  ? " animate__animated animate__rotateOut animate__faster animate__infinite"
                  : "")
              }
            />
            {props.isFetching ? "FETCHING..." : "FETCH"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MusicList;
