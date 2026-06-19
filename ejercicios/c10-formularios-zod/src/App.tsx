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
  const [libros, setLibros] = useState<Libro[]>(librosIniciales);

  const agregarLibro = (nuevoLibro: Libro) => {
    setLibros([...libros, nuevoLibro]);
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home libros={libros} />} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
        <Route path="/libros/:id" element={<LibroDetalle libros={libros} />} />
      </Routes>
    </Layout>
  );
}

export default App;