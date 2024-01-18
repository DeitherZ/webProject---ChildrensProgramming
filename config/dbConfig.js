// dbConfig.js
const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
};

// Realizar una conexión de prueba para verificar si se estableció la conexión correctamente
sql.connect(config, (error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    } else {
        console.log('Conexión a la base de datos establecida correctamente.');
    }
});

module.exports = sql;