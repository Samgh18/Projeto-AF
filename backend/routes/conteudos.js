const express = require('express');
const router = express.Router();
const multer = require('multer');
const Conteudo = require('../models/Conteudo');
const path = require('path');

// Configuração do multer para salvar arquivos na pasta uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // pasta uploads no backend
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Upload de arquivo e salvar conteúdo no banco
router.post('/upload', upload.single('arquivo'), async (req, res) => {
  const { titulo, terapeutaId } = req.body;
  if (!req.file || !titulo || !terapeutaId) {
    return res.status(400).send('Dados incompletos');
  }

  try {
    const novoConteudo = new Conteudo({
      titulo,
      arquivo: req.file.filename,
      terapeutaId
    });
    await novoConteudo.save();
    res.json({ mensagem: 'Conteúdo enviado com sucesso' });
  } catch (e) {
    res.status(500).send('Erro ao salvar conteúdo: ' + e.message);
  }
});

// Listar todos conteúdos
router.get('/listar', async (req, res) => {
  try {
    const conteudos = await Conteudo.find();
    res.json(conteudos);
  } catch (e) {
    res.status(500).send('Erro ao listar conteúdos: ' + e.message);
  }
});

module.exports = router;
