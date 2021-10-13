const express = require('express');

const bodyParser = require('body-parser');

const app = express(); //crear express app

app.use(bodyParser.urlencoded({extended: true})) //hace parse al contenido de content type

app.use(bodyParser.json()); //hace parse al contenido de content type

const dbConfig = require('./config/database.config.js');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
}).then(() => {
    console.log("Se conecto a la base de datos exitosamente");
}).catch(err => {
    console.log("No se pudo conectar a la base de datos", err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"mensaje": "bienvenidos a la practica de los colaboradores"});
});

require('./app/routes/colaborador.routes.js')(app);

app.listen(3000, () => {
    console.log("Servidor esta escuchando");
});

