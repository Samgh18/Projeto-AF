const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
  id_terapeuta: { type: String, required: true },
  data: { type: String, required: true }, // Ex: '2025-06-20'
  horarios_disponiveis: [{ type: String }] // Array de horários tipo '10:00', '14:30'
});

module.exports = mongoose.model('Agenda', agendaSchema);
