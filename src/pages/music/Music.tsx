import { musicApi } from '../../utils/api';
import { MusicItem, type Recording } from '../../components/MusicItem';
import { useApiSearch } from '../../hooks/useApiSearch';
import { SHARED_STYLES } from '../../styles/constants';

interface MusicBrainzResponse {
  recordings: Recording[];
  count: number;
}

export default function Music() {
  const { data, loading, error, searchQuery, setSearchQuery } = useApiSearch<MusicBrainzResponse>({
    apiFunction: musicApi
  });

  return (
    <section style={SHARED_STYLES.pageContainer}>
      <h1>Music Search</h1>
      
      <div style={SHARED_STYLES.searchContainer}>
        <input
          type="text"
          placeholder="Search for music..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={SHARED_STYLES.searchInput}
        />
      </div>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      
      {data && !loading && (
        <div>
          <p>Found {data.count} recordings</p>
          {data.recordings?.slice(0, 50).map((recording) => (
            <MusicItem key={recording.id} recording={recording} />
          ))}
        </div>
      )}
    </section>
  );
}