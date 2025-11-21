const formulario = document.getElementById('formRegistro');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // 1. Evita que la página se recargue

    // 2. Validar que las contraseñas coincidan
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confir-password').value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // 3. Preparar los datos para enviar al Backend
    // A la izquierda: Nombres de la Base de Datos
    // A la derecha: Valores de tus inputs HTML
    const datosUsuario = {
        first_name: document.getElementById('nombre').value,
        last_name:  document.getElementById('apellidos').value,
        dni:        document.getElementById('DNI').value,
        email:      document.getElementById('correo').value,
        phone:      document.getElementById('cel').value,
        password:   password
    };

    try {
        // 4. Enviar petición al servidor (Backend)
        const respuesta = await fetch('http://localhost:8081/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosUsuario)
        });

        const data = await respuesta.json();

        if (respuesta.ok) {
            alert("¡Usuario registrado con éxito!");
            window.location.href = 'login.html';
        } else {
            alert("Error: " + data.message); // Ej: "El correo ya existe"
        }

    } catch (error) {
        console.error(error);
        alert("No se pudo conectar con el servidor.");
    }
});