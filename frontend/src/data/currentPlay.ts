interface CurrentPlay {
  id: string;
  artist: string;
  title: string;
  path: string;
  audioData: any | null;
  status: "playing" | "paused" | "stopped";
}

export default CurrentPlay;
