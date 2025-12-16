const { InfluxDB, Point } = require("@influxdata/influxdb-client");
require("dotenv").config();

const influxDB = new InfluxDB({
    url: process.env.INFLUX_URL,
    token: process.env.INFLUX_TOKEN,
    timeout: 30_000
});

const writeApi = influxDB.getWriteApi(
    process.env.INFLUX_ORG,
    process.env.INFLUX_BUCKET,
    "ns",
    {
        batchSize: 1,
        flushInterval: 1_000,
        maxRetries: 3
    }
);

function salvarTelemetria(dados) {
    const point = new Point("warehouse_env")
        .floatField("temperatura", dados.temp)
        .floatField("umidade", dados.hum)
        .booleanField("alertAny", dados.alertAny)
        .timestamp(new Date());

    writeApi.writePoint(point);
}

module.exports = { salvarTelemetria };
