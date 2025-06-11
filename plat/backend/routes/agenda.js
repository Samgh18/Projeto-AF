const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

router.post('/salvar', agendaController.criarOuAtualizar);
router.get('/:id_terapeuta', agendaController.listarPorTerapeuta);

module.exports = router;
