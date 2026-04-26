    interface Libro {
        isbn: string;
        titulo: string;
        autor: string;
        precio: number;
        disponible: boolean;
    }

    let catalogo: Libro[] = [
        { isbn: "AUTO-1", titulo: "El Aleph", autor: "Borges", precio: 5500, disponible: true },
        { isbn: "AUTO-2", titulo: "Rayuela", autor: "Cortázar", precio: 4800, disponible: false }
    ];

    const listaUl = document.getElementById("listado") as HTMLUListElement;
    const statsP = document.getElementById("stats") as HTMLParagraphElement;
    const errorDiv = document.getElementById("errorForm") as HTMLDivElement;

    const inputTitulo = document.getElementById("titulo") as HTMLInputElement;
    const inputAutor = document.getElementById("autor") as HTMLInputElement;
    const inputPrecio = document.getElementById("precio") as HTMLInputElement;
    const inputDisponible = document.getElementById("disponible") as HTMLInputElement;

    function validarFormulario(): Libro | null {
        errorDiv.innerText = "";
        
        const titulo = inputTitulo.value.trim();
        const autor = inputAutor.value.trim();
        const precio = parseFloat(inputPrecio.value);
        const disponible = inputDisponible.checked;

        if (!titulo || !autor || isNaN(precio) || precio <= 0) {
            errorDiv.innerText = "Todos los campos son obligatorios y el precio debe ser mayor a 0.";
            return null;
        }

        return {
            isbn: "AUTO-" + Date.now(),
            titulo,
            autor,
            precio,
            disponible
        };
    }

    function eliminarLibro(isbn: string): void {
        catalogo = catalogo.filter(l => l.isbn !== isbn);
        renderizar();
    }

    function renderizar(): void {
        listaUl.innerHTML = "";
        
        catalogo.forEach(l => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${l.titulo}</strong> - ${l.autor} ($${l.precio}) 
                ${l.disponible ? '✅' : '❌'}
            `;

            const btnEliminar = document.createElement("button");
            btnEliminar.innerText = "Eliminar";
            btnEliminar.style.marginLeft = "10px";
            btnEliminar.onclick = () => eliminarLibro(l.isbn);

            li.appendChild(btnEliminar);
            listaUl.appendChild(li);
        });

        const total = catalogo.length;
        const promedio = total > 0 ? catalogo.reduce((acc, l) => acc + l.precio, 0) / total : 0;
        statsP.innerText = `Total: ${total} libros | Promedio: $${promedio.toFixed(2)}`;
    }

    document.getElementById("btnAgregar")?.addEventListener("click", () => {
        const nuevoLibro = validarFormulario();
        
        if (nuevoLibro) {
            catalogo.push(nuevoLibro);
            inputTitulo.value = "";
            inputAutor.value = "";
            inputPrecio.value = "";
            renderizar();
        }
    });

    renderizar();