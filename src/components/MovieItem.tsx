import { FavoriteItem } from './FavoriteItem';

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
  const favoriteData = {
    title: movie.name,
    type: 'movie' as const,
  };

  return (
    <FavoriteItem
      id={movie.id.toString()}
      displayText={movie.name}
      favoriteData={favoriteData}
    />
  );
}