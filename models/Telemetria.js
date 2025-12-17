const mongoose = require("mongoose");

const TelemetriaSchema = new mongoose.Schema(
    {
        deviceId: {
            type: String,
            required: true,
            index: true
        },
        temperatura: Number,
        umidade: Number,
        ldr: Number,

        alertTemp: Boolean,
        alertHum: Boolean,
        alertAny: Boolean,

        timestamp: {
            type: Date,
            default: Date.now,
            index: true
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Telemetria", TelemetriaSchema);
