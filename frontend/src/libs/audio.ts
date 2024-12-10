import { base64ToUint8Array } from "./base64";

const fetchAudio = async (base64Data: any) => {
  const audioBlob = new Blob([base64ToUint8Array(base64Data)], {
    type: "audio/wav",
  });
  return URL.createObjectURL(audioBlob);
};

export { fetchAudio };
