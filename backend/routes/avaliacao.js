const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController'); // Atenção à caixa e nome exato

router.post('/criar', avaliacaoController.cadastrar);
router.get('/terapeuta/:id_terapeuta', avaliacaoController.listarPorTerapeuta);
router.get('/media/:id_terapeuta', avaliacaoController.calcularMedia);

module.exports = router;
