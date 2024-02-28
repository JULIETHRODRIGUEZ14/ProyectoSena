document.getElementById("userForm").addEventListener("submit", function(event){
    event.preventDefault(); // Evita que se envíe el formulario

    // Obtiene los valores del nuevo nombre de usuario y contraseña desde los campos de entrada
    var newUsername = document.getElementById("newUsername").value;
    var newPassword = document.getElementById("newPassword").value;

    // Verifica si los campos están vacíos
    if (!newUsername.trim() || !newPassword.trim()) {
        alert("Por favor, introduce un nombre de usuario y una contraseña válidos.");
        return;
    }

    // Aquí puedes continuar con la lógica para agregar el nuevo usuario a la base de datos
    console.log("Nuevo Usuario:", newUsername, newPassword);
});
