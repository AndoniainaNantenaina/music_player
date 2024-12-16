import {
  MagnifyingGlassIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import MusicPathContext from "../contexts/MusicPath";
import { WelcomeData } from "../data/welcome";

const SetPathView = () => {
  const pathContext = useContext(MusicPathContext);
  const [path, setPath] = useState<string>("");

  const randomWelcome = Math.floor(Math.random() * WelcomeData.length);

  return (
    <div className="flex flex-col justify-center place-items-center min-h-screen p-2 font-poppins bg-gradient-to-tr from-yellow-50 to-white text-slate-700">
      <MusicalNoteIcon className="h-10 w-10 bg-gradient-to-bl from-orange-400 to-yellow-500 p-2 rounded-full my-4 text-slate-800" />
      <p className="font-cookie text-2xl">{WelcomeData[randomWelcome]}</p>
      <p className="text-xs">Please specify where your music is stored</p>
      <input
        className="p-2 mt-2 bg-slate-100 text-slate-900 w-1/4 rounded-lg focus:outline-none focus:bg-slate-200"
        type="text"
        name="path"
        id="path"
        placeholder="Path to the correct folder"
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />
      <button
        className="group flex flex-row justify-center items-center p-2 bg-orange-300 font-poppins text-white rounded-lg mt-2 w-1/4 disabled:bg-orange-100 disabled:cursor-not-allowed disabled:text-slate-500"
        disabled={!path}
        onClick={() => {
          pathContext.setMusicPath(path);
          sessionStorage.setItem("musicPath", path);
        }}
      >
        <MagnifyingGlassIcon className="h-4 w-4 group-disabled:text-slate-500" />
        SEARCH
      </button>
    </div>
  );
};

export default SetPathView;
