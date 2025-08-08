import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <nav>
      <ul>
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
  </nav>
);

export default Navbar;
