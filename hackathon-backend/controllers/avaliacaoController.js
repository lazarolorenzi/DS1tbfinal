const avaliacaoModel = require('../models/avaliacaoModel');
const avaliadorModel = require('../models/avaliadorModel');

// Função para obter todas as avaliações
const getAvaliacoes = async (req, res) => {
    try {
        const avaliacoes = await avaliacaoModel.getAvaliacoes();
        res.json(avaliacoes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para obter uma avaliação pelo ID
const getAvaliacaoById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const avaliacao = await avaliacaoModel.getAvaliacaoById(id);
        if (avaliacao) {
            res.json(avaliacao);
        } else {
            res.status(404).json({ error: 'Avaliação não encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para obter avaliações por avaliador_id ou equipe_id
const getAvaliacoesByFilter = async (req, res) => {
    const filter = {};
    if (req.query.avaliador_id) {
        filter.avaliador_id = parseInt(req.query.avaliador_id);
    } else if (req.query.equipe_id) {
        filter.equipe_id = parseInt(req.query.equipe_id);
    }

    try {
        const avaliacoes = await avaliacaoModel.getAvaliacoesByFilter(filter);
        res.json(avaliacoes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para criar uma nova avaliação (sem notas)
const createAvaliacao = async (req, res) => {
    const { avaliador_id, equipe_id } = req.body;
    try {
        const novaAvaliacao = await avaliacaoModel.createAvaliacao(avaliador_id, equipe_id);
        res.status(201).json(novaAvaliacao);
    } catch (err) {
        res.status(500).json({ error: err.message }); // Tratar erro de avaliação duplicada no model
    }
};

// Função para atualizar as notas de uma avaliação (requer autenticação)
const updateAvaliacao = async (req, res) => {
    const id = parseInt(req.params.id);
    const { login, senha, notas } = req.body;

    try {
        const avaliador = await avaliadorModel.authenticateAvaliador(login, senha);
        if (!avaliador) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const avaliacao = await avaliacaoModel.getAvaliacaoById(id);
        if (!avaliacao) {
            return res.status(404).json({ error: 'Avaliação não encontrada' });
        }

        if (avaliacao.avaliador_id !== avaliador.id) {
            return res.status(403).json({ error: 'Você não tem permissão para atualizar esta avaliação' });
        }

        const avaliacaoAtualizada = await avaliacaoModel.updateAvaliacao(id, notas);
        res.json(avaliacaoAtualizada);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para excluir uma avaliação
const deleteAvaliacao = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await avaliacaoModel.deleteAvaliacao(id);
        if (result === 0) {
            res.status(404).json({ error: 'Avaliação não encontrada' });
        } else {
            res.json({ message: 'Avaliação excluída com sucesso' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAvaliacoes,
    getAvaliacaoById,
    getAvaliacoesByFilter,
    createAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
};