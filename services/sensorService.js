const mailService = require('./mailService');

class SensorService {

    processarLeituras(dados) {
        if (!dados.temperatura || !dados.umidade) {
            throw new Error("Dados inválidos: Temperatura e Umidade são obrigatórios.");
        }

        const alertas = [];
        if (dados.temperatura > 35) alertas.push("ALERTA: Temperatura Crítica!");
        if (dados.distancia > 0 && dados.distancia < 30) alertas.push("ALERTA: Objeto próximo!");

        //  salvar no banco (influxDB) - Fazer integracao logica Becca
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

    async registrarAlarme(dadosAlarme) {
        console.log("!!! ALARME RECEBIDO !!!");
        console.log(`Motivo: ${dadosAlarme.motivo} | Nível: ${dadosAlarme.nivel}`);
        console.log(`Sensores: T=${dadosAlarme.temperatura}, D=${dadosAlarme.distancia}`);

        const dataHora = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

        const emailAssunto = `ALERTA IOT: ${dadosAlarme.motivo}`;

        const emailTexto = `ALERTA DE SEGURANÇA!\n\nMotivo: ${dadosAlarme.motivo}\nNível: ${dadosAlarme.nivel}\nTemperatura: ${dadosAlarme.temperatura}°C\nDistância: ${dadosAlarme.distancia}cm\nHorário: ${dataHora}`;

        const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #dcdcdc; border-radius: 8px;">
        <h2 style="color: #d9534f;">ALERTA DE SEGURANÇA DETECTADO</h2>
        <p>O sistema IoT registrou um evento crítico.</p>
        <hr>
        <ul>
          <li><strong>Motivo:</strong> ${dadosAlarme.motivo}</li>
          <li><strong>Nível:</strong> <span style="color: red; font-weight: bold;">${dadosAlarme.nivel}</span></li>
          <li><strong>Temperatura:</strong> ${dadosAlarme.temperatura} °C</li>
          <li><strong>Distância Detectada:</strong> ${dadosAlarme.distancia} cm</li>
          <li><strong>Horário:</strong> ${dataHora}</li>
        </ul>
        <hr>
        <p><small>Este é um e-mail automático do seu Projeto Capstone IoT.</small></p>
      </div>
    `;

        let statusEmail = "Não enviado";
        try {
            await mailService.enviarEmail({
                to: "ped.frsouza@gmail.com",
                subject: emailAssunto,
                text: emailTexto,
                html: emailHtml
            });
            statusEmail = "Enviado com sucesso";
        } catch (error) {
            console.error("Erro no envio do e-mail dentro do Service:", error.message);
            statusEmail = "Falha no envio";
        }

        return {
            sucesso: true,
            mensagem: "Alarme registrado e processado",
            statusNotificacao: statusEmail,
            timestamp: new Date().toISOString()
        };
    }
}

module.exports = new SensorService();