const alarmNotificationService = require("./alarmNotificationService");

const { salvarTelemetria } = require('./influxService');


class SensorService {

    constructor() {
        this.historicoLeituras = [];
    }

    processarLeituras(dados) {
        if (!dados.temperatura || !dados.umidade) {
            throw new Error("Dados inválidos: Temperatura e Umidade são obrigatórios.");
        }

        const alertTemp = dados.temperatura > 35;
        const alertHum = dados.umidade < 20 || dados.umidade > 80;
        const alertAny = alertTemp || alertHum;

        const alertas = [];
        if (dados.temperatura > 35) alertas.push("ALERTA: Temperatura Crítica!");
        if (dados.distancia > 0 && dados.distancia < 30) alertas.push("ALERTA: Objeto próximo!");


        if (alertas.length > 0) {
            console.log("ALERTAS GERADOS:", alertas);
        }

        const resultadoProcessado = {
            sucesso: true,
            dadosProcessados: dados,
            alertas: alertas,
            timestamp: new Date().toISOString()
        };

        this.historicoLeituras.push(resultadoProcessado);

        return resultadoProcessado;
    }

    async registrarAlarme(dadosAlarme) {
        console.log("ALARME RECEBIDO");
        console.log(`Motivo: ${dadosAlarme.motivo} | Nível: ${dadosAlarme.nivel}`);
        console.log(`Sensores: T=${dadosAlarme.temperatura}, D=${dadosAlarme.distancia}`);

        let statusEmail = "Não enviado";

        try {
            await alarmNotificationService.enviarAlertaEmail(dadosAlarme);
            statusEmail = "Enviado com sucesso";
        } catch (error) {
            console.error("Erro ao enviar notificação:", error.message);
            statusEmail = "Falha no envio";
        }

        return {
            sucesso: true,
            mensagem: "Alarme processado",
            statusNotificacao: statusEmail,
            timestamp: new Date().toISOString()
        };
    }

    obterHistorico() {
        return this.historicoLeituras;
    }
}

module.exports = new SensorService();