const express = require('express');
const pg = require('pg');
const app = express();
app.use(express.json());
const port = 3000;
require('dotenv').config();


const avaliadorRoutes = require('./routes/avaliadorRoutes');
app.use('/avaliadores', avaliadorRoutes);

const equipeRoutes = require('./routes/equipeRoutes');
app.use('/equipes', equipeRoutes);