import { Col, Row } from 'react-bootstrap';
import LibroCard from '../components/LibroCard';
import type { Libro } from '../types/libro';

type CatalogoProps = {
  libros: Libro[];
};

function Catalogo({ libros }: CatalogoProps) {
  return (
    <>
      <h1 className="mb-2">Catalogo</h1>
      <p className="text-muted mb-4">Explora todos los libros disponibles en la libreria.</p>

      <Row xs={1} md={2} lg={3} className="g-4">
        {libros.map((libro) => (
          <Col key={libro.id}>
            <LibroCard libro={libro} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Catalogo;