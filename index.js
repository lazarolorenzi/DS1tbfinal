const express = require('express');
const pg = require('pg');
const app = express();
app.use(express.json());
const port = 3000;
require('dotenv').config();