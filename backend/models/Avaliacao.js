const mongoose = require('mongoose');

const avaliacaoSchema = new mongoose.Schema({
  id_terapeuta: { type: String, required: true },
  id_usuario: { type: String, required: true },
  nota: { type: Number, required: true, min: 1, max: 5 },
  comentario: { type: String, required: true },
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Avaliacao || mongoose.model('Avaliacao', avaliacaoSchema);
