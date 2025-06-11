const express = require('express');
const router = express.Router();
const Sessao = require('../models/Sessao');
const Usuario = require('../models/Usuario');

// Cadastrar nova sessão
router.post('/cadastrar', async (req, res) => {
  const { id_terapeuta, id_usuario, data, diagnostico, terapia } = req.body;

  if (!id_terapeuta || !id_usuario || !data) {
    return res.status(400).send('Campos obrigatórios faltando');
  }

  try {
    const novaSessao = new Sessao({
      id_terapeuta,
      id_usuario,
      data,
      diagnostico,
      terapia
    });

    await novaSessao.save();
    res.send('Sessão cadastrada com sucesso');
  } catch (e) {
    res.status(500).send('Erro ao cadastrar sessão: ' + e.message);
  }
});

// Listar todas as sessões
router.get('/todas', async (req, res) => {
  try {
    const sessoes = await Sessao.find();
    res.json(sessoes);
  } catch (e) {
    res.status(500).send('Erro ao listar sessões: ' + e.message);
  }
});

// Listar sessões por paciente (com nome do terapeuta)
router.get('/paciente/:id_usuario', async (req, res) => {
  try {
    const sessoes = await Sessao.find({ id_usuario: req.params.id_usuario });

    const sessoesComNomes = await Promise.all(
      sessoes.map(async (sessao) => {
        const terapeuta = await Usuario.findById(sessao.id_terapeuta);
        return {
          ...sessao.toObject(),
          nomeTerapeuta: terapeuta ? terapeuta.nome : 'Terapeuta não encontrado'
        };
      })
    );

    res.json(sessoesComNomes);
  } catch (e) {
    res.status(500).send('Erro ao listar sessões do paciente: ' + e.message);
  }
});

// Listar sessões por terapeuta (sem alterações por enquanto)
router.get('/terapeuta/:id_terapeuta', async (req, res) => {
  try {
    const sessoes = await Sessao.find({ id_terapeuta: req.params.id_terapeuta });
    res.json(sessoes);
  } catch (e) {
    res.status(500).send('Erro ao listar sessões do terapeuta: ' + e.message);
  }
});

module.exports = router;
