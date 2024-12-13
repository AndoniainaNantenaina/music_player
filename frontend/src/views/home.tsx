import "animate.css";
import { useContext, useState } from "react";
import MusicList from "../components/MusicList";
import MusicPathContext from "../contexts/MusicPath";

const HomeView = () => {
  const pathContext = useContext(MusicPathContext);
  const [musicList, setMusicList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [notification, setNotification] = useState<string | null>("");

  const showNotification = (message: string) => {
    setNotification(message);

    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const fetchData = () => {
    setIsFetching(true);

    if (pathContext.musicPath) {
      fetch("http://localhost:5000/files?folder=" + pathContext.musicPath)
        .then((res) => res.json())
        .then(async (response) => {
          console.log(response);

          setMusicList(response["data"]);
          setIsFetching(false);
          showNotification("Data fetched successfully");
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setIsFetching(false);
          showNotification("Error fetching data: " + error.message);
        });
    }
  };

  return (
    <div className="flex flex-col bg-black text-white h-screen p-2">
      {notification && (
        <p
          id="notification"
          className="text-sm bg-blue-900 text-white p-2 -mt-2 -mx-2"
        >
          {notification}
        </p>
      )}

      <h1 className="text-xl font-bold font-funnel">Home</h1>

      {pathContext.musicPath && (
        <MusicList
          isFetching={isFetching}
          musicList={musicList}
          onFetchData={fetchData}
        />
      )}
    </div>
  );
};

export default HomeView;
