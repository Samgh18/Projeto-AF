const express = require('express');
const router = express.Router();
const sessaoController = require('../controllers/sessaoController');

router.post('/cadastrar', sessaoController.cadastrar);
router.get('/todas', sessaoController.listarTodas);
router.get('/paciente/:id_usuario', sessaoController.listarPorPaciente);
router.get('/terapeuta/:id_terapeuta', sessaoController.listarPorTerapeuta);

module.exports = router;


// Cadastrar sessão
router.post('/cadastrar', async (req, res) => {
  const { id_terapeuta, id_usuario, data, diagnostico, terapia } = req.body;

  if (!id_terapeuta || !id_usuario || !data) {
    return res.status(400).send('Campos obrigatórios faltando');
  }

  try {
    const novaSessao = new Sessao({ id_terapeuta, id_usuario, data, diagnostico, terapia });
    await novaSessao.save();
    res.send('Sessão cadastrada com sucesso');
  } catch (e) {
    res.status(500).send('Erro ao cadastrar sessão: ' + e.message);
  }
});

// Listar todas sessões (para terapeuta)
router.get('/todas', async (req, res) => {
  try {
    const sessoes = await Sessao.find();
    res.json(sessoes);
  } catch (e) {
    res.status(500).send('Erro ao listar sessões: ' + e.message);
  }
});

// Listar sessões de um paciente (para paciente)
router.get('/paciente/:id_usuario', async (req, res) => {
  try {
    const sessoes = await Sessao.find({ id_usuario: req.params.id_usuario });
    res.json(sessoes);
  } catch (e) {
    res.status(500).send('Erro ao listar sessões do paciente: ' + e.message);
  }
});

// Listar sessões de um terapeuta (para terapeuta)
router.get('/terapeuta/:id_terapeuta', async (req, res) => {
  try {
    const sessoes = await Sessao.find({ id_terapeuta: req.params.id_terapeuta });
    res.json(sessoes);
  } catch (e) {
    res.status(500).send('Erro ao listar sessões do terapeuta: ' + e.message);
  }
});

module.exports = router;
