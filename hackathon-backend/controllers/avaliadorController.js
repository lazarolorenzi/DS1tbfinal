const avaliadorModel = require('../models/avaliadorModel');

// Função para obter todos os avaliadores
const getAvaliadores = async (req, res) => {
    try {
        const avaliadores = await avaliadorModel.getAvaliadores();
        res.json(avaliadores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para obter um avaliador pelo ID
const getAvaliadorById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const avaliador = await avaliadorModel.getAvaliadorById(id);
        if (avaliador) {
            res.json(avaliador);
        } else {
            res.status(404).json({ error: 'Avaliador não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para criar um novo avaliador
const createAvaliador = async (req, res) => {
    const { nome, login, senha } = req.body;
    try {
        const novoAvaliador = await avaliadorModel.createAvaliador(nome, login, senha);
        res.status(201).json(novoAvaliador);
    } catch (err) {
        if (err.message === 'Já existe um avaliador com este nome ou login.') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

// Função para atualizar um avaliador
const updateAvaliador = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, login, senha } = req.body;
    try {
        const avaliadorAtualizado = await avaliadorModel.updateAvaliador(id, nome, login, senha);
        if (avaliadorAtualizado) {
            res.json(avaliadorAtualizado);
        } else {
            res.status(404).json({ error: 'Avaliador não encontrado' });
        }
    } catch (err) {
        if (err.message === 'Já existe um avaliador com este nome ou login.') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

// Função para excluir um avaliador
const deleteAvaliador = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await avaliadorModel.deleteAvaliador(id);
        if (result === 0) {
            res.status(404).json({ error: 'Avaliador não encontrado' });
        } else {
            res.json({ message: 'Avaliador excluído com sucesso' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAvaliadores,
    getAvaliadorById,
    createAvaliador,
    updateAvaliador,
    deleteAvaliador,
};