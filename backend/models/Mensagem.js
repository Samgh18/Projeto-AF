const mongoose = require('mongoose');

const mensagemSchema = new mongoose.Schema({
  remetenteId: String,       // ID do usuário que enviou
  destinatarioId: String,    // ID do usuário que recebeu
  texto: String,             // conteúdo da mensagem
  data: { type: Date, default: Date.now }  // data e hora da mensagem
});

module.exports = mongoose.model('Mensagem', mensagemSchema);
