import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LibroCard from '../components/LibroCard';
import type { Libro } from '../types/libro';

type HomeProps = {
  libros: Libro[];
};

function Home({ libros }: HomeProps) {
  useEffect(() => {
    document.title = 'Mi Libreria React - Hooks';
  }, []);

  const librosDestacados = libros.slice(0, 3);

  return (
    <>
      <section className="bg-primary text-white text-center rounded p-5 mb-5">
        <h1 className="display-4 fw-bold text-white">Bienvenido a Mi Libreria en React</h1>
        <p className="lead mb-4">
          La evolucion de nuestra interfaz usando componentes, layout, navegacion, formularios y hooks.
        </p>

        <Link className="btn btn-light" to="/catalogo">
          Ver catalogo
        </Link>
      </section>

      <section>
        <h2 className="text-center mb-4">Libros destacados</h2>

        <Row xs={1} md={2} lg={3} className="g-4">
          {librosDestacados.map((libro) => (
            <Col key={libro.id}>
              <LibroCard libro={libro} />
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
}

export default Home;