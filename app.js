require('dotenv').config();
require('better-logging')(console);

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const server = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.set('view engine', 'ejs');

// Agregamos rutas al servidor
app.get('/', (req, res) => {
    res.render('taskManager');
});

app.get('/get-tarjetas', (req, res) =>{
    const file = fs.readFileSync('./tarjetas.json', 'UTF-8');
    
    res.setHeader('Content-type', 'text/json');
    res.send(file);
});

app.post('/new', (req, res) =>{
    res.setHeader('Content-type', 'text/plain');
    const titulo = req.body.titulo;


    // abrir archivo
    let file = fs.readFileSync('./tarjetas.json', 'UTF-8');

    // convertirlo a un arreglo
    const json = JSON.parse(file);

    // insertar un nuevo elemento
    json.tarjetas.push({"titulo": titulo});

    // guardar json en el archivo
    file = fs.writeFileSync('./tarjetas.json', JSON.stringify(json));

    res.send('Datos guardados con éxito');
    
});

// Encendemos el servidor
server.listen(process.env.PORT, () => {
    console.info(`Servidor corriendo en el puerto ${process.env.PORT}`);
});