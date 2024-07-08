const express = require('express');
const app = express();
const port = 3000; // Ou a porta que você preferir
require('dotenv').config();

// Importar o pool de conexões do arquivo db.js
const pool = require('./config/db');

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

// Rotas
const avaliadorRoutes = require('./routes/avaliadorRoutes');
const equipeRoutes = require('./routes/equipeRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');

app.use('/avaliadores', avaliadorRoutes);
app.use('/equipes', equipeRoutes);
app.use('/avaliacoes', avaliacaoRoutes);

// Teste de conexão com o banco de dados ao iniciar o servidor (opcional)
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados com sucesso!');
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});