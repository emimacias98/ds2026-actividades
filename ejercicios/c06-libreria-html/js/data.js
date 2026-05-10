document.getElementById('botonBuscar')?.addEventListener('click', () => {
    const query = document.getElementById('inputBusqueda').value;
    buscarLibros(query);
});

function buscarLibros(titulo) {
    const contenedor = document.getElementById('contenedorLibros');
    contenedor.innerHTML = '<p class="text-center">Buscando libros...</p>';

    fetch(`https://openlibrary.org/search.json?q=${titulo}&limit=12`)
        .then(response => response.json())
        .then(data => {
            contenedor.innerHTML = ''; 
            data.docs.forEach(libro => {
                const bookId = libro.key.split('/').pop();
                const card = `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 shadow-sm">
                            <img src="${libro.cover_i ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg` : 'https://via.placeholder.com/150'}" class="card-img-top" alt="${libro.title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${libro.title}</h5>
                                <p class="card-text text-muted">${libro.author_name ? libro.author_name[0] : 'Autor desconocido'}</p>
                                <a href="libro.html?id=${bookId}" class="btn btn-primary mt-auto">Ver más</a>
                            </div>
                        </div>
                    </div>
                `;
                contenedor.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            contenedor.innerHTML = '<p class="text-danger text-center">Hubo un error en la búsqueda.</p>';
        });
}

if (window.location.pathname.includes('libro.html')) {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    if (bookId) {
        fetch(`https://openlibrary.org/works/${bookId}.json`)
            .then(res => res.json())
            .then(data => {
                document.getElementById('detalleTitulo').innerText = data.title;
                let descripcion = "Sin descripción disponible.";
                if (typeof data.description === 'string') {
                    descripcion = data.description;
                } else if (data.description && data.description.value) {
                    descripcion = data.description.value;
                }
                document.getElementById('detalleDescripcion').innerText = descripcion;
                document.getElementById('detallePrecio').innerText = `$${Math.floor(Math.random() * 20000) + 5000}`;
                if (data.covers && data.covers.length > 0) {
                    document.getElementById('detalleImagen').src = `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`;
                }
            })
            .catch(err => {
                console.error("Error loading details:", err);
                document.getElementById('detalleTitulo').innerText = "Error al cargar el libro";
            });
    }
}