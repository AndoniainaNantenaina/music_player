import { useContext, useState } from "react";
import MusicPathContext from "../contexts/MusicPath";
import { base64ToUint8Array } from "../libs/base64";

const HomeView = () => {
  const pathContext = useContext(MusicPathContext);
  const [musicList, setMusicList] = useState([]);

  const fetchData = () => {
    if (pathContext.musicPath) {
      fetch("http://localhost:5000/files?folder=" + pathContext.musicPath)
        .then((res) => res.json())
        .then(async (response) => {
          console.log(response["data"]);

          // For each data in response["data"], fetch the audio data and add it as a value of the key "audio_url" in the same object.
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

  const fetchAudio = async (base64Data: any) => {
    const audioBlob = new Blob([base64ToUint8Array(base64Data)], {
      type: "audio/wav",
    });
    return URL.createObjectURL(audioBlob);
  };

  return (
    <div>
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
