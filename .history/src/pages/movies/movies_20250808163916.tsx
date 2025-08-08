import { useState, useEffect } from 'react';
import { moviesApi } from '../../utils/apiManager';
import { useFavorites } from '../../contexts/FavoritesContext';

interface Movie {
  id: number;
  name: string;
  permalink: string;
  start_date: string;
  end_date: string | null;
  country: string;
  network: string;
  status: string;
  image_thumbnail_path: string;
}

interface EpisodateResponse {
  total: string;
  page: number;
  pages: number;
  tv_shows: Movie[];
}

export default function Movies() {
  const [data, setData] = useState<EpisodateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery.trim()) {
        setData(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await moviesApi(searchQuery);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchData, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleFavoriteToggle = (movie: Movie) => {
    const favoriteItem = {
      id: movie.id.toString(),
      title: movie.name,
      type: 'movie' as const,
    };

    if (isFavorite(movie.id.toString())) {
      removeFavorite(movie.id.toString());
    } else {
      addFavorite(favoriteItem);
    }
  };

  return (
    <section style={{ padding: '20px' }}>
      <h1>Movies Search</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search for movies/TV shows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '400px'
          }}
        />
      </div>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      
      {data && !loading && (
        <div>
          <p>Found {data.total} results</p>
          {data.tv_shows?.map((movie) => (
            <div
              key={movie.id}
              style={{
                padding: '10px',
                margin: '10px 0',
                border: '1px solid #ddd',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {movie.image_thumbnail_path && (
                  <img 
                    src={movie.image_thumbnail_path} 
                    alt={movie.name}
                    style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '4px' }}
                  />
                )}
                <div>
                  <strong>{movie.name}</strong>
                
                </div>
              </div>
              <button
                onClick={() => handleFavoriteToggle(movie)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: isFavorite(movie.id.toString()) ? '#ff4444' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {isFavorite(movie.id.toString()) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          ))}
        </div>
      )}

      {!searchQuery.trim() && !loading && (
        <p>Enter a search term to find movies and TV shows.</p>
      )}
    </section>
  );
}
