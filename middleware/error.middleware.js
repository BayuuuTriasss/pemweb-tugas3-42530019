// Penanganan error terpusat: halaman 404 dan error handler global
const JUDUL_ERROR = {
    400: 'Permintaan Tidak Valid',
    404: 'Halaman Tidak Ditemukan',
    500: 'Terjadi Kesalahan Server'
};

// Menampilkan halaman error dengan status HTTP yang sesuai
const renderError = (res, status, pesan, detail = null) => {
    res.status(status).render('pages/error', {
        pageTitle: 'Error ' + status,
        statusCode: status,
        judul: JUDUL_ERROR[status] || 'Terjadi Kesalahan',
        pesan,
        detail
    });
};

// Dipasang setelah semua rute: menangkap URL yang tidak terdaftar
const notFound = (req, res) => {
    renderError(res, 404, 'Halaman yang Anda cari tidak ada atau sudah dipindahkan.');
};

const errorHandler = (err, req, res, next) => {
    console.error('[ERROR ' + req.method + ' ' + req.originalUrl + ']:', err);

    if (res.headersSent) return next(err);

    const status = err.status || 500;
    const pesan = status === 500
        ? 'Terjadi masalah pada server. Silakan coba lagi beberapa saat lagi.'
        : err.message;

    // Detail teknis hanya tampil di luar mode produksi
    const detail = process.env.NODE_ENV === 'production' ? null : err.message;

    renderError(res, status, pesan, detail);
};

module.exports = { renderError, notFound, errorHandler };