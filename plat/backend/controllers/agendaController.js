const Agenda = require('../models/Agenda');

exports.criarOuAtualizar = async (req, res) => {
  const { id_terapeuta, data, horarios_disponiveis } = req.body;
  if (!id_terapeuta || !data || !horarios_disponiveis) {
    return res.status(400).send('Campos obrigatórios faltando');
  }

  try {
    let agenda = await Agenda.findOne({ id_terapeuta, data });

    if (agenda) {
      agenda.horarios_disponiveis = horarios_disponiveis;
    } else {
      agenda = new Agenda({ id_terapeuta, data, horarios_disponiveis });
    }

    await agenda.save();
    res.json({ mensagem: 'Agenda salva com sucesso' });
  } catch (e) {
    res.status(500).send('Erro ao salvar agenda: ' + e.message);
  }
};

exports.listarPorTerapeuta = async (req, res) => {
  try {
    const agendas = await Agenda.find({ id_terapeuta: req.params.id_terapeuta });
    res.json(agendas);
  } catch (e) {
    res.status(500).send('Erro ao listar agendas: ' + e.message);
  }
};
