class AdministradorInterfaz {
    constructor() {
        // Constructor de la clase AdministradorInterfaz
        this.baseDeDatosUsuarios = {}; // Objeto simulado para almacenar usuarios
    }

    // Lógica para crear un nuevo usuario con el nombre especificado,
    // asignarle un rol y definir sus permisos
    crearUsuario(nombre, rol, permisos) {
        const nuevoUsuario = {
            nombre: nombre,
            rol: rol,
            permisos: permisos
        };
        const idUsuario = this.generarIdUsuario(); // Generar un ID de usuario único
        this.baseDeDatosUsuarios[idUsuario] = nuevoUsuario; // Almacenar el usuario en la base de datos
        console.log("Usuario creado:", nuevoUsuario);
        return idUsuario; // Devolver el ID del nuevo usuario
    }

    // Lógica para editar los datos de un usuario identificado por su ID,
    // como su nombre, rol y permisos
    editarUsuario(idUsuario, nombre, rol, permisos) {
        if (this.baseDeDatosUsuarios[idUsuario]) {
            const usuario = this.baseDeDatosUsuarios[idUsuario];
            usuario.nombre = nombre;
            usuario.rol = rol;
            usuario.permisos = permisos;
            console.log(`Usuario ${idUsuario} editado:`, usuario);
        } else {
            console.log("El usuario no existe");
        }
    }

    // Lógica para eliminar un usuario identificado por su ID
    eliminarUsuario(idUsuario) {
        if (this.baseDeDatosUsuarios[idUsuario]) {
            delete this.baseDeDatosUsuarios[idUsuario]; // Eliminar el usuario de la base de datos
            console.log(`Usuario ${idUsuario} eliminado`);
        } else {
            console.log("El usuario no existe");
        }
    }

    // Generar un ID de usuario único (simulado)
    generarIdUsuario() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Ejemplo de uso de la interfaz de administrador
const interfazAdmin = new AdministradorInterfaz();

// Ejemplo de crear un nuevo usuario
const idNuevoUsuario = interfazAdmin.crearUsuario("Usuario1", "Docente", ["permiso1", "permiso2"]);

// Ejemplo de editar un usuario existente
interfazAdmin.editarUsuario(idNuevoUsuario, "NuevoNombre", "Administrador", ["permiso3", "permiso4"]);

// Ejemplo de eliminar un usuario existente
interfazAdmin.eliminarUsuario(idNuevoUsuario);
