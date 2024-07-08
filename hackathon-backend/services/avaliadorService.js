const avaliadorService = require('./avaliadorService');

// Função para obter todos os avaliadores
const getAvaliadores = async (req, res) => {
    try {
        const avaliadores = await avaliadorService.getAvaliadores();
        res.json(avaliadores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para obter um avaliador pelo ID
const getAvaliadorById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const avaliador = await avaliadorService.getAvaliadorById(id);
        res.json(avaliador);
    } catch (err) {
        if (err.message === 'Avaliador não encontrado') {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

// Função para criar um novo avaliador
const createAvaliador = async (req, res) => {
    const { nome, login, senha } = req.body;
    try {
        const novoAvaliador = await avaliadorService.createAvaliador(nome, login, senha);
        res.status(201).json(novoAvaliador);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para atualizar um avaliador
const updateAvaliador = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, login, senha } = req.body;
    try {
        const avaliadorAtualizado = await avaliadorService.updateAvaliador(id, nome, login, senha);
        res.json(avaliadorAtualizado);
    } catch (err) {
        if (err.message === 'Avaliador não encontrado') {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

// Função para excluir um avaliador
const deleteAvaliador = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await avaliadorService.deleteAvaliador(id);
        res.json(result); // Retorna a mensagem de sucesso do service
    } catch (err) {
        if (err.message === 'Avaliador não encontrado') {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = {
    getAvaliadores,
    getAvaliadorById,
    createAvaliador,
    updateAvaliador,
    deleteAvaliador,
};