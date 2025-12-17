const Telemetria = require("../models/Telemetria");

async function salvarTelemetria(t) {
    try {
        const registro = await Telemetria.create({
            deviceId: t.deviceId || "device-001",
            temperatura: t.temp,
            umidade: t.hum,
            ldr: t.ldr || 0,

            alertTemp: t.alertTemp,
            alertHum: t.alertHum,
            alertAny: t.alertAny,

            timestamp: t.ts ? new Date(t.ts) : new Date()
        });

        return registro;
    } catch (err) {
        console.error("Erro ao salvar telemetria no MongoDB:", err.message);
        throw err;
    }
}

module.exports = { salvarTelemetria };
