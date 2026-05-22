import { useEffect, useState } from 'react';
import { normalizeResponse } from '../config/api';

const formatEntity = (entity) => {
  if (!entity) return 'N/A';
  return typeof entity === 'object' ? entity.name || entity.title || 'Unknown' : entity;
};

const ACTIVITIES_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(ACTIVITIES_ENDPOINT);
        if (!response.ok) throw new Error('Failed to load activities');
        const payload = await response.json();
        setActivities(normalizeResponse(payload));
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>User</th>
              <th>Team</th>
              <th>Duration</th>
              <th>Distance</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id || activity.id || Math.random()}>
                <td>{activity.type}</td>
                <td>{formatEntity(activity.user)}</td>
                <td>{formatEntity(activity.team)}</td>
                <td>{activity.durationMinutes ?? '—'} min</td>
                <td>{activity.distanceKm != null ? `${activity.distanceKm} km` : '—'}</td>
                <td>{activity.caloriesBurned ?? '—'}</td>
                <td>{activity.timestamp ? new Date(activity.timestamp).toLocaleString() : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Activities;
