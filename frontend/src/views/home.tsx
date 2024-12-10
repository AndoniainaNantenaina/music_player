import { useContext, useState } from "react";
import MusicPathContext from "../contexts/MusicPath";
import { fetchAudio } from "../libs/audio";

const HomeView = () => {
  const pathContext = useContext(MusicPathContext);
  const [musicList, setMusicList] = useState([]);

  const fetchData = () => {
    if (pathContext.musicPath) {
      fetch("http://localhost:5000/files?folder=" + pathContext.musicPath)
        .then((res) => res.json())
        .then(async (response) => {
          console.log(response["data"]);

          const updatedMusicList: any = await Promise.all(
            response["data"].map(async (music: any) => {
              const audioUrl = await fetchAudio(music["audio_data"]);
              return { ...music, audio_url: audioUrl };
            })
          );

          setMusicList(updatedMusicList);
        });
    }
  };

  return (
    <div className="flex flex-col bg-slate-800 text-white">
      <h1>Home</h1>

      {pathContext.musicPath && (
        <div>
          <p>List found in {pathContext.musicPath}</p>
          <button onClick={fetchData}>Fetch</button>

          {musicList.length > 0
            ? musicList.map((music) => (
                <div key={music["id"]} className="p-2 bg-gray-200 rounded-lg">
                  <p>{music["name"]}</p>
                  <p>Artist: {music["tag"]["artist"]}</p>
                  <audio controls>
                    <source src={music["audio_url"]} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))
            : "Nothing to show"}
        </div>
      )}
    </div>
  );
};

export default HomeView;
