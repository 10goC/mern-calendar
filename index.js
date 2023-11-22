const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use( cors() );

// Directorio público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

// Manejar demás rutas
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// TODO: CRUD: Eventos

// Escuchar peticiones
app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Servidor express escuchando en el puerto ${ process.env.PORT }`);
});