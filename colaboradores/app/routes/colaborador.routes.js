module.exports = (app) => {
    const colaboradores = require('../controllers/colaborador.controller.js');

    app.get('/colaboradores', colaboradores.findAll); //recupera a todos los colaboradores
    app.get('/colaborador/:_id', colaboradores.findOne); //recupera a un colaborador

    app.post('/colaborador', colaboradores.create); //crear registro de colaborador

    app.put('/colaborador/:_id', colaboradores.update); //actualiza a un colaborador

    app.delete('/colaborador/:_id', colaboradores.delete); //elimina a un colaborador
}