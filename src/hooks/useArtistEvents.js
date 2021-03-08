import { useQuery } from "react-query";

const getArtistEvents = async (artist) => {
  const response = await fetch(
    `https://rest.bandsintown.com/v4/artists/${artist}/events?app_id=123`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function useArtistEvents(artist) {
  return useQuery([("artistEvents", artist)], () => getArtistEvents(artist));
}
