import { useFavorites, type FavoriteItem as FavoriteItemType } from '../contexts/FavoritesContext';
import { SHARED_STYLES } from '../styles/constants';

interface FavoriteItemProps {
  id: string;
  displayText: string;
  favoriteData: Omit<FavoriteItemType, 'id'> & { id?: string };
}

export function FavoriteItem({ id, displayText, favoriteData }: FavoriteItemProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavoriteToggle = () => {
    const favoriteItem: FavoriteItemType = {
      id,
      ...favoriteData
    };

    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(favoriteItem);
    }
  };

  return (
    <div style={SHARED_STYLES.itemCard}>
      <div>
        <strong>{displayText}</strong>
      </div>
      <button onClick={handleFavoriteToggle}>
        {isFavorite(id) ? 'Remove' : 'Add'}
      </button>
    </div>
  );
}