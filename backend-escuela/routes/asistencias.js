const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../config/db');

router.get('/', async (req, res) => {
    try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
        SELECT a.ID_Asistencia, e.Nombre AS EstudianteNombre, e.Apellido AS EstudianteApellido, a.Fecha, a.Estado
        FROM Asistencia a
        JOIN Estudiantes e ON a.ID_Estudiante = e.ID_Estudiante
    `);
    res.json(result.recordset);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
    const { ID_Estudiante, ID_AnioEscolar, Fecha, Estado } = req.body;
    const pool = await poolPromise;
    await pool.request()
        .input('ID_Estudiante', sql.Int, ID_Estudiante)
        .input('ID_AnioEscolar', sql.Int, ID_AnioEscolar || null)
        .input('Fecha', sql.Date, Fecha)
        .input('Estado', sql.NVarChar, Estado)
        .query(`
        INSERT INTO Asistencia (ID_Estudiante, ID_AnioEscolar, Fecha, Estado)
        VALUES (@ID_Estudiante, @ID_AnioEscolar, @Fecha, @Estado)
        `);
    res.json({ message: 'Asistencia registrada' });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

module.exports = router;
