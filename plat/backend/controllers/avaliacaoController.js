const Avaliacao = require('../models/Avaliacao');

exports.cadastrar = async (req, res) => {
  const { id_terapeuta, id_usuario, nota, comentario } = req.body;
  if (!id_terapeuta || !id_usuario || !nota || !comentario) {
    return res.status(400).send('Campos obrigatórios faltando');
  }

  try {
    const novaAvaliacao = new Avaliacao({ id_terapeuta, id_usuario, nota, comentario });
    await novaAvaliacao.save();
    res.json({ mensagem: 'Avaliação cadastrada com sucesso' });
  } catch (e) {
    res.status(500).send('Erro ao cadastrar avaliação: ' + e.message);
  }
};

exports.listarPorTerapeuta = async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.find({ id_terapeuta: req.params.id_terapeuta })
      .sort({ data: -1 })
      .limit(3);
    res.json(avaliacoes);
  } catch (e) {
    res.status(500).send('Erro ao listar avaliações: ' + e.message);
  }
};

exports.calcularMedia = async (req, res) => {
  try {
    const result = await Avaliacao.aggregate([
      { $match: { id_terapeuta: req.params.id_terapeuta } },
      { $group: { _id: null, media: { $avg: '$nota' } } }
    ]);

    const media = result.length > 0 ? result[0].media.toFixed(2) : 0;
    res.json({ media });
  } catch (e) {
    res.status(500).send('Erro ao calcular média: ' + e.message);
  }
};
