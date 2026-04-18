const input = document.getElementById(`productoInput`);
const boton = document.getElementById(`btnAgregar`);
const lista = document.getElementById(`ListaProductos`);
const contadorTexto = document.getElementById(`contador`);

let cantidad = 0;

function actualizarContador(){
    contadorTexto.innerText = `${cantidad} productos en la lista`;
}

boton.addEventListener(`click`, () => {
    const nombre = input.value.trim();

    if(nombre === "") {
        alert("Por favor, ingresa un producto");
        return
    }

    const nuevoItem = document.createElement(`li`);
    nuevoItem.innerText = nombre + "";

    const btnEliminar = document.createElement(`button`);
    btnEliminar.innerText = "Eliminar";

    btnEliminar.addEventListener(`click`, () => {
        nuevoItem.remove();
        cantidad--;
        actualizarContador();
    });

    nuevoItem.appendChild(btnEliminar);
    lista.appendChild(nuevoItem);

    cantidad++;
    actualizarContador();
    input.value = "";
    input.focus();
})

