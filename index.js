require('dotenv').config();
require('better-logging')(console);

const express = require('express');
const app = express();
const server = require('http').Server(app);
const fs = require('fs');

const path = require('path');

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.set('view engine', 'ejs');


// Agregamos rutas al servidor
app.get('/', (req, res) => {
    res.render('taskManager');
});

// Encendemos el servidor
server.listen(process.env.PORT, () => {
    console.info(`Servidor corriendo en el puerto ${process.env.PORT}`);
});