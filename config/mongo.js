const mongoose = require("mongoose");
require("dotenv").config();


async function conectarMongo() {
    try {
        await mongoose.connect("mongodb+srv://pedrofrs:pedrofrs@cluster0.qv8d7ym.mongodb.net", {
            dbName: "iot_capstone",
            serverSelectionTimeoutMS: 5000
        });

        console.log("MongoDB conectado com sucesso");
    } catch (err) {
        console.error("Erro ao conectar no MongoDB:", err.message);
        process.exit(1);
    }
}

module.exports = { conectarMongo };
