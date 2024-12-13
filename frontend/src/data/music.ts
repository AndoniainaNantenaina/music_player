interface CurrentPlay {
  id: string;
  artist: string;
  title: string;
  path: string;
  status: "playing" | "paused" | "stopped";
}

export default CurrentPlay;
