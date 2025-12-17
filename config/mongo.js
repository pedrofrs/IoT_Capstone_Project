const mongoose = require("mongoose");
require("dotenv").config();


async function conectarMongo() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.MONGO_DB,
            serverSelectionTimeoutMS: 5000
        });

        console.log("MongoDB conectado com sucesso");
    } catch (err) {
        console.error("Erro ao conectar no MongoDB:", err.message);
        process.exit(1);
    }
}

module.exports = { conectarMongo };
