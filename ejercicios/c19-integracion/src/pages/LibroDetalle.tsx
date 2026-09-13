import { Alert, Card, Col, Row, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  const { data: libro, loading, error } = useFetch<Libro>(`/api/libros/${id}`);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3">Cargando libro...</p>
      </div>
    );
  }

  if (error || !libro) {
    return (
      <div className="text-center">
        <h1>Libro no encontrado</h1>
        <Alert variant="warning">{error ?? 'No encontramos un libro con ese identificador.'}</Alert>
        <Link className="btn btn-primary" to="/catalogo">
          Volver al catalogo
        </Link>
      </div>
    );
  }

  return (
    <Row className="align-items-center g-4">
      <Col md={5}>
        <Card className="shadow-sm">
          <Card.Img src={libro.imagen} alt={libro.titulo} />
        </Card>
      </Col>

      <Col md={7}>
        <h1>{libro.titulo}</h1>
        <p className="text-muted fs-5">{libro.autor.nombre}</p>
        <p>{libro.descripcion}</p>

        {libro.categorias && libro.categorias.length > 0 && (
          <p className="text-muted">
            Categorias: {libro.categorias.map((categoria) => categoria.nombre).join(', ')}
          </p>
        )}

        <p className="fw-bold text-primary fs-3">
          ${libro.precio.toLocaleString('es-AR')}
        </p>

        <p className={libro.disponible ? 'text-success' : 'text-danger'}>
          {libro.disponible ? 'Disponible' : 'No disponible'}
        </p>

        <Link className="btn btn-outline-primary" to="/catalogo">
          Volver al catalogo
        </Link>
      </Col>
    </Row>
  );
}

export default LibroDetalle;