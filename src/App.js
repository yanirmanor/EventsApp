import { QueryClient, QueryClientProvider } from "react-query";
import SearchArtist from "./components/SearchArtist";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchArtist />
    </QueryClientProvider>
  );
}

export default App;
