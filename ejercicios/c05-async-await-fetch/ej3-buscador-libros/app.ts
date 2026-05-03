interface LibroOL {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
}

const inputBusqueda = document.getElementById('input-busqueda') as HTMLInputElement;
const btnBuscar = document.getElementById('btn-buscar') as HTMLButtonElement;
const contenedorResultados = document.getElementById('resultados') as HTMLDivElement;
const mensajeError = document.getElementById('mensaje-error') as HTMLParagraphElement;

async function buscarLibros(query: string) {
    try {
        contenedorResultados.innerHTML = "Buscando..."; 
        
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
        if (!response.ok) throw new Error("Error en la red");

        const data = await response.json();
        const libros: LibroOL[] = data.docs.slice(0, 10); 

        renderizarLibros(libros);
    } catch (error) {
        contenedorResultados.innerHTML = "";
        mostrarError("Hubo un fallo al conectar con el servidor.");
    }
}

function renderizarLibros(libros: LibroOL[]) {
    contenedorResultados.innerHTML = ""; 

    if (libros.length === 0) {
        contenedorResultados.innerHTML = "No se encontraron resultados.";
        return;
    }

    libros.forEach(libro => {
        const div = document.createElement('div');
        div.className = 'tarjeta-libro';
        
        const autor = libro.author_name ? libro.author_name.join(', ') : "Autor desconocido";
        const año = libro.first_publish_year ? libro.first_publish_year : "Año no disponible";

        div.innerHTML = `
            <h3>${libro.title}</h3>
            <p><strong>Autor:</strong> ${autor}</p>
            <p><strong>Año de publicación:</strong> ${año}</p>
        `;
        contenedorResultados.appendChild(div);
    });
}

btnBuscar.addEventListener('click', () => {
    const texto = inputBusqueda.value.trim();
    
    if (texto === "") {
        mostrarError("El campo de búsqueda no puede estar vacío.");
        return;
    }

    mensajeError.style.display = "none"; 
    buscarLibros(texto);
});

function mostrarError(mensaje: string) {
    mensajeError.textContent = mensaje;
    mensajeError.style.display = "block";
}

export {};