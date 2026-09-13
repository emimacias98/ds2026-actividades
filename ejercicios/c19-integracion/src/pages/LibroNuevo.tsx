import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { libroSchema } from '../schemas/LibroSchema';
import { apiFetch } from '../services/api';
import type { Libro } from '../types/libro';

type LibroForm = {
  titulo: string;
  precio: string;
  imagen: string;
  descripcion: string;
  disponible: boolean;
  autorId: string;
  categoriasIds: string;
};

type LibroPayload = {
  titulo: string;
  precio: number;
  imagen: string;
  descripcion: string;
  disponible: boolean;
  autorId: number;
  categoriasIds: number[];
};

type ErroresFormulario = Partial<Record<keyof LibroForm, string>>;

const formInicial: LibroForm = {
  titulo: '',
  precio: '',
  imagen: '',
  descripcion: '',
  disponible: true,
  autorId: '1',
  categoriasIds: '1',
};

function LibroNuevo() {
  const [form, setForm] = useState<LibroForm>(formInicial);
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorApi(null);

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

    const payload: LibroPayload = {
      titulo: resultado.data.titulo,
      precio: resultado.data.precio,
      imagen: resultado.data.imagen,
      descripcion: resultado.data.descripcion,
      disponible: resultado.data.disponible,
      autorId: resultado.data.autorId,
      categoriasIds: resultado.data.categoriasIds
        .split(',')
        .map((id) => Number(id.trim()))
        .filter((id) => Number.isInteger(id) && id > 0),
    };

    if (payload.categoriasIds.length === 0) {
      setErrores({ categoriasIds: 'Ingresa categorias validas separadas por coma' });
      return;
    }

    try {
      setGuardando(true);
      await apiFetch<Libro>('/api/libros', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setErrores({});
      setForm(formInicial);
      navigate('/catalogo');
    } catch (error) {
      setErrorApi(error instanceof Error ? error.message : 'Error al guardar el libro');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <>
      <h1 className="mb-2">Alta de libro</h1>
      <p className="text-muted mb-4">Carga un nuevo libro usando la API real.</p>

      {errorApi && <Alert variant="danger">{errorApi}</Alert>}

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="titulo">
          <Form.Label>Titulo</Form.Label>
          <Form.Control type="text" name="titulo" value={form.titulo} onChange={handleChange} isInvalid={!!errores.titulo} />
          <Form.Control.Feedback type="invalid">{errores.titulo}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="precio">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" name="precio" value={form.precio} onChange={handleChange} isInvalid={!!errores.precio} />
          <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="imagen">
          <Form.Label>URL de imagen</Form.Label>
          <Form.Control type="url" name="imagen" value={form.imagen} onChange={handleChange} isInvalid={!!errores.imagen} />
          <Form.Control.Feedback type="invalid">{errores.imagen}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="descripcion">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control as="textarea" rows={3} name="descripcion" value={form.descripcion} onChange={handleChange} isInvalid={!!errores.descripcion} />
          <Form.Control.Feedback type="invalid">{errores.descripcion}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="autorId">
          <Form.Label>ID de autor</Form.Label>
          <Form.Control type="number" name="autorId" value={form.autorId} onChange={handleChange} isInvalid={!!errores.autorId} />
          <Form.Control.Feedback type="invalid">{errores.autorId}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="categoriasIds">
          <Form.Label>IDs de categorias</Form.Label>
          <Form.Control type="text" name="categoriasIds" value={form.categoriasIds} onChange={handleChange} isInvalid={!!errores.categoriasIds} />
          <Form.Text muted>Separalos con coma. Ejemplo: 1,2</Form.Text>
          <Form.Control.Feedback type="invalid">{errores.categoriasIds}</Form.Control.Feedback>
        </Form.Group>

        <Form.Check className="mb-4" type="checkbox" name="disponible" label="Disponible" checked={form.disponible} onChange={handleChange} />

        <Button type="submit" variant="primary" disabled={guardando}>
          {guardando ? 'Guardando...' : 'Guardar libro'}
        </Button>
      </Form>
    </>
  );
}

export default LibroNuevo;