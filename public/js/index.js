// Función para autenticar al usuario y obtener su rol
function autenticarUsuario(usuario, contraseña) {
    // Aquí puedes realizar la autenticación utilizando tus propios criterios
    // Por ejemplo, consultando una base de datos o utilizando datos en duro para fines de demostración
    // Aquí solo se utiliza una autenticación simulada
    
    // Usuarios y contraseñas
    const usuarios = {
        'admin': { rol: 'admin', contraseña: 'admin123' },
        'estudiante': { rol: 'estudiante', contraseña: 'estudiante123' },
        'docente': { rol: 'docente', contraseña: 'docente123' }
    };

    // Verificar si el usuario existe y la contraseña es correcta
    if (usuarios.hasOwnProperty(usuario) && usuarios[usuario].contraseña === contraseña) {
        // Devolver el rol del usuario
        return usuarios[usuario].rol;
    } else {
        // Devolver null si la autenticación falla
        return null;
    }
}

// Función para redirigir al usuario después del inicio de sesión según su rol
function redirigirSegunRol(rol) {
    if (rol === 'admin') {
        window.location.href = '/home.html'; 
    } else if (rol === 'estudiante') {
        window.location.href = '/estudiante.html';
    } else if (rol === 'docente') {
        window.location.href = '/docente.html'; 
    } else {
        // Manejar otros roles o errores
        console.log('Error: Rol no válido');
    }
}

// Manejar el evento de envío del formulario de inicio de sesión
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada (recargando la página)

        // Obtener los valores del nombre de usuario y contraseña del formulario
        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;

        // Autenticar al usuario y obtener su rol
        const rolUsuario = autenticarUsuario(usuario, password);

        // Redirigir según el rol del usuario después de iniciar sesión
        if (rolUsuario) {
            redirigirSegunRol(rolUsuario);
        } else {
            // La autenticación ha fallado
            console.log('Error: Nombre de usuario o contraseña incorrectos.');
            alert('Nombre de usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.');
        }
    });
});


/*cerrar sesion*/

function cerrarSesion() {
    // Redirigir al usuario a index.html
    window.location.href = './index.html';
    // Mostrar un mensaje de despedida
    alert('¡Gracias por visitarnos, Hasta la proxima!');
}



//calificaciones
document.addEventListener('DOMContentLoaded', function() {
    // Agregar un evento de escucha a todos los elementos de entrada con la clase 'calificacion'
    const calificacionesInputs = document.querySelectorAll('.calificacion');
    calificacionesInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            // Obtener la fila padre del input actual
            const fila = this.parentNode.parentNode;
            
            // Obtener todas las calificaciones en la fila actual
            const calificaciones = fila.querySelectorAll('.calificacion');
            
            let totalCalificaciones = 0;
            let cantidadCalificaciones = 0;
            
            // Calcular la suma de todas las calificaciones ingresadas y contar cuántas hay
            calificaciones.forEach(function(calificacionInput) {
                const calificacion = parseFloat(calificacionInput.value);
                if (!isNaN(calificacion)) {
                    totalCalificaciones += calificacion;
                    cantidadCalificaciones++;
                }
            });
            
            // Calcular el promedio
            const promedio = totalCalificaciones / cantidadCalificaciones;
            
            // Actualizar el valor del promedio en la celda correspondiente
            const promedioCell = fila.querySelector('.promedio');
            promedioCell.textContent = promedio.toFixed(1); // Redondear el promedio a 1 decimal
        });
    });
});



