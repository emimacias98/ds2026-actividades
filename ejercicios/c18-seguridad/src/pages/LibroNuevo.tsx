import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { libroSchema } from '../schemas/LibroSchema';
import type { Libro } from '../types/libro';

type LibroNuevoProps = {
  onAgregar: (libro: Libro) => void;
};

type LibroForm = {
  titulo: string;
  autor: string;
  precio: string;
  imagen: string;
  descripcion: string;
  disponible: boolean;
};

type ErroresFormulario = Partial<Record<keyof LibroForm, string>>;

const formInicial: LibroForm = {
  titulo: '',
  autor: '',
  precio: '',
  imagen: '',
  descripcion: '',
  disponible: true,
};

function LibroNuevo({ onAgregar }: LibroNuevoProps) {
  const [form, setForm] = useState<LibroForm>(formInicial);
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    const checked = event.target instanceof HTMLInputElement ? event.target.checked : false;

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resultado = libroSchema.safeParse(form);

    if (!resultado.success) {
      const nuevosErrores: ErroresFormulario = {};

      resultado.error.issues.forEach((issue) => {
        const campo = issue.path[0] as keyof LibroForm;
        nuevosErrores[campo] = issue.message;
      });

      setErrores(nuevosErrores);
      return;
    }

    const nuevoLibro: Libro = {
      id: Date.now(),
      ...resultado.data,
    };

    onAgregar(nuevoLibro);
    setErrores({});
    setForm(formInicial);
    navigate('/catalogo');
  };

  return (
    <>
      <h1 className="mb-2">Alta de libro</h1>
      <p className="text-muted mb-4">Carga un nuevo libro para sumarlo al catalogo.</p>

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="titulo">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            isInvalid={!!errores.titulo}
          />
          <Form.Control.Feedback type="invalid">
            {errores.titulo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="autor">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            type="text"
            name="autor"
            value={form.autor}
            onChange={handleChange}
            isInvalid={!!errores.autor}
          />
          <Form.Control.Feedback type="invalid">
            {errores.autor}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="precio">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            isInvalid={!!errores.precio}
          />
          <Form.Control.Feedback type="invalid">
            {errores.precio}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="imagen">
          <Form.Label>URL de imagen</Form.Label>
          <Form.Control
            type="url"
            name="imagen"
            value={form.imagen}
            onChange={handleChange}
            isInvalid={!!errores.imagen}
          />
          <Form.Control.Feedback type="invalid">
            {errores.imagen}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="descripcion">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            isInvalid={!!errores.descripcion}
          />
          <Form.Control.Feedback type="invalid">
            {errores.descripcion}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Check
          className="mb-4"
          type="checkbox"
          name="disponible"
          label="Disponible"
          checked={form.disponible}
          onChange={handleChange}
        />

        {Object.keys(errores).length > 0 && (
          <Alert variant="danger">
            Revisa los campos marcados antes de guardar.
          </Alert>
        )}

        <Button type="submit" variant="primary">
          Guardar libro
        </Button>
      </Form>
    </>
  );
}

export default LibroNuevo;