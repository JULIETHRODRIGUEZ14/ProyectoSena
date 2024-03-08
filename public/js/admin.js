// Manejar eventos para asignar roles
const botonAsignarDocente = document.querySelector('.botonAsignarDocente');
const botonAsignarEstudiante = document.querySelector('.botonAsignarEstudiante');
const listaUsuarios = document.querySelector('.listaUsuarios');

botonAsignarDocente.addEventListener('click', () => {
    const nombreUsuario = prompt('Ingrese el nombre de usuario a asignar como docente');
    if (nombreUsuario) {
        const nuevoUsuario = document.createElement('div');
        nuevoUsuario.classList.add('usuario');
        nuevoUsuario.innerHTML = `
            <h3>${nombreUsuario}</h3>
            <p>Rol: Docente</p>
            <button class="botonEditar">Editar</button>
            <button class="botonEliminar">Eliminar</button>
        `;
        listaUsuarios.appendChild(nuevoUsuario);
        alert(`Usuario "${nombreUsuario}" asignado como docente`);
    }
});

botonAsignarEstudiante.addEventListener('click', () => {
    const nombreUsuario = prompt('Ingrese el nombre de usuario a asignar como estudiante');
    if (nombreUsuario) {
        const nuevoUsuario = document.createElement('div');
        nuevoUsuario.classList.add('usuario');
        nuevoUsuario.innerHTML = `
            <h3>${nombreUsuario}</h3>
            <p>Rol: Estudiante</p>
            <button class="botonEditar">Editar</button>
            <button class="botonEliminar">Eliminar</button>
        `;
        listaUsuarios.appendChild(nuevoUsuario);
        alert(`Usuario "${nombreUsuario}" asignado como estudiante`);
    }
});
