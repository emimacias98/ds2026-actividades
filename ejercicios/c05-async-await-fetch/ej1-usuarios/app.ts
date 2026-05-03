interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }

        const usuarios: Usuario[] = await response.json();
        return usuarios;

    } catch (error) {
        console.error("Hubo un problema:", error);
        return [];
    }
}

obtenerUsuarios().then((data) => {
    console.log("--- Lista de Usuarios ---");
    data.forEach(user => {
        console.log(`Nombre: ${user.name} | Email: ${user.email}`);
    });
});

export {}; 