const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://samghernandes:0pitanga@projeto.qaxf9kw.mongodb.net/plataforma-suporte?retryWrites=true&w=majority&appName=PROJETO');
    console.log('✅ Conectado ao MongoDB');
  } catch (err) {
    console.error('❌ Erro de conexão MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
