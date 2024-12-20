import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import "animate.css";
import { useContext, useState } from "react";
import MusicPathContext from "../contexts/MusicPath";
import { WelcomeData } from "../data/welcome";

const SetPathView = () => {
  const musicContext = useContext(MusicPathContext);
  const [path, setPath] = useState<string>("");

  const randomWelcome = Math.floor(Math.random() * WelcomeData.length);

  return (
    <div className="flex flex-col justify-center place-items-center min-h-screen p-2 font-inter bg-gradient-to-tr from-slate-200 to-white">
      <MusicalNoteIcon className="mb-2 h-16 w-16 bg-gradient-to-tr from-space_darkblue to-space_blue p-4 rounded-full text-space_orange" />
      <p className="font-inter font-bold text-2xl">
        {WelcomeData[randomWelcome]}
      </p>
      <p className="text-xs">Please specify where your music is stored</p>
      <input
        className="p-2 mt-2 bg-slate-200 text-slate-900 w-1/4 rounded-lg font-inter focus:outline-none focus:bg-slate-300"
        type="text"
        name="path"
        id="path"
        placeholder="Path to the correct folder"
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />
      {path && path.length > 0 && (
        <button
          className={
            "group flex flex-row gap-2 justify-center items-center p-2 bg-space_blue hover:bg-space_darkblue font-inter " +
            "text-white rounded-lg mt-2 w-1/4 disabled:opacity-20 disabled:cursor-not-allowed disabled:text-slate-400" +
            " animate__animated animate__slideInUp animate__faster animate__repeat-1 animate__delay-0.5s"
          }
          disabled={!path}
          onClick={() => {
            // Save the path to the context
            musicContext.setMusicPath(path);
          }}
        >
          SEARCH
        </button>
      )}
    </div>
  );
};

export default SetPathView;
