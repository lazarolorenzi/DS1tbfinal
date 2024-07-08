const equipeService = require('./equipeService');

// Função para obter todas as equipes
const getEquipes = async (req, res) => {
    try {
        const equipes = await equipeService.getEquipes();
        res.json(equipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para obter uma equipe pelo ID
const getEquipeById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const equipe = await equipeService.getEquipeById(id);
        res.json(equipe);
    } catch (err) {
        if (err.message === 'Equipe não encontrada') {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

// Função para criar uma nova equipe
const createEquipe = async (req, res) => {
    const { nome } = req.body;
    try {
        const novaEquipe = await equipeService.createEquipe(nome);
        res.status(201).json(novaEquipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Função para atualizar uma equipe
const updateEquipe = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;
    try {
        const equipeAtualizada = await equipeService.updateEquipe(id, nome);
        res.json(equipeAtualizada);
    } catch (err) {
        if (err.message === 'Equipe não encontrada') {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

// Função para excluir uma equipe
const deleteEquipe = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await equipeService.deleteEquipe(id);
        res.json(result); // Retorna a mensagem de sucesso do service
    } catch (err) {
        if (err.message === 'Equipe não encontrada') {
            res.status(404).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = {
    getEquipes,
    getEquipeById,
    createEquipe,
    updateEquipe,
    deleteEquipe,
};