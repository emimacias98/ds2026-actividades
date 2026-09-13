export type Autor = {
  id: number;
  nombre: string;
  nacionalidad: string;
  nacimiento: number;
};

export type Categoria = {
  id: number;
  nombre: string;
};

export type Libro = {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
  descripcion: string;
  disponible: boolean;
  autorId: number;
  autor: Autor;
  categorias?: Categoria[];
};