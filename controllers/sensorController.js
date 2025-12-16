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

exports.receberAlarme = (req, res) => {
    try {
        const dadosAlarme = req.body;

        if (!dadosAlarme.motivo) {
            return res.status(400).json({ erro: "Motivo do alarme é obrigatório" });
        }

        const resultado = sensorService.registrarAlarme(dadosAlarme);
        return res.status(200).json(resultado);

    } catch (error) {
        console.error("Erro ao registrar alarme:", error);
        return res.status(500).json({ erro: "Falha interna" });
    }
};