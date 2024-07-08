const express = require('express');
const router = express.Router();
const equipeController = require('../controllers/equipeController');

// Rota para obter todas as equipes
router.get('/', equipeController.getEquipes);

// Rota para obter uma equipe pelo ID
router.get('/:id', equipeController.getEquipeById);

// Rota para criar uma nova equipe
router.post('/', equipeController.createEquipe);

// Rota para atualizar uma equipe
router.put('/:id', equipeController.updateEquipe);

// Rota para excluir uma equipe
router.delete('/:id', equipeController.deleteEquipe);

module.exports = router;