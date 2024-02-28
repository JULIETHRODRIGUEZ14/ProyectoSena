document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('login_success')) || false;
    if (!user) {
        window.location.href = 'login.html';
    }

    const salir = document.querySelector('#salir');
    if (salir) { // Verifica si se encontró el elemento #salir
        salir.addEventListener('click', () => {
            alert('Hasta pronto');
            localStorage.removeItem('login_success');
            window.location.href = 'login.html';
        });
    }
});
