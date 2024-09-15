const express = require('express');
const router = express.Router();
const joyasController = require('../controllers/joyasController');

// Ruta para obtener las joyas con paginación, ordenamiento y límite
router.get('/', joyasController.getJoyas);

// Ruta para obtener las joyas filtradas
router.get('/filtros', joyasController.getJoyasFiltradas);

module.exports = router;    