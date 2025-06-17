const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../config/db');

router.get('/', async (req, res) => {
    try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT ID_Estudiante, Nombre, Apellido FROM Estudiantes');
    res.json(result.recordset);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

module.exports = router;
