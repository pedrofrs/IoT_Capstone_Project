const sensorService = require('../services/sensorService');

exports.receberDados = (req, res) => {
    try {
        const dados = req.body;

        const resultado = sensorService.processarLeituras(dados);

        return res.status(200).json(resultado);

    } catch (error) {
        console.error("Erro no controller:", error.message);

        return res.status(400).json({
            sucesso: false,
            erro: error.message
        });
    }
};