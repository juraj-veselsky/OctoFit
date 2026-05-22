import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeResponse } from '../config/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/teams`);
        if (!response.ok) throw new Error('Failed to load teams');
        const payload = await response.json();
        setTeams(normalizeResponse(payload));
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id || team.id || Math.random()}>
                <td>{team.name}</td>
                <td>{team.description || '—'}</td>
                <td>{Array.isArray(team.members) ? team.members.length : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Teams;
