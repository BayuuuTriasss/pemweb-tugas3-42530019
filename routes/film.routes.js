const express = require('express');
const router = express.Router();
const filmController = require('../controller/film.controller');

router.get('/film', filmController.getDaftarFilm);
router.get('/film/tambah', filmController.getFormTambah);
router.post('/film/tambah', filmController.postTambahFilm);
router.get('/film/edit/:id', filmController.getFormEdit);
router.post('/film/edit/:id', filmController.postUpdateFilm);
router.post('/film/hapus/:id', filmController.postHapusFilm);

module.exports = router;