const Sessao = require('../models/Sessao');

exports.cadastrar = async (req, res) => {
  const { id_terapeuta, id_usuario, data, diagnostico, terapia } = req.body;

  if (!id_terapeuta || !id_usuario || !data) {
    return res.status(400).send('Campos obrigatórios faltando');
  }

  try {
    const novaSessao = new Sessao({ id_terapeuta, id_usuario, data, diagnostico, terapia });
    await novaSessao.save();
    res.json({ mensagem: 'Sessão cadastrada com sucesso' });
  } catch (e) {
    res.status(500).send('Erro ao cadastrar sessão: ' + e.message);
  }
};

exports.listarTodas = async (req, res) => {
  try {
    const sessoes = await Sessao.find();
    res.json(sessoes);
  } catch (e) {
    res.status(500).send('Erro ao listar sessões: ' + e.message);
  }
};

exports.listarPorPaciente = async (req, res) => {
  try {
    const sessoes = await Sessao.find({ id_usuario: req.params.id_usuario });
    res.json(sessoes);
  } catch (e) {
    res.status(500).send('Erro ao listar sessões do paciente: ' + e.message);
  }
};

exports.listarPorTerapeuta = async (req, res) => {
  try {
    const sessoes = await Sessao.find({ id_terapeuta: req.params.id_terapeuta });
    res.json(sessoes);
  } catch (e) {
    res.status(500).send('Erro ao listar sessões do terapeuta: ' + e.message);
  }
};
