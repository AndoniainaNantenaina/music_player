import { ArrowPathIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";
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
            key={music["id"]}
            artist={music["tag"]["artist"]}
            title={music["tag"]["title"]}
            id={music["id"]}
            path={music["path"]}
            album_cover={music["album_cover"]}
            duration={music["tag"]["duration"]}
            date={music["tag"]["date"]}
            album={music["tag"]["album"]}
          />
        ))
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <MusicalNoteIcon className="h-6 w-6 text-gray-500" />
          <p className="text-center text-gray-500">Fetching your music...</p>
          <p className="text-xs text-center text-gray-500">
            This may take some minutes, depending your files.
          </p>
          <div className="px-2 py-1 mt-2 font-poppins rounded-full w-auto text-sm font-bold flex flex-row items-center gap-1">
            <ArrowPathIcon
              className={`h-5 w-5` + (props.isFetching ? " animate-spin" : "")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicList;
