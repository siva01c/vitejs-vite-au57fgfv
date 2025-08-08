import { useFavorites } from '../contexts/FavoritesContext';

export interface Recording {
  id: string;
  title: string;
  length?: number;
  'artist-credit'?: Array<{
    artist: {
      name: string;
    };
  }>;
}

interface MusicItemProps {
  recording: Recording;
}

export function MusicItem({ recording }: MusicItemProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavoriteToggle = () => {
    const artist = recording['artist-credit']?.[0]?.artist.name || '';
    const favoriteItem = {
      id: recording.id,
      title: recording.title,
      artist,
      type: 'music' as const,
    };

    if (isFavorite(recording.id)) {
      removeFavorite(recording.id);
    } else {
      addFavorite(favoriteItem);
    }
  };

  const artist = recording['artist-credit']?.[0]?.artist.name || 'Unknown Artist';

  return (
    <div
      style={{ 
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div>
        <strong>{artist} - {recording.title}</strong>
        {recording.length && (
          <span style={{ marginLeft: '10px', color: '#666' }}>
            ({Math.floor(recording.length / 1000 / 60)}:
            {String(Math.floor((recording.length / 1000) % 60)).padStart(2, '0')})
          </span>
        )}
      </div>
      <button onClick={handleFavoriteToggle}>
        {isFavorite(recording.id) ? 'Remove' : 'Add'}
      </button>
    </div>
  );
}