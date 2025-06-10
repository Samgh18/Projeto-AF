const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./utils/db');

const usuariosRoutes = require('./routes/usuarios');
const sessoesRoutes = require('./routes/sessoes');
const conteudosRoutes = require('./routes/conteudos');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/sessoes', sessoesRoutes);
app.use('/conteudos', conteudosRoutes);
app.use('/chat', chatRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Plataforma de Suporte Emocional API');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
