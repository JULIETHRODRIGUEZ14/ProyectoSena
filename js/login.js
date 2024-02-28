// Importa las funciones necesarias del SDK de Firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Obtén una referencia al formulario de inicio de sesión
const loginForm = document.getElementById("loginForm");

// Agrega un listener al evento de submit del formulario
loginForm.addEventListener("submit", function(event){
    event.preventDefault(); // Evita que se envíe el formulario

    // Obtén el valor de los campos de entrada
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Inicializa Firebase (esta parte puede omitirse si ya inicializaste Firebase en tu HTML)
    const auth = getAuth();

    // Autentica al usuario usando el correo electrónico y contraseña proporcionados
    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Usuario autenticado con éxito, redireccionar a la página adecuada
            const user = userCredential.user;
            const userType = determineUserType(username); // Función para determinar el tipo de usuario
            window.location.href = `${userType}.html`; // Redirige según el tipo de usuario
        })
        .catch((error) => {
            // Error de autenticación, mostrar mensaje de error
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById("errorMessage").innerText = errorMessage;
        });
});

// Función para determinar el tipo de usuario (puedes personalizarla según tus necesidades)
function determineUserType(username) {
   
    return "estudiante";
}
