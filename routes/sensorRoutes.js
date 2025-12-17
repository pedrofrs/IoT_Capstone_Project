const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

// https://.../api/sensores

router.post('/', sensorController.receberDados);
router.get('/', (req, res) => res.send('Rota de sensores operante.'));
router.post('/alarme', sensorController.receberAlarme);
router.get('/historico', sensorController.listarHistorico);

module.exports = router;