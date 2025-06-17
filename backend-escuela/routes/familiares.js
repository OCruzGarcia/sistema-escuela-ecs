const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../config/db');

router.get('/', async (req, res) => {
    try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
        SELECT f.ID_Familiar, f.Nombre, f.Apellido, f.Parentesco, e.Nombre AS EstudianteNombre, e.Apellido AS EstudianteApellido
        FROM Familiares f
        JOIN Estudiantes e ON f.ID_Estudiante = e.ID_Estudiante
    `);
    res.json(result.recordset);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
    const { ID_Estudiante, Nombre, Apellido, Parentesco, Telefono, Email, Especialidad } = req.body;
    const pool = await poolPromise;
    await pool.request()
        .input('ID_Estudiante', sql.Int, ID_Estudiante)
        .input('Nombre', sql.NVarChar, Nombre)
        .input('Apellido', sql.NVarChar, Apellido)
        .input('Parentesco', sql.NVarChar, Parentesco)
        .input('Telefono', sql.NVarChar, Telefono || null)
        .input('Email', sql.NVarChar, Email || null)
        .input('Especialidad', sql.NVarChar, Especialidad || null)
        .query(`
        INSERT INTO Familiares (ID_Estudiante, Nombre, Apellido, Parentesco, Telefono, Email, Especialidad)
        VALUES (@ID_Estudiante, @Nombre, @Apellido, @Parentesco, @Telefono, @Correo, @Especialidad)
        `);
    res.json({ message: 'Familiar registrado' });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

module.exports = router;
