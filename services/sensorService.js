class SensorService {

    processarLeituras(dados) {
        if (!dados.temperatura || !dados.umidade) {
            throw new Error("Dados inválidos: Temperatura e Umidade são obrigatórios.");
        }

        const alertas = [];
        if (dados.temperatura > 35) alertas.push("ALERTA: Temperatura Crítica!");
        if (dados.distancia > 0 && dados.distancia < 30) alertas.push("ALERTA: Objeto próximo!");

        //  salvamento no banco (influxDB) - Fazer integracao logica Becca
        console.log(" Processando Dados");
        console.log(`Recebido: T=${dados.temperatura}, H=${dados.umidade}, L=${dados.lux}`);

        if (alertas.length > 0) {
            console.log("ALERTAS GERADOS:", alertas);
        }

        return {
            sucesso: true,
            dadosProcessados: dados,
            alertas: alertas,
            timestamp: new Date().toISOString()
        };
    }

    registrarAlarme(dadosAlarme) {
        console.log("ALARME RECEBIDO");
        console.log("Motivo:", dadosAlarme.motivo);
        console.log("Nível de Perigo:", dadosAlarme.nivel);
        console.log(`Sensores no momento: T=${dadosAlarme.temperatura}, D=${dadosAlarme.distancia}`);

        // Integrar logica e envio de email após teste. Usar Codigo adicionado por becca

        return {
            sucesso: true,
            mensagem: "Alarme registrado com prioridade máxima",
            timestamp: new Date().toISOString()
        };
    }
}

module.exports = new SensorService();