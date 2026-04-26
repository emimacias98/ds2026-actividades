"use strict";
const catalogo = [
    { isbn: "978-1", titulo: "El Aleph", autor: "Jorge Luis Borges", precio: 5500, disponible: true },
    { isbn: "978-2", titulo: "Rayuela", autor: "Julio Cortázar", precio: 4800, disponible: false },
    { isbn: "978-3", titulo: "Ficciones", autor: "Jorge Luis Borges", precio: 5200, disponible: true },
    { isbn: "978-4", titulo: "Inundación", autor: "Eugenia Almeida", precio: 3900, disponible: true }
];
const inputAutor = document.getElementById("filtroAutor");
const listaUl = document.getElementById("listado");
const statsP = document.getElementById("stats");
function buscarPorAutor(autor) {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}
function librosDisponibles() {
    return catalogo.filter(libro => libro.disponible);
}
function precioPromedio(libros) {
    if (libros.length === 0)
        return 0;
    const suma = libros.reduce((acc, libro) => acc + libro.precio, 0);
    return suma / libros.length;
}
function renderizar(libros) {
    listaUl.innerHTML = ""; // Limpiar lista previa
    libros.forEach(libro => {
        const li = document.createElement("li");
        li.innerText = `${libro.titulo} (${libro.autor}) - $${libro.precio} ${libro.disponible ? '✅' : '❌'}`;
        listaUl.appendChild(li);
    });
    const promedio = precioPromedio(libros);
    statsP.innerText = `Libros encontrados: ${libros.length} | Precio Promedio: $${promedio.toFixed(2)}`;
}
document.getElementById("filtrar")?.addEventListener("click", () => {
    renderizar(buscarPorAutor(inputAutor.value));
});
document.getElementById("mostrarDisponibles")?.addEventListener("click", () => {
    renderizar(librosDisponibles());
});
document.getElementById("mostrarTodos")?.addEventListener("click", () => {
    renderizar(catalogo);
});
renderizar(catalogo);
