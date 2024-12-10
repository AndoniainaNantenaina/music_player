import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import MusicPathContext from "./contexts/MusicPath";
import HomeView from "./views/home";
import SetPathView from "./views/setPath";
import SettingsView from "./views/settings";

function App() {
  const [musicPath, setMusicPath] = useState<string | null>(null);
  const [localMusicList, setLocalMusicList] = useState<any[]>([]);

  return (
    <MusicPathContext.Provider
      value={{ musicPath, setMusicPath, localMusicList, setLocalMusicList }}
    >
      <Routes>
        <Route path="/" element={musicPath ? <HomeView /> : <SetPathView />} />
        <Route path="settings" element={<SettingsView />} />
      </Routes>
    </MusicPathContext.Provider>
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
        setMusicList(data);
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
        {musicList
          ? musicList.map((music) => (
              <div key={music["id"]} className="p-2 bg-gray-200 rounded-lg">
                <p>{music["name"]}</p>
                <p>Artist: {music["tag"]["artist"]}</p>
                <audio controls src={music["path"]} />
              </div>
            ))
          : "Not found"}
        {/* {musicList.map((music) => (
          <div key={music["id"]} className="p-2 bg-gray-200 rounded-lg">
            <p>{music["name"]}</p>
            <p>Artist: {music["tag"]["artist"]}</p>
            <audio controls src={music["path"]} />
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default App;
