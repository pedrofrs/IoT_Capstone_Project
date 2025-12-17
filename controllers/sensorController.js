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

exports.receberAlarme = async (req, res) => {
    try {
        const dadosAlarme = req.body;

        if (!dadosAlarme.motivo) {
            return res.status(400).json({ erro: "Motivo do alarme é obrigatório" });
        }

        const resultado = await sensorService.registrarAlarme(dadosAlarme);

        return res.status(200).json(resultado);

    } catch (error) {
        console.error("Erro ao registrar alarme:", error);
        return res.status(500).json({ erro: "Falha interna" });
    }
};

exports.listarHistorico = (req, res) => {
    try {
        const historico = sensorService.obterHistorico();
        return res.status(200).json(historico);
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao buscar histórico" });
    }
};
