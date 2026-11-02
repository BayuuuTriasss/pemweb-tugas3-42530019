const FilmModel = require('../models/film-models');
const { renderError } = require('../middleware/error.middleware');

const GENRE_LIST = ['Action', 'Drama', 'Animation', 'Romance', 'Science Fiction'];
const TAHUN_MIN = 1888;

// ID berupa bilangan bulat positif
const idValid = (id) => /^\d+$/.test(id);

// Validasi; mengembalikan pesan error atau null jika valid
const validasi = (body) => {
    const { judul, sutradara, genre, tahun_rilis, rating, sinopsis } = body;

    if (!judul || !sutradara || !genre || !tahun_rilis || !rating || !sinopsis) {
        return 'Seluruh field formulir wajib diisi.';
    }
    if (!GENRE_LIST.includes(genre)) {
        return 'Genre tidak valid.';
    }

    const tahun = Number(tahun_rilis);
    const tahunMax = new Date().getFullYear() + 5;
    if (!Number.isInteger(tahun) || tahun < TAHUN_MIN || tahun > tahunMax) {
        return 'Tahun rilis harus berupa angka antara ' + TAHUN_MIN + ' dan ' + tahunMax + '.';
    }

    const nilai = Number(rating);
    if (isNaN(nilai) || nilai < 0 || nilai > 10) {
        return 'Rating harus berupa angka antara 0 sampai 10.';
    }
    return null;
};

// Merapikan input menjadi objek siap simpan
const bersihkan = (body) => ({
    judul: body.judul.trim(),
    sutradara: body.sutradara.trim(),
    genre: body.genre,
    tahun_rilis: Number(body.tahun_rilis),
    rating: Number(body.rating),
    sinopsis: body.sinopsis.trim()
});

// READ: daftar film
exports.getDaftarFilm = async (req, res, next) => {
    try {
        const filmList = await FilmModel.getAll();
        res.render('pages/film-list', {
            pageTitle: 'Katalog Film',
            filmList
        });
    } catch (err) {
        next(err);
    }
};

// CREATE
exports.getFormTambah = (req, res) => {
    res.render('pages/film-form-tambah', {
        pageTitle: 'Tambah Film',
        genreList: GENRE_LIST
    });
};

// CREATE
exports.postTambahFilm = async (req, res, next) => {
    try {
        const error = validasi(req.body);
        if (error) return renderError(res, 400, error);

        await FilmModel.create(bersihkan(req.body));
        res.redirect('/film');
    } catch (err) {
        next(err);
    }
};

// UPDATE
exports.getFormEdit = async (req, res, next) => {
    try {
        if (!idValid(req.params.id)) {
            return renderError(res, 404, 'Data film tidak ditemukan.');
        }

        const film = await FilmModel.getById(req.params.id);
        if (!film) {
            return renderError(res, 404, 'Data film dengan ID tersebut tidak ditemukan.');
        }

        res.render('pages/film-form-edit', {
            pageTitle: 'Edit Film',
            film,
            genreList: GENRE_LIST
        });
    } catch (err) {
        next(err);
    }
};

// UPDATE
exports.postUpdateFilm = async (req, res, next) => {
    try {
        if (!idValid(req.params.id)) {
            return renderError(res, 404, 'Data film tidak ditemukan.');
        }

        const error = validasi(req.body);
        if (error) return renderError(res, 400, error);

        const hasil = await FilmModel.update(req.params.id, bersihkan(req.body));
        if (hasil.affectedRows === 0) {
            return renderError(res, 404, 'Data film dengan ID tersebut tidak ditemukan.');
        }

        res.redirect('/film');
    } catch (err) {
        next(err);
    }
};

// DELETE
exports.postHapusFilm = async (req, res, next) => {
    try {
        if (!idValid(req.params.id)) {
            return renderError(res, 404, 'Data film tidak ditemukan.');
        }

        const hasil = await FilmModel.delete(req.params.id);
        if (hasil.affectedRows === 0) {
            return renderError(res, 404, 'Data film sudah tidak ada atau telah dihapus.');
        }

        res.redirect('/film');
    } catch (err) {
        next(err);
    }
};