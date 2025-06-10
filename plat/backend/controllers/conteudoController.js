const Conteudo = require('../models/Conteudo');

exports.upload = async (req, res) => {
  const { titulo, terapeutaId } = req.body;
  if (!req.file || !titulo || !terapeutaId) return res.status(400).send('Dados incompletos');

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
};

exports.listar = async (req, res) => {
  try {
    const conteudos = await Conteudo.find();
    res.json(conteudos);
  } catch (e) {
    res.status(500).send('Erro ao listar conteúdos: ' + e.message);
  }
};
