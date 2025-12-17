const { InfluxDB, Point } = require("@influxdata/influxdb-client");
require("dotenv").config();

const influx = new InfluxDB({
    url: process.env.INFLUX_URL,
    token: process.env.INFLUX_TOKEN,
});

const writeApi = influx.getWriteApi(
    process.env.INFLUX_ORG,
    process.env.INFLUX_BUCKET,
    "ns"
);

function salvarTelemetria(t) {
    try {
        const point = new Point("warehouse_env")
            .tag("deviceId", t.deviceId || "device-001")
            .floatField("temperatura", t.temp)
            .floatField("umidade", t.hum)
            .intField("ldr", t.ldr || 0)
            .booleanField("alertTemp", t.alertTemp)
            .booleanField("alertHum", t.alertHum)
            .booleanField("alertAny", t.alertAny)
            .timestamp(new Date(t.ts || Date.now()));

        writeApi.writePoint(point);
    } catch (err) {
        console.error("Erro ao salvar no InfluxDB:", err.message);
    }
}

module.exports = { salvarTelemetria };