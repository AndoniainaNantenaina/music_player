import { base64ToUint8Array } from "./base64";

const fetchAudio = async (base64Data: any) => {
  const audioBlob = new Blob([base64ToUint8Array(base64Data)], {
    type: "audio/wav",
  });
  return URL.createObjectURL(audioBlob);
};

const getAudioData = async (path: string) => {
  return await fetch("http://localhost:5000/read?path=" + path)
    .then((res) => res.json())
    .then((response) => response["audio"])
    .catch((error) => {
      console.error("Error fetching audio data: ", error);
      return null;
    });
};

export { fetchAudio, getAudioData };
