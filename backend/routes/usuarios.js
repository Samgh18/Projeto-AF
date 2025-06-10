const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/cadastrar', usuarioController.cadastrar);
router.post('/login', usuarioController.login);
router.get('/', usuarioController.listar);
router.get('/:id', usuarioController.buscarPorId);

module.exports = router;


// Cadastro de usuário
router.post('/cadastrar', async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  if (!nome || !email || !senha || !tipo) return res.status(400).send('Campos obrigatórios');

  try {
    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).send('Email já cadastrado.');

    const novo = new Usuario({ nome, email, senha, tipo });
    await novo.save();
    res.send('Usuário cadastrado com sucesso.');
  } catch (e) {
    res.status(500).send('Erro ao cadastrar: ' + e.message);
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).send('Email e senha são obrigatórios');

  try {
    const usuario = await Usuario.findOne({ email, senha });
    if (!usuario) return res.status(401).send('Credenciais inválidas');

    res.json({
      mensagem: 'Login bem-sucedido.',
      id: usuario._id,
      nome: usuario.nome,
      tipo: usuario.tipo
    });
  } catch (e) {
    res.status(500).send('Erro no login: ' + e.message);
  }
});

// Listar usuários, opcional filtro por tipo: /usuarios?tipo=terapeuta ou /usuarios?tipo=usuário
router.get('/', async (req, res) => {
  try {
    const filtro = {};
    if (req.query.tipo) {
      filtro.tipo = req.query.tipo;
    }
    const usuarios = await Usuario.find(filtro, '_id nome tipo');
    res.json(usuarios);
  } catch (err) {
    res.status(500).send('Erro ao buscar usuários: ' + err.message);
  }
});

// Buscar usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).send('Usuário não encontrado');
    res.json({ nome: usuario.nome, tipo: usuario.tipo });
  } catch (e) {
    res.status(500).send('Erro: ' + e.message);
  }
});

module.exports = router;

