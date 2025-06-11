const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para cadastro
router.post('/cadastrar', usuarioController.cadastrar);

// Rota para login
router.post('/login', usuarioController.login);

// Rota para listar usuários (filtro opcional por tipo)
router.get('/', usuarioController.listar);

// Rota para buscar usuário por ID
router.get('/:id', usuarioController.buscarPorId);

module.exports = router;
