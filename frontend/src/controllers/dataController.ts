const fetchData = async (musicPath: string) => {
  return await fetch("http://localhost:5000/files?folder=" + musicPath)
    .then((res) => res.json())
    .then(async (response) => {
      return response["data"];
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      return [];
    });
};

export { fetchData };
