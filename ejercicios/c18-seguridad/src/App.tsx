import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { librosIniciales } from './data/libro';
import Catalogo from './pages/Catalogo';
import Home from './pages/Home';
import LibroDetalle from './pages/LibroDetalle';
import LibroNuevo from './pages/LibroNuevo';
import type { Libro } from './types/libro';

function App() {
  const [librosAgregados, setLibrosAgregados] = useState<Libro[]>([]);

  const agregarLibro = (nuevoLibro: Libro) => {
    setLibrosAgregados([...librosAgregados, nuevoLibro]);
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home libros={librosIniciales} />} />
        <Route path="/catalogo" element={<Catalogo libros={librosAgregados} />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
        <Route path="/libros/:id" element={<LibroDetalle libros={[...librosIniciales, ...librosAgregados]} />} />
      </Routes>
    </Layout>
  );
}

export default App;