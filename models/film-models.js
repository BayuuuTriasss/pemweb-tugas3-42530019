const db = require('../config/database');

const FilmModel = {
    // READ: seluruh film (tanpa input pengguna)
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM tb_film ORDER BY id ASC');
        return rows;
    },

    // READ: satu film berdasarkan id
    getById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM tb_film WHERE id = ?', [id]);
        return rows[0]; 
    },

    // CREATE
    create: async (data) => {
        const sql = 'INSERT INTO tb_film (judul, sutradara, genre, tahun_rilis, rating, sinopsis) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.execute(sql, [
            data.judul,
            data.sutradara,
            data.genre,
            data.tahun_rilis,
            data.rating,
            data.sinopsis
        ]);
        return result;
    },

    // UPDATE
    update: async (id, data) => {
        const sql = 'UPDATE tb_film SET judul = ?, sutradara = ?, genre = ?, tahun_rilis = ?, rating = ?, sinopsis = ? WHERE id = ?';
        const [result] = await db.execute(sql, [
            data.judul,
            data.sutradara,
            data.genre,
            data.tahun_rilis,
            data.rating,
            data.sinopsis,
            id
        ]);
        return result;
    },

    // DELETE
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM tb_film WHERE id = ?', [id]);
        return result;
    }
};

module.exports = FilmModel;