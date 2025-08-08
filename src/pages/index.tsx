import Home from './home/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar';
import Music from './music/music';
import Movies from './movies/movies';

export default function Pages() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/music" element={<Music />} />
      </Routes>
    </BrowserRouter>
  );
}
