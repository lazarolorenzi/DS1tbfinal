const pool = require('../config/db');

// Função para obter todos os avaliadores
const getAvaliadores = async () => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM avaliadores');
        return result.rows;
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
};

// Função para obter um avaliador pelo ID
const getAvaliadorById = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM avaliadores WHERE id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
};

// Função para criar um novo avaliador
const createAvaliador = async (nome, login, senha) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'INSERT INTO avaliadores (nome, login, senha) VALUES ($1, $2, $3) RETURNING *',
            [nome, login, senha]
        );
        return result.rows[0];
    } catch (err) {
        if (err.code === '23505') { // Erro de chave duplicada (unique violation)
            throw new Error('Já existe um avaliador com este nome ou login.');
        } else {
            throw err;
        }
    } finally {
        client.release();
    }
};

// Função para atualizar um avaliador
const updateAvaliador = async (id, nome, login, senha) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'UPDATE avaliadores SET nome = $1, login = $2, senha = $3 WHERE id = $4 RETURNING *',
            [nome, login, senha, id]
        );
        return result.rows[0];
    } catch (err) {
        if (err.code === '23505') { // Erro de chave duplicada (unique violation)
            throw new Error('Já existe um avaliador com este nome ou login.');
        } else {
            throw err;
        }
    } finally {
        client.release();
    }
};

// Função para excluir um avaliador
const deleteAvaliador = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.query('DELETE FROM avaliadores WHERE id = $1', [id]);
        return result.rowCount; // Retorna o número de linhas afetadas
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
};

// Função para autenticar um avaliador (login)
const authenticateAvaliador = async (login, senha) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM avaliadores WHERE login = $1 AND senha = $2',
            [login, senha]
        );
        return result.rows[0]; // Retorna o avaliador se encontrado, ou null
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
};

module.exports = {
    getAvaliadores,
    getAvaliadorById,
    createAvaliador,
    updateAvaliador,
    deleteAvaliador,
    authenticateAvaliador,
};