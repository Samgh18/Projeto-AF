const mongoose = require('mongoose');

const sessaoSchema = new mongoose.Schema({
id_usuario: String, // ID do paciente
id_terapeuta: String, // ID do terapeuta
data: String, // data da sessão (ex: 2025-06-10)
diagnostico: String, // texto livre (opcional)
terapia: String // tipo de abordagem utilizada
});

module.exports = mongoose.model('Sessao', sessaoSchema);