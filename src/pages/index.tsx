import Home from './home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import Music from './music/Music';
import Movies from './movies/Movies';
import { FavoritesProvider } from '../contexts/FavoritesContext';

export default function Pages() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/music" element={<Music />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
