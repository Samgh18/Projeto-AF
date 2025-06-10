const Mensagem = require('../models/Mensagem');

exports.buscarConversa = async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const mensagens = await Mensagem.find({
      $or: [
        { remetenteId: user1, destinatarioId: user2 },
        { remetenteId: user2, destinatarioId: user1 }
      ]
    }).sort({ data: 1 });

    res.json(mensagens);
  } catch (e) {
    res.status(500).send('Erro ao buscar mensagens: ' + e.message);
  }
};

exports.enviar = async (req, res) => {
  const { remetenteId, destinatarioId, texto } = req.body;
  if (!remetenteId || !destinatarioId || !texto) return res.status(400).send('Dados incompletos');

  try {
    const msg = new Mensagem({ remetenteId, destinatarioId, texto });
    await msg.save();
    res.json({ mensagem: 'Mensagem salva' });
  } catch (e) {
    res.status(500).send('Erro ao salvar mensagem: ' + e.message);
  }
};
