import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../schemas/LoginSchema';
import { apiFetch, guardarToken } from '../services/api';

type LoginForm = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    rol: 'ADMIN' | 'CLIENTE';
  };
};

type ErroresFormulario = Partial<Record<keyof LoginForm, string>>;

const formInicial: LoginForm = {
  email: '',
  password: '',
};

function Login() {
  const [form, setForm] = useState<LoginForm>(formInicial);
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorApi(null);

    const resultado = loginSchema.safeParse(form);

    if (!resultado.success) {
      const nuevosErrores: ErroresFormulario = {};
      resultado.error.issues.forEach((issue) => {
        const campo = issue.path[0] as keyof LoginForm;
        nuevosErrores[campo] = issue.message;
      });
      setErrores(nuevosErrores);
      return;
    }

    try {
      const data = await apiFetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(resultado.data),
      });
      guardarToken(data.token);
      setErrores({});
      navigate('/libros/nuevo');
    } catch (error) {
      setErrorApi(error instanceof Error ? error.message : 'Error al iniciar sesion');
    }
  };

  return (
    <>
      <h1 className="mb-2">Login</h1>
      <p className="text-muted mb-4">Ingresa para administrar la libreria.</p>

      {errorApi && <Alert variant="danger">{errorApi}</Alert>}

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            isInvalid={!!errores.email}
          />
          <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            isInvalid={!!errores.password}
          />
          <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">
          Ingresar
        </Button>
      </Form>
    </>
  );
}

export default Login;