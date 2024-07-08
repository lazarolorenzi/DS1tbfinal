const pool = require('../config/db');

// Função para obter todas as avaliações
const getAvaliacoes = async () => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM avaliacoes');
        return result.rows;
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
};

// Função para obter uma avaliação pelo ID
const getAvaliacaoById = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM avaliacoes WHERE id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
};

// Função para obter avaliações por avaliador_id ou equipe_id
const getAvaliacoesByFilter = async (filter) => {
    const client = await pool.connect();
    try {
        let query = 'SELECT * FROM avaliacoes WHERE ';
        const values = [];
        if (filter.avaliador_id) {
            query += 'avaliador_id = $1';
            values.push(filter.avaliador_id);
        } else if (filter.equipe_id) {
            query += 'equipe_id = $1';
            values.push(filter.equipe_id);
        } else {
            throw new Error('Filtro inválido');
        }
        const result = await client.query(query, values);
        return result.rows;
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
};

// Função para criar uma nova avaliação (sem notas)
const createAvaliacao = async (avaliador_id, equipe_id) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'INSERT INTO avaliacoes (avaliador_id, equipe_id, notas) VALUES ($1, $2, $3) RETURNING *',
            [avaliador_id, equipe_id, '{}'] // Inicializa notas como um objeto JSON vazio
        );
        return result.rows[0];
    } catch (err) {
        if (err.code === '23505') {
            throw new Error('Este avaliador já avaliou esta equipe');
        } else {
            throw err;
        }
    } finally {
        client.release();
    }
};

// Função para atualizar as notas de uma avaliação
const updateAvaliacao = async (id, notas) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'UPDATE avaliacoes SET notas = $1 WHERE id = $2 RETURNING *',
            [notas, id]
        );
        return result.rows[0];
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
};

// Função para excluir uma avaliação
const deleteAvaliacao = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.query('DELETE FROM avaliacoes WHERE id = $1', [id]);
        return result.rowCount; // Retorna o número de linhas afetadas
    } catch (err) {
        throw err;
    } finally {
        client.release();
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