const { InfluxDB, Point } = require("@influxdata/influxdb-client");
require("dotenv").config();

const influxDB = new InfluxDB({
    url: process.env.INFLUX_URL,
    token: process.env.INFLUX_TOKEN
});

const ORG = process.env.INFLUX_ORG;
const BUCKET = process.env.INFLUX_BUCKET;


async function testarConexaoEEscrita() {
    const writeApi = influxDB.getWriteApi(ORG, BUCKET);

    try {
        const point = new Point("health_check")
            .tag("service", "sensor-api")
            .floatField("status", 1)
            .timestamp(new Date());

        writeApi.writePoint(point);

        await writeApi.close();

        return {
            status: "OK",
            mensagem: "Conexão e escrita no InfluxDB funcionando"
        };

    } catch (error) {
        throw new Error(`Erro ao escrever no InfluxDB: ${error.message}`);
    }
}


async function salvarTelemetria(dados) {
    const writeApi = influxDB.getWriteApi(ORG, BUCKET);

    try {
        const point = new Point("warehouse_env")
            .tag("deviceId", dados.deviceId || "device-001")
            .floatField("temperatura", dados.temp)
            .floatField("umidade", dados.hum)
            .intField("ldr", dados.ldr || 0)
            .booleanField("alertTemp", dados.alertTemp)
            .booleanField("alertHum", dados.alertHum)
            .booleanField("alertAny", dados.alertAny)
            .timestamp(new Date(dados.ts || Date.now()));

        writeApi.writePoint(point);

        await writeApi.close();

    } catch (error) {
        console.error("Erro ao salvar telemetria:", error.message);
    }
}

module.exports = {
    testarConexaoEEscrita,
    salvarTelemetria
};
