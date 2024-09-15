// Archivo: src/controllers/joyasController.js

const db = require('../db/db');

// Controlador para manejar la lógica de negocio de las joyas
const getJoyas = async (req, res) => {
  try {
    const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
    const offset = (page - 1) * limits;
    const [field, direction] = order_by.split('_');

    const query = `SELECT * FROM inventario ORDER BY ${field} ${direction} LIMIT $1 OFFSET $2`;
    const joyas = await db.query(query, [limits, offset]);

    const results = joyas.rows.map((joya) => ({
      ...joya,
      links: {
        self: `/inventario/${joya.id}`,
      },
    }));

    res.status(200).json({
      joyas: results,
      total: joyas.rowCount,
      links: {
        next: `/joyas?limits=${limits}&page=${Number(page) + 1}&order_by=${order_by}`,
        prev: page > 1 ? `/joyas?limits=${limits}&page=${Number(page) - 1}&order_by=${order_by}` : null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las joyas', error });
  }
};

// Controlador para manejar el filtrado de joyas
const getJoyasFiltradas = async (req, res) => {
  try {
    const { precio_max, precio_min, categoria, metal } = req.query;

    let filters = [];
    let queryParams = [];
    let paramCounter = 1;

    if (precio_max) {
      filters.push(`precio <= $${paramCounter}`);
      queryParams.push(precio_max);
      paramCounter++;
    }
    if (precio_min) {
      filters.push(`precio >= $${paramCounter}`);
      queryParams.push(precio_min);
      paramCounter++;
    }
    if (categoria) {
      filters.push(`categoria = $${paramCounter}`);
      queryParams.push(categoria);
      paramCounter++;
    }
    if (metal) {
      filters.push(`metal = $${paramCounter}`);
      queryParams.push(metal);
      paramCounter++;
    }

    const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
    const query = `SELECT * FROM inventario ${whereClause}`;

    const joyasFiltradas = await db.query(query, queryParams);
    res.status(200).json(joyasFiltradas.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al filtrar las joyas', error });
  }
};

module.exports = {
  getJoyas,
  getJoyasFiltradas,
};

// Archivo: src/routes/joyas.js

/* const express = require('express');
const router = express.Router();
const joyasController = require('../controllers/joyasController');

// Ruta para obtener las joyas con paginación, ordenamiento y límite
router.get('/', joyasController.getJoyas);

// Ruta para obtener las joyas filtradas
router.get('/filtros', joyasController.getJoyasFiltradas);

module.exports = router; */
