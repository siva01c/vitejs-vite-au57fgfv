import { FavoriteItem } from './FavoriteItem';

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
  const artist = recording['artist-credit']?.[0]?.artist.name || 'Unknown Artist';
  const displayText = `${artist} - ${recording.title}`;
  
  const favoriteData = {
    title: recording.title,
    artist,
    type: 'music' as const,
  };

  return (
    <FavoriteItem
      id={recording.id}
      displayText={displayText}
      favoriteData={favoriteData}
    />
  );
}