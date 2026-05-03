const listaUl = document.getElementById('lista-usuarios');
const pCargando = document.getElementById('cargando');
const pError = document.getElementById('error-msg');
async function obtenerUsuarios() {
    try {
        pError.style.display = 'none';
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        pError.style.display = 'block';
        pError.textContent = "No se pudieron cargar los usuarios. Reintentá más tarde.";
        return [];
    }
    finally {
        pCargando.style.display = 'none';
    }
}
async function mostrarEnPantalla() {
    const usuarios = await obtenerUsuarios();
    usuarios.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} - ${user.email}`;
        listaUl.appendChild(li);
    });
}
mostrarEnPantalla();
export {};
