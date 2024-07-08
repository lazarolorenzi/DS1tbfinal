const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');
const authenticateAvaliador = require('../middlewares/authMiddleware'); // Middleware de autenticação

// Rota para obter todas as avaliações
router.get('/', avaliacaoController.getAvaliacoes);

// Rota para obter uma avaliação pelo ID
router.get('/:id', avaliacaoController.getAvaliacaoById);

// Rota para obter avaliações por avaliador_id ou equipe_id
router.get('/filtro', avaliacaoController.getAvaliacoesByFilter);

// Rota para criar uma nova avaliação (sem notas)
router.post('/', avaliacaoController.createAvaliacao);

// Rota para atualizar as notas de uma avaliação (requer autenticação)
router.put('/:id', authenticateAvaliador, avaliacaoController.updateAvaliacao);

// Rota para excluir uma avaliação
router.delete('/:id', avaliacaoController.deleteAvaliacao);

module.exports = router;