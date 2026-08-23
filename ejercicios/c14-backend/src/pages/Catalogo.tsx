import { Alert, Col, Row, Spinner } from 'react-bootstrap';
import LibroCard from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

type CatalogoProps = {
  libros: Libro[];
};

function Catalogo({ libros }: CatalogoProps) {
  const { data: librosMock, loading, error } = useFetch<Libro[]>('/libros.json');
  const todosLosLibros = [...(librosMock ?? []), ...libros];

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3">Cargando libros...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <h1 className="mb-2">Catalogo</h1>
      <p className="text-muted mb-4">Explora todos los libros disponibles en la libreria.</p>

      <Row xs={1} md={2} lg={3} className="g-4">
        {todosLosLibros.map((libro) => (
          <Col key={libro.id}>
            <LibroCard libro={libro} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Catalogo;