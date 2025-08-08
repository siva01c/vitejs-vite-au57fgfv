import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav>
      <ul style={{ listStyle: 'none' }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/music">Music</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
      </ul>
    </nav>
  );
}