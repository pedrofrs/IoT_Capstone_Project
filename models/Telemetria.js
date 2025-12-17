const mongoose = require('mongoose');

const TelemetriaSchema = new mongoose.Schema({
    deviceId: { type: String, required: true },
    temperatura: { type: Number, required: true },
    umidade: { type: Number, required: true },
    ldr: { type: Number, default: 0 },

    // Flags de alerta
    alertTemp: { type: Boolean, default: false },
    alertHum: { type: Boolean, default: false },
    alertAny: { type: Boolean, default: false },

    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Telemetria', TelemetriaSchema);