const express = require('express');
require("dotenv").config();
const cors = require('cors');
const sensorRoutes = require('./routes/sensorRoutes');
const { encerrarInflux } = require('./services/influxService');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API IoT Online! Use /api/sensores para envio.');
});

// ENDPOINTS
app.use('/api/sensores', sensorRoutes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


async function shutdown(signal) {
    console.log(`\nRecebido sinal ${signal}. Encerrando aplicação...`);

    try {
        await encerrarInflux();
        console.log("InfluxDB finalizado com sucesso");
    } catch (err) {
        console.error("Erro ao encerrar InfluxDB:", err.message);
    }

    server.close(() => {
        console.log("Servidor HTTP encerrado");
        process.exit(0);
    });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

module.exports = app;
