import { useFavorites } from '../contexts/FavoritesContext';

export interface Movie {
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

interface MovieItemProps {
  movie: Movie;
}

export function MovieItem({ movie }: MovieItemProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavoriteToggle = () => {
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
    <div
      style={{
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #000',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div>
        <strong>{movie.name}</strong>
      </div>
      <button onClick={handleFavoriteToggle}>
        {isFavorite(movie.id.toString()) ? 'Remove' : 'Add'}
      </button>
    </div>
  );
}