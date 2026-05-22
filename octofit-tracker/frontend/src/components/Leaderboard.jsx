import { useEffect, useState } from 'react';
import { normalizeResponse } from '../config/api';

const formatEntity = (entity) => {
  if (!entity) return 'N/A';
  return typeof entity === 'object' ? entity.name || entity.title || 'Unknown' : entity;
};

const LEADERBOARD_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(LEADERBOARD_ENDPOINT);
        if (!response.ok) throw new Error('Failed to load leaderboard');
        const payload = await response.json();
        setEntries(normalizeResponse(payload));
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id || entry.id || Math.random()}>
                <td>{entry.rank ?? '—'}</td>
                <td>{formatEntity(entry.user)}</td>
                <td>{formatEntity(entry.team)}</td>
                <td>{entry.score ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Leaderboard;
