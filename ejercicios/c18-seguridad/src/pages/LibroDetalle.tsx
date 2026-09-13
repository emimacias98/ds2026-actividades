import { Card, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import type { Libro } from '../types/libro';

type LibroDetalleProps = {
  libros: Libro[];
};

function LibroDetalle({ libros }: LibroDetalleProps) {
  const { id } = useParams<{ id: string }>();
  const libro = libros.find((item) => item.id === Number(id));

  if (!libro) {
    return (
      <div className="text-center">
        <h1>Libro no encontrado</h1>
        <p className="text-muted mb-4">No encontramos un libro con ese identificador.</p>

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
        <p className="text-muted fs-5">{libro.autor}</p>
        <p>{libro.descripcion}</p>

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