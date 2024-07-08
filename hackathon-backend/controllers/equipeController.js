// controllers/equipeController.js
const equipeModel = require('../models/equipeModel');

// Função para obter todas as equipes
const getEquipes = async (req, res) => {
    try {
        const equipes = await equipeModel.getEquipes();
        res.json(equipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para obter uma equipe pelo ID
const getEquipeById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const equipe = await equipeModel.getEquipeById(id);
        if (equipe) {
            res.json(equipe);
        } else {
            res.status(404).json({ error: 'Equipe não encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para criar uma nova equipe
const createEquipe = async (req, res) => {
    const { nome } = req.body;
    try {
        const novaEquipe = await equipeModel.createEquipe(nome);
        res.status(201).json(novaEquipe);
    } catch (err) {
        if (err.message === 'Já existe uma equipe com este nome.') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

// Função para atualizar uma equipe
const updateEquipe = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;
    try {
        const equipeAtualizada = await equipeModel.updateEquipe(id, nome);
        if (equipeAtualizada) {
            res.json(equipeAtualizada);
        } else {
            res.status(404).json({ error: 'Equipe não encontrada' });
        }
    } catch (err) {
        if (err.message === 'Já existe uma equipe com este nome.') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

// Função para excluir uma equipe
const deleteEquipe = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await equipeModel.deleteEquipe(id);
        if (result === 0) {
            res.status(404).json({ error: 'Equipe não encontrada' });
        } else {
            res.json({ message: 'Equipe excluída com sucesso' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getEquipes,
    getEquipeById,
    createEquipe,
    updateEquipe,
    deleteEquipe,
};