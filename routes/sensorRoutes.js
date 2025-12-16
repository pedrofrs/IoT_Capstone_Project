const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');


router.post('/', sensorController.receberDados);
router.get('/', (req, res) => res.send('Rota de sensores operante.'));

module.exports = router;