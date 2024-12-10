import { useContext, useState } from "react";
import MusicPathContext from "../contexts/MusicPath";

const SetPathView = () => {
  const pathContext = useContext(MusicPathContext);
  const [path, setPath] = useState<string>("");

  return (
    <div>
      <h1>Set Path</h1>
      <input
        type="text"
        name="path"
        id="path"
        placeholder="Enter the path"
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />
      <button disabled={!path} onClick={() => pathContext.setMusicPath(path)}>
        Save
      </button>
    </div>
  );
};

export default SetPathView;
