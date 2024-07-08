const pool = require('../config/db');

// Função para obter todas as equipes
const getEquipes = async () => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM equipes');
        return result.rows;
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
};

// Função para obter uma equipe pelo ID
const getEquipeById = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM equipes WHERE id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
};

// Função para criar uma nova equipe
const createEquipe = async (nome) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'INSERT INTO equipes (nome) VALUES ($1) RETURNING *',
            [nome]
        );
        return result.rows[0];
    } catch (err) {
        if (err.code === '23505') { // Erro de chave duplicada (unique violation)
            throw new Error('Já existe uma equipe com este nome.');
        } else {
            throw err;
        }
    } finally {
        client.release();
    }
};

// Função para atualizar uma equipe
const updateEquipe = async (id, nome) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'UPDATE equipes SET nome = $1 WHERE id = $2 RETURNING *',
            [nome, id]
        );
        return result.rows[0];
    } catch (err) {
        if (err.code === '23505') { // Erro de chave duplicada (unique violation)
            throw new Error('Já existe uma equipe com este nome.');
        } else {
            throw err;
        }
    } finally {
        client.release();
    }
};

// Função para excluir uma equipe
const deleteEquipe = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.query('DELETE FROM equipes WHERE id = $1', [id]);
        return result.rowCount; // Retorna o número de linhas afetadas
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
};

module.exports = {
    getEquipes,
    getEquipeById,
    createEquipe,
    updateEquipe,
    deleteEquipe,
};