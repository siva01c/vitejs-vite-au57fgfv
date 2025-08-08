import { moviesApi } from '../../utils/api';
import { MovieItem, type Movie } from '../../components/MovieItem';
import { useApiSearch } from '../../hooks/useApiSearch';
import { SHARED_STYLES } from '../../styles/constants';

interface EpisodateResponse {
  total: string;
  page: number;
  pages: number;
  tv_shows: Movie[];
}

export default function Movies() {
  const { data, loading, error, searchQuery, setSearchQuery } = useApiSearch<EpisodateResponse>({
    apiFunction: moviesApi
  });

  return (
    <section style={SHARED_STYLES.pageContainer}>
      <h1>Movies Search</h1>
      
      <div style={SHARED_STYLES.searchContainer}>
        <input
          type="text"
          placeholder="Search for movies/TV shows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={SHARED_STYLES.searchInput}
        />
      </div>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      
      {data && !loading && (
        <div>
          <p>Found {data.total} results</p>
          {data.tv_shows?.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}