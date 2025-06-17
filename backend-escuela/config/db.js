const sql = require('mssql');

const dbConfig = {
    user: 'adminisaias',
    password: 'Isaias2025!',
    server: 'escuelaisaiasdbserver2025.database.windows.net',
    database: 'EscuelaIsaiasDB',
    options: {
    encrypt: true,
    trustServerCertificate: false
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Conectado a Azure SQL');
    return pool;
    })
    .catch(err => console.error('Error de conexión: ', err));

module.exports = {
    sql, poolPromise
};
