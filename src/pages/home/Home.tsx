import { useState } from 'react';
import { useFavorites } from '../../contexts/FavoritesContext';
import { SHARED_STYLES } from '../../styles/constants';

export default function Home() {
  const { favorites, removeFavorite } = useFavorites();
  const [filter, setFilter] = useState('');

  const filteredFavorites = favorites.filter(item =>
    item.title.toLowerCase().includes(filter.toLowerCase()) ||
    (item.artist && item.artist.toLowerCase().includes(filter.toLowerCase()))
  );

  const musicFavorites = filteredFavorites.filter(item => item.type === 'music');
  const movieFavorites = filteredFavorites.filter(item => item.type === 'movie');

  return (
    <section style={SHARED_STYLES.pageContainer}>
      <h1>My Favourite Stuff</h1>
      
      <div style={SHARED_STYLES.searchContainer}>
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={SHARED_STYLES.homeSearchInput}
        />
      </div>

      <div style={SHARED_STYLES.sectionContainer}>
        <h2>Music</h2>
        {musicFavorites.length === 0 ? (
          <p>No music favorites found.</p>
        ) : (
          musicFavorites.map(item => (
            <div key={item.id} style={SHARED_STYLES.favoriteCard}>
              <div>
                {item.artist} - {item.title}
              </div>
              <button onClick={() => removeFavorite(item.id)}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div>
        <h2>Movies</h2>
        {movieFavorites.length === 0 ? (
          <p>No movie favorites found.</p>
        ) : (
          movieFavorites.map(item => (
            <div key={item.id} style={SHARED_STYLES.favoriteCard}>
              <div>
                {item.title}
              </div>
              <button onClick={() => removeFavorite(item.id)}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
