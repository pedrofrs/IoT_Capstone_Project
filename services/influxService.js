const { InfluxDB, Point } = require("@influxdata/influxdb-client");
require("dotenv").config();

const influxDB = new InfluxDB({
    url: process.env.INFLUX_URL,
    token: process.env.INFLUX_TOKEN,
    timeout: 50_000
});

const ORG = process.env.INFLUX_ORG;
const BUCKET = process.env.INFLUX_BUCKET;

const writeApi = influxDB.getWriteApi(
    ORG,
    BUCKET,
    "ns",
    {
        batchSize: 1,
        flushInterval: 1_000,
        maxRetries: 3,
        maxRetryDelay: 5_000
    }
);
writeApi.useDefaultTags({ app: "sensor-api" });

function salvarTelemetria(dados) {
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

    } catch (error) {
        console.error("Erro ao escrever ponto no Influx:", error.message);
    }
}


async function encerrarInflux() {
    try {
        await writeApi.close();
        console.log("Writer do InfluxDB fechado corretamente");
    } catch (err) {
        console.error("Erro ao fechar writer do Influx:", err.message);
    }
}

module.exports = {
    salvarTelemetria,
    encerrarInflux
};
