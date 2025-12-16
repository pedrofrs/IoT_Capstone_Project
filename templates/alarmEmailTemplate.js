function gerarTemplateAlarme(dados) {
    const dataHora = new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo"
    });

    const subject = `ALERTA IOT: ${dados.motivo}`;

    const text =
        `ALERTA DE SEGURANÇA!

Motivo: ${dados.motivo}
Nível: ${dados.nivel}
Temperatura: ${dados.temperatura}°C
Distância: ${dados.distancia}cm
Horário: ${dataHora}`;

    const html = `
<div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #dcdcdc; border-radius: 8px;">
    <h2 style="color: #d9534f;">🚨 ALERTA DE SEGURANÇA</h2>
    <p>O sistema IoT detectou um evento crítico.</p>
    <hr>
    <ul>
        <li><strong>Motivo:</strong> ${dados.motivo}</li>
        <li><strong>Nível:</strong> <span style="color: red; font-weight: bold;">${dados.nivel}</span></li>
        <li><strong>Temperatura:</strong> ${dados.temperatura} °C</li>
        <li><strong>Distância:</strong> ${dados.distancia} cm</li>
        <li><strong>Horário:</strong> ${dataHora}</li>
    </ul>
    <hr>
    <p><small>Mensagem automática – Projeto Capstone IoT</small></p>
</div>`;

    return { subject, text, html };
}

module.exports = { gerarTemplateAlarme };
