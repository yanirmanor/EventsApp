import useArtist from "../hooks/useArtist";

export default function Artist({ artist }) {
  const { data, error, isLoading, isError } = useArtist(artist);

  if (isLoading) {
    return <div data-testid="loader">Loading Artist...</div>;
  }

  if (isError) {
    return <div data-testid="error">Error: {error.message}</div>;
  }

  const { name, image_url } = data;
  return (
    <figure className="bg-white overflow-hidden flex">
      <div className="relative z-10 flex-none w-full h-32 md:h-64 rounded-none">
        <img
          src={image_url}
          alt={name}
          className="absolute inset-0 bg-cover bg-center z-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-10 flex justify-center items-end text-3xl text-white font-semibold">
          {name}
        </div>
      </div>
    </figure>
  );
}
