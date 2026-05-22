import { NavLink, Routes, Route } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import { API_BASE_URL } from './config/api';
import './App.css';

function Home() {
  return (
    <section>
      <h2>OctoFit Tracker</h2>
      <p>
        This React app consumes the OctoFit Tracker API using a Codespaces-aware base URL.
      </p>
      <p>
        API endpoint: <code>{API_BASE_URL}</code>
      </p>
      <p>
        Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use
        the GitHub Codespaces URL. When it is unset, the app falls back to
        <code>http://localhost:8000/api</code>.
      </p>
    </section>
  );
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>OctoFit Tracker Dashboard</h1>
        <p className="note">
          Use <code>import.meta.env.VITE_CODESPACE_NAME</code> or set
          <code>.env.local</code> with <code>VITE_CODESPACE_NAME</code>.
        </p>
      </header>

      <nav className="app-nav">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/workouts">Workouts</NavLink>
      </nav>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
