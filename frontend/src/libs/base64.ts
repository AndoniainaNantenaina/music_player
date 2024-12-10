const base64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawDataString = atob(base64);
  const rawDataLength = rawDataString.length;
  const array = new Uint8Array(rawDataLength);

  for (let i = 0; i < rawDataLength; i++) {
    array[i] = rawDataString.charCodeAt(i);
  }

  return array;
};

export { base64ToUint8Array };
