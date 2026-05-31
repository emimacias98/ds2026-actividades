import { useState } from 'react';
import { Navbar as BootstrapNavbar, Container, Nav, Row, Col, Card, Button } from 'react-bootstrap';

type LibroCardProps = {
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
};

function NavbarComponent() {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand href="#home">📖 Mi Librería React</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#inicio">Inicio</Nav.Link>
            <Nav.Link href="#catalogo">Catálogo</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

function FooterComponent() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <Container>
        <p className="mb-0">&copy; 2026 Mi Librería - UTN FRLP. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
}

function LibroCard({ titulo, autor, precio, imagen }: LibroCardProps) {
  const [likes, setLikes] = useState<number>(0);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={imagen} style={{ height: '250px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{titulo}</Card.Title>
        <Card.Text className="text-muted">{autor}</Card.Text>
        <Card.Text className="fw-bold text-primary fs-4">${precio.toLocaleString('es-AR')}</Card.Text>
        <div className="mt-auto d-grid gap-2">
          <Button variant="primary">Ver más</Button>
          <Button variant="outline-danger" onClick={() => setLikes(likes + 1)}>
            ❤️ {likes} {likes === 1 ? 'Like' : 'Likes'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

function App() {
  const librosDestacados: LibroCardProps[] = [
    { titulo: "El Aleph", autor: "Jorge Luis Borges", precio: 15000, imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80" },
    { titulo: "Rayuela", autor: "Julio Cortázar", precio: 18000, imagen: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80" },
    { titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 14000, imagen: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" },
    { titulo: "Sobre héroes y tumbas", autor: "Ernesto Sabato", precio: 16500, imagen: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=400&q=80" },
    { titulo: "El túnel", autor: "Ernesto Sabato", precio: 12000, imagen: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80" },
    { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 22000, imagen: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <NavbarComponent />

      <header className="bg-primary text-white text-center py-5 mb-5">
        <Container>
          <h1 className="display-4 fw-bold">Bienvenido a Mi Librería en React</h1>
          <p className="lead">La evolución de nuestra interfaz utilizando componentes dinámicos.</p>
        </Container>
      </header>

      <main className="flex-grow-1">
        <Container>
          <h2 className="text-center mb-4">Nuestro Catálogo Destacado</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {librosDestacados.map((libro, index) => (
              <Col key={index}>
                <LibroCard 
                  titulo={libro.titulo} 
                  autor={libro.autor} 
                  precio={libro.precio} 
                  imagen={libro.imagen} 
                />
              </Col>
            ))}
          </Row>
        </Container>
      </main>

      <FooterComponent />
    </div>
  );
}

export default App;