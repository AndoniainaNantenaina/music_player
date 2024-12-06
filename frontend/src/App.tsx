import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <MusicSearch />
    </div>
  );
}

function MusicSearch() {
  const [musicList, setMusicList] = useState([]);
  const [path, setPath] = useState("");

  async function handleSearch() {
    await fetch("http://localhost:5000/files?folder=" + path)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMusicList(data["files"]);
      });
  }

  return (
    <div className="p-2">
      <h1>Search</h1>
      <div className="flex flex-row gap-2 justify-center">
        <input
          onChange={(e) => setPath(e.target.value)}
          value={path}
          type="text"
          placeholder="Enter the file path"
        />
        <button
          onClick={handleSearch}
          className="p-2 rounded-lg bg-orange-600 text-white"
        >
          Search
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {musicList.map((music) => (
          <div key={music} className="p-2 bg-gray-200 rounded-lg">
            {music}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
