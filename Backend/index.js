const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Permite recibir datos en formato JSON

// 1. Configuración de la conexión a la Base de Datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Tu usuario de MySQL (usualmente es 'root' en local)
    password: '900903822',      // Tu contraseña de MySQL (deja vacío si no tienes)
    database: 'testigo' // El nombre exacto que pusimos en el SQL
});

// 2. Probar la conexión
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la BD:', err);
        return;
    }
    console.log('¡Conectado exitosamente a la base de datos MySQL!');
});

// 3. Una ruta de prueba
app.get('/', (req, res) => {
    res.send('El servidor del Backend está funcionando 🚀');
});

// 4. Ruta para obtener usuarios (Ejemplo)
app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


// ... código anterior de conexión a DB ...

// RUTA PARA REGISTRAR USUARIOS
app.post('/registro', (req, res) => {
    // 1. Recibimos los datos del frontend
    // Asegúrate de que estos nombres coincidan con lo que envíes desde el HTML/JS
    const sql = "INSERT INTO users (`first_name`, `last_name`, `dni`, `email`, `phone`, `password`) VALUES (?)";
    
    // Creamos un arreglo con los valores en el orden exacto de la consulta SQL
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.dni,
        req.body.email,
        req.body.phone,
        req.body.password // NOTA: En un futuro real, aquí encriptaremos la contraseña
    ];

    // 2. Ejecutamos la consulta en la Base de Datos
    db.query(sql, [values], (err, data) => {
        if(err) {
            console.error(err);
            // Si el error es por email o DNI duplicado (código 1062), avisamos
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: "El correo o DNI ya existe" });
            }
            return res.status(500).json({ message: "Error en el servidor" });
        }
        return res.status(200).json({ message: "Usuario registrado con éxito" });
    });
});

// ... app.listen ...



// 5. Iniciar el servidor
app.listen(8081, () => {
    console.log('Servidor escuchando en el puerto 8081');
});