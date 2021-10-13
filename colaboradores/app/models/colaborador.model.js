const mongoose = require('mongoose');

const colaboradorSchema = mongoose.Schema({
    nombre_colaborador: String,
    fecha_nacimiento: String, //"<YYYY-mm-dd>"
    rfc: String,
    fecha_inicio: String, //"<YYYY-mm-dd>"
    estado_colaborador: String,
    area: String
},{
    timestamps: true
});

module.exports = mongoose.model('Colaborador', colaboradorSchema);