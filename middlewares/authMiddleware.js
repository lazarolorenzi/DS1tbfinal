const avaliadorModel = require('../models/avaliadorModel');

const authenticateAvaliador = async (req, res, next) => {
    const { login, senha } = req.body;

    try {
        const avaliador = await avaliadorModel.authenticateAvaliador(login, senha);
        if (!avaliador) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        req.avaliador = avaliador; // Armazena o avaliador na requisição
        next(); // Passa para o próximo middleware ou rota
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = authenticateAvaliador;