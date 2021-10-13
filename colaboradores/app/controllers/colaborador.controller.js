const Colaborador = require('../models/colaborador.model.js');

exports.create = (req, res) => { //crear registro de colaborador

    if (!req.body.nombre_colaborador) {
        return res.status(400).send({
            message: "El contenido del colaborador no puede ser vacios"
        });
    }

    const colaborador = new Colaborador({ //crear colaborador
        nombre_colaborador: req.body.nombre_colaborador,
        fecha_nacimiento: req.body.fecha_nacimiento,
        rfc: req.body.rfc,
        fecha_inicio: req.body.fecha_inicio,
        estado_colaborador: req.body.estado_colaborador,
        area: req.body.area
    });

    colaborador.save() // guardar colaborador
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Un error ha ocurrido"
            });
        });
};

exports.findAll = (req, res) => { //recupera a todos los colaboradores
    Colaborador.find().
        then(colaboradores => {
            res.send(colaboradores);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Un error ha ocurrido"
            })
        });
};

exports.findOne = (req, res) => { //recupera a un colaborador
    Colaborador.findById(req.params._id)
        .then(colaborador => {
            if (!colaborador) {
                return res.status(404).send({
                    message: "No encontro el colaborador con el Id de " + req.params._id
                });
            }
            res.send(colaborador);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "No encontro el colaborador con el Id de " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error en recuperar al colaborador con id de " + req.params._id
            });
        });
};

exports.update = (req, res) => { //actualiza a un colaborador
    if (!req.body.nombre_colaborador) {
        return res.status(400).send({
            message: "El contenido del colaborador no puede ser vacio"
        });
    }

    Colaborador.findByIdAndUpdate(req.params._id, {
        nombre_colaborador: req.body.nombre_colaborador,
        fecha_nacimiento: req.body.fecha_nacimiento,
        rfc: req.body.rfc,
        fecha_inicio: req.body.fecha_inicio,
        estado_colaborador: req.body.estado_colaborador,
        area: req.body.area
    }, { new: true })
        .then(colaborador => {
            if (!colaborador) {
                return res.status(404).send({
                    message: "Colaborador no encontrado con dicho Id de " + req.params._id
                });
            }
            res.send(colaborador);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Colaborador no encontrado con dicho Id de " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Error en actualizar el colaborador con dicho Id de " + req.params._id
            })
        });
};

exports.delete = (req, res) => { //elimina a un colaborador
    Colaborador.findByIdAndRemove(req.params._id)
        .then(colaborador => {
            if (!colaborador) {
                return res.status(404).send({
                    message: "Colaborador no encontrado con dicho Id de " + req.params._id
                });
            }
            res.send({ message: "Colaborador eliminado!" })
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'Notfound') {
                return res.status(404).send({
                    message: "Colaborador no encontrado con dicho Id de " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Colaborador no encontrado con dicho Id de " + req.params._id
            });
        });
};