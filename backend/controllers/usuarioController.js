const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

exports.cadastrar = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  if (!nome || !email || !senha || !tipo) return res.status(400).send('Campos obrigatórios');

  try {
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).send('Email já cadastrado.');

    const hashSenha = await bcrypt.hash(senha, 10);
    const novo = new Usuario({ nome, email, senha: hashSenha, tipo });
    await novo.save();

    res.json({ mensagem: 'Usuário cadastrado com sucesso.' });
  } catch (e) {
    res.status(500).send('Erro ao cadastrar: ' + e.message);
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).send('Email e senha são obrigatórios');

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(401).send('Credenciais inválidas');

    const senhaOk = await bcrypt.compare(senha, usuario.senha);
    if (!senhaOk) return res.status(401).send('Credenciais inválidas');

    res.json({
      mensagem: 'Login bem-sucedido.',
      id: usuario._id,
      nome: usuario.nome,
      tipo: usuario.tipo
    });
  } catch (e) {
    res.status(500).send('Erro no login: ' + e.message);
  }
};

exports.listar = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.tipo) filtro.tipo = req.query.tipo;

    const usuarios = await Usuario.find(filtro, '_id nome tipo');
    res.json(usuarios);
  } catch (err) {
    res.status(500).send('Erro ao buscar usuários: ' + err.message);
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).send('Usuário não encontrado');

    res.json({ nome: usuario.nome, tipo: usuario.tipo });
  } catch (e) {
    res.status(500).send('Erro: ' + e.message);
  }
};
