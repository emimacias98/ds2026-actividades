document.getElementById('botonBuscar')?.addEventListener('click', () => {
    const query = document.getElementById('inputBusqueda').value;
    buscarLibros(query);
});

function buscarLibros(titulo) {
    const contenedor = document.getElementById('contenedorLibros');
    contenedor.innerHTML = '<p class="text-center">Buscando...</p>';

    fetch(`https://openlibrary.org/search.json?q=${titulo}&limit=12`)
        .then(response => response.json())
        .then(data => {
            contenedor.innerHTML = ''; // Limpiar mensaje de carga
            
            data.docs.forEach(libro => {
                const card = `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <img src="${libro.cover_i ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg` : 'https://via.placeholder.com/150'}" class="card-img-top" alt="${libro.title}">
                            <div class="card-body">
                                <h5 class="card-title">${libro.title}</h5>
                                <p class="card-text text-muted">${libro.author_name ? libro.author_name[0] : 'Autor desconocido'}</p>
                                <a href="libro.html" class="btn btn-sm btn-outline-primary">Ver detalle</a>
                            </div>
                        </div>
                    </div>
                `;
                contenedor.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            contenedor.innerHTML = '<p class="text-danger">Hubo un error en la búsqueda.</p>';
        });
}