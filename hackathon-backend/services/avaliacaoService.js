const avaliacaoModel = require('../models/avaliacaoModel');
const avaliadorModel = require('../models/avaliadorModel');

// Função para obter todas as avaliações
const getAvaliacoes = async () => {
    try {
        const avaliacoes = await avaliacaoModel.getAvaliacoes();
        return avaliacoes;
    } catch (err) {
        throw new Error('Erro ao obter avaliações: ' + err.message);
    }
};

// Função para obter uma avaliação pelo ID
const getAvaliacaoById = async (id) => {
    try {
        const avaliacao = await avaliacaoModel.getAvaliacaoById(id);
        if (!avaliacao) {
            throw new Error('Avaliação não encontrada');
        }
        return avaliacao;
    } catch (err) {
        throw new Error('Erro ao obter avaliação: ' + err.message);
    }
};

// Função para obter avaliações por avaliador_id ou equipe_id
const getAvaliacoesByFilter = async (filter) => {
    try {
        const avaliacoes = await avaliacaoModel.getAvaliacoesByFilter(filter);
        return avaliacoes;
    } catch (err) {
        throw new Error('Erro ao obter avaliações: ' + err.message);
    }
};

// Função para criar uma nova avaliação (sem notas)
const createAvaliacao = async (avaliador_id, equipe_id) => {
    try {
        const novaAvaliacao = await avaliacaoModel.createAvaliacao(avaliador_id, equipe_id);
        return novaAvaliacao;
    } catch (err) {
        throw new Error('Erro ao criar avaliação: ' + err.message);
    }
};

// Função para atualizar as notas de uma avaliação (requer autenticação)
const updateAvaliacao = async (id, login, senha, notas) => {
    try {
        const avaliador = await avaliadorModel.authenticateAvaliador(login, senha);
        if (!avaliador) {
            throw new Error('Credenciais inválidas');
        }

        const avaliacao = await avaliacaoModel.getAvaliacaoById(id);
        if (!avaliacao) {
            throw new Error('Avaliação não encontrada');
        }

        if (avaliacao.avaliador_id !== avaliador.id) {
            throw new Error('Você não tem permissão para atualizar esta avaliação');
        }

        const avaliacaoAtualizada = await avaliacaoModel.updateAvaliacao(id, notas);
        return avaliacaoAtualizada;
    } catch (err) {
        throw new Error('Erro ao atualizar avaliação: ' + err.message);
    }
};

// Função para excluir uma avaliação
const deleteAvaliacao = async (id) => {
    try {
        const result = await avaliacaoModel.deleteAvaliacao(id);
        if (result === 0) {
            throw new Error('Avaliação não encontrada');
        }
        return { message: 'Avaliação excluída com sucesso' };
    } catch (err) {
        throw new Error('Erro ao excluir avaliação: ' + err.message);
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