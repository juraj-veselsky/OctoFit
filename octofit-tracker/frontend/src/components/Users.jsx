import { useEffect, useState } from 'react';
import { normalizeResponse } from '../config/api';

const formatTeam = (team) => {
  if (!team) return 'None';
  return typeof team === 'object' ? team.name || 'Unknown' : team;
};

const USERS_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(USERS_ENDPOINT);
        if (!response.ok) throw new Error('Failed to load users');
        const payload = await response.json();
        setUsers(normalizeResponse(payload));
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id || user.id || Math.random()}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{formatTeam(user.team)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Users;
