const mongoose = require('mongoose');

const conteudoSchema = new mongoose.Schema({
  titulo: String,
  arquivo: String,         // nome do arquivo armazenado no servidor
  terapeutaId: String,     // id do terapeuta que enviou
  dataEnvio: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conteudo', conteudoSchema);
