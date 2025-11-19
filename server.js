const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
app.use(cors());

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: 'mibase',
});

app.get('/productos', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM productos");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Error en la base" });
    } finally {
        if (conn) conn.end();
    }
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000/productos"));
