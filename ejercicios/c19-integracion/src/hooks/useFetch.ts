import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';

export function useFetch<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);
        const datos = await apiFetch<T>(path);
        setData(datos);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [path]);

  return { data, loading, error };
}