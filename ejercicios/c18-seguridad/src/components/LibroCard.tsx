import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Libro } from '../types/libro';

type LibroCardProps = {
  libro: Libro;
};

function LibroCard({ libro }: LibroCardProps) {
  const [likes, setLikes] = useState<number>(0);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={libro.imagen}
        style={{ height: '250px', objectFit: 'cover' }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{libro.titulo}</Card.Title>
        <Card.Text className="text-muted">{libro.autor}</Card.Text>
        <Card.Text className="fw-bold text-primary fs-4">
          ${libro.precio.toLocaleString('es-AR')}
        </Card.Text>

        <div className="mt-auto d-grid gap-2">
          <Link className="btn btn-primary" to={`/libros/${libro.id}`}>
            Ver mas
          </Link>

          <Button variant="outline-danger" onClick={() => setLikes(likes + 1)}>
            Me gusta: {likes}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LibroCard;