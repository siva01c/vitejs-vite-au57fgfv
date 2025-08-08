// src/pages/music/music.tsx
import { useEffect, useState } from 'react';
import { musicApi } from '../../utils/apiManager';

interface Recording {
  id: string;
  title: string;
  length?: number;
  'artist-credit'?: Array<{
    artist: {
      name: string;
    };
  }>;
}

interface MusicBrainzResponse {
  recordings: Recording[];
  count: number;
}

export default function Music() {
  const [data, setData] = useState<MusicBrainzResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await musicApi('unforgiven');
        console.log(result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <section>
        <h1>Welcome to music page</h1>
        {data && (
          <div>
            <p>Found {data.count} recordings</p>
            {data.recordings?.slice(0, 10).map((recording) => (
              <div key={recording.id}>
                <strong>{recording.title}</strong>
                {recording['artist-credit'] && (
                  <span> by {recording['artist-credit'][0]?.artist.name}</span>
                )}
                {recording.length && (
                  <span>
                    {' '}
                    ({Math.floor(recording.length / 1000 / 60)}:
                    {String(
                      Math.floor((recording.length / 1000) % 60)
                    ).padStart(2, '0')}
                    )
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
