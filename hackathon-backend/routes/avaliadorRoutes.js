const express = require('express');
const router = express.Router();
const avaliadorController = require('../controllers/avaliadorController');

// Rota para obter todos os avaliadores
router.get('/', avaliadorController.getAvaliadores);

// Rota para obter um avaliador pelo ID
router.get('/:id', avaliadorController.getAvaliadorById);

// Rota para criar um novo avaliador
router.post('/', avaliadorController.createAvaliador);

// Rota para atualizar um avaliador
router.put('/:id', avaliadorController.updateAvaliador);

// Rota para excluir um avaliador
router.delete('/:id', avaliadorController.deleteAvaliador);

module.exports = router;