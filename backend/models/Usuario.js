const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  senha: { type: String, required: true },
  tipo: { type: String, enum: ['paciente', 'terapeuta'], required: true }
});

// Verifica se o model já foi registrado para evitar erro OverwriteModelError
module.exports = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
