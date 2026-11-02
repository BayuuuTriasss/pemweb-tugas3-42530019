const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const db = require('./config/database');
const filmRoutes = require('./routes/film.routes');
const { notFound, errorHandler } = require('./middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rute
app.get('/', (req, res) => res.redirect('/film'));
app.use('/', filmRoutes);

// Penanganan error (wajib setelah semua rute)
app.use(notFound);
app.use(errorHandler);

// Verifikasi koneksi basis data saat startup
db.query('SELECT 1 + 1 AS result')
    .then(() => {
        console.log('[DATABASE] Terhubung ke MySQL Pool secara aman.');
        app.listen(PORT, () => console.log('[SERVER] Aktif di http://localhost:' + PORT));
    })
    .catch(err => {
        console.error('[DATABASE ERROR] Gagal terhubung ke MySQL:', err.message);
    });