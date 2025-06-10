const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
nome: String,
email: { type: String, unique: true },
senha: String,
tipo: { type: String, enum: ['usuário', 'terapeuta'], required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