///editar,agregar,eliminar estudiantes
document.addEventListener('DOMContentLoaded', function() {
    // Función para agregar un estudiante
    function agregarEstudiante(ficha) {
        const nombreEstudiante = prompt('Ingrese el nombre del estudiante para agregar en ' + ficha.querySelector('h2').innerText);
        const gradoEstudiante = prompt('Ingrese el grado del estudiante:');
        const promedioEstudiante = prompt('Ingrese el promedio del estudiante:');
        const calificacionEstudiante = prompt('Ingrese la calificación del estudiante:');

        if (nombreEstudiante && gradoEstudiante && promedioEstudiante && calificacionEstudiante) {
            const nuevaFila = document.createElement('tr');
            
            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = nombreEstudiante;
            nuevaFila.appendChild(celdaNombre);
            
            const celdaGrado = document.createElement('td');
            celdaGrado.textContent = gradoEstudiante;
            nuevaFila.appendChild(celdaGrado);
            
            const celdaPromedio = document.createElement('td');
            celdaPromedio.textContent = promedioEstudiante;
            nuevaFila.appendChild(celdaPromedio);
            
            const celdaCalificacion = document.createElement('td');
            const inputCalificacion = document.createElement('input');
            inputCalificacion.type = 'number';
            inputCalificacion.value = calificacionEstudiante;
            inputCalificacion.classList.add('calificacion');
            inputCalificacion.addEventListener('change', function() {
                calcularPromedio(ficha);
            });
            celdaCalificacion.appendChild(inputCalificacion);
            nuevaFila.appendChild(celdaCalificacion);

            ficha.querySelector('.estudiantes tbody').appendChild(nuevaFila);

            // Calcular promedio
            calcularPromedio(ficha);
        } else {
            alert('Debe ingresar información válida para el estudiante.');
        }
    }

    // Función para editar un estudiante
    function editarEstudiante(ficha) {
        const nombreEstudianteActual = prompt('Ingrese el nombre del estudiante para editar en ' + ficha.querySelector('h2').innerText);
        if (nombreEstudianteActual) {
            const nuevaCalificacion = prompt('Ingrese la nueva calificación para el estudiante ' + nombreEstudianteActual);
            if (nuevaCalificacion) {
                const filas = ficha.querySelectorAll('.estudiantes tbody tr');
                filas.forEach(function(fila) {
                    if (fila.textContent.trim() === nombreEstudianteActual.trim()) {
                        const inputCalificacion = fila.querySelector('.calificacion');
                        inputCalificacion.value = nuevaCalificacion;
                        // Disparar el evento change para recalcular el promedio
                        inputCalificacion.dispatchEvent(new Event('change'));
                        alert('Calificación actualizada para el estudiante ' + nombreEstudianteActual);
                    }
                });
            } else {
                alert('Debe ingresar una nueva calificación válida.');
            }
        } else {
            alert('Debe ingresar un nombre de estudiante válido.');
        }
    }

    // Función para calcular el promedio de un grado
    function calcularPromedio(ficha) {
        const filas = ficha.querySelectorAll('.estudiantes tbody tr');
        const cantidadEstudiantes = filas.length;
        let sumaCalificaciones = 0;

        filas.forEach(function(fila) {
            // Obtener la calificación del estudiante desde el input correspondiente
            const calificacion = parseFloat(fila.querySelector('.calificacion').value);
            sumaCalificaciones += calificacion; // Sumar la calificación del estudiante
        });

        const promedio = cantidadEstudiantes > 0 ? sumaCalificaciones / cantidadEstudiantes : 0;
        const promedioElement = ficha.querySelector('.promedio');
        promedioElement.textContent = "Promedio: " + promedio.toFixed(2);

        // Subir o bajar el promedio
        if (promedio > 10) {
            promedioElement.style.color = 'green';
        } else if (promedio < 10) {
            promedioElement.style.color = 'red';
        } else {
            promedioElement.style.color = 'black';
        }
    }

    // Obtener todos los botones de agregar y editar
    const botonesAgregar = document.querySelectorAll('.agrega');
    const botonesEditar = document.querySelectorAll('.edita');

    // Agregar eventos de clic para los botones de agregar
    botonesAgregar.forEach(function(boton) {
        boton.addEventListener('click', function() {
            const ficha = this.closest('.ficha');
            agregarEstudiante(ficha);
        });
    });

    // Agregar eventos de clic para los botones de editar
    botonesEditar.forEach(function(boton) {
        boton.addEventListener('click', function() {
            const ficha = this.closest('.ficha');
            editarEstudiante(ficha);
        });
    });
});
// Función para eliminar un estudiante
function eliminarEstudiante(ficha) {
    const nombreEstudianteEliminar = prompt('Ingrese el nombre del estudiante que desea eliminar de ' + ficha.querySelector('h2').innerText);
    if (nombreEstudianteEliminar) {
        const filas = ficha.querySelectorAll('.estudiantes tbody tr');
        filas.forEach(function(fila) {
            if (fila.textContent.trim() === nombreEstudianteEliminar.trim()) {
                fila.remove();
                // Calcular el promedio nuevamente después de eliminar el estudiante
                calcularPromedio(ficha);
                alert('Estudiante ' + nombreEstudianteEliminar + ' eliminado exitosamente.');
            }
        });
    } else {
        alert('Debe ingresar un nombre de estudiante válido para eliminar.');
    }
}
