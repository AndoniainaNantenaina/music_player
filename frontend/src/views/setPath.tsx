import { useContext, useState } from "react";
import MusicPathContext from "../contexts/MusicPath";
import { WelcomeData } from "../data/welcome";

const SetPathView = () => {
  const pathContext = useContext(MusicPathContext);
  const [path, setPath] = useState<string>("");

  const randomWelcome = Math.floor(Math.random() * WelcomeData.length);

  return (
    <div className="flex flex-col gap-2 justify-center place-items-center bg-slate-800 text-white min-h-screen p-2 font-funnel">
      <p>{WelcomeData[randomWelcome]}</p>
      <p>Where your files are stored ?</p>
      <input
        className="p-2 bg-slate-300 text-gray-600 w-1/4 rounded-lg focus:outline-none focus:bg-slate-50"
        type="text"
        name="path"
        id="path"
        placeholder="Enter the path"
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />
      <button
        className="p-2 bg-orange-600 text-white rounded-lg mt-2 w-1/4 disabled:bg-orange-900 disabled:cursor-not-allowed disabled:text-slate-400"
        disabled={!path}
        onClick={() => pathContext.setMusicPath(path)}
      >
        Search
      </button>
    </div>
  );
};

export default SetPathView;
