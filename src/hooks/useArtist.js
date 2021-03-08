import { useQuery } from "react-query";

const getArtist = async (artist) => {
  const response = await fetch(
    `https://rest.bandsintown.com/v4/artists/${artist}?app_id=123`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function useArtist(artist) {
  return useQuery(["artist", artist], () => getArtist(artist));
}
