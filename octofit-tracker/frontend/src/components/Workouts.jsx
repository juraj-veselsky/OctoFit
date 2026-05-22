import { useEffect, useState } from 'react';
import { normalizeResponse } from '../config/api';

const formatUser = (user) => {
  if (!user) return 'N/A';
  return typeof user === 'object' ? user.name || 'Unknown' : user;
};

const WORKOUTS_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(WORKOUTS_ENDPOINT);
        if (!response.ok) throw new Error('Failed to load workouts');
        const payload = await response.json();
        setWorkouts(normalizeResponse(payload));
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>User</th>
              <th>Goal</th>
              <th>Scheduled</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout._id || workout.id || Math.random()}>
                <td>{workout.name}</td>
                <td>{formatUser(workout.user)}</td>
                <td>{workout.goal}</td>
                <td>{workout.scheduledFor ? new Date(workout.scheduledFor).toLocaleString() : '—'}</td>
                <td>{workout.durationMinutes ?? '—'} min</td>
                <td>{workout.completed ? 'Completed' : 'Open'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Workouts;
