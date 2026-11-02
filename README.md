# Tugas 3: Sistem Katalog Film

Aplikasi web katalog film berbasis Node.js, Express, EJS, dan MySQL. Dibangun dengan arsitektur MVC dan fitur CRUD lengkap.

| | |
|---|---|
| **Nama** | [Komang Bayu Trias Gautama] |
| **NIM** | [42530019] |
| **Kelas** | [Pemrograman Web] |

Link Youtube : https://youtu.be/n1c4_qczXwU

## Fitur
 
- **Create**: menambah film lewat formulir (POST dengan pola Post-Redirect-Get)
- **Read**: menampilkan daftar film dalam tabel
- **Update**: mengubah film lewat rute dinamis `/film/edit/:id`, formulir terisi data awal (pre-filled)
- **Delete**: menghapus film dengan dialog konfirmasi di sisi klien
- Validasi input di sisi server dan halaman error (400, 404, 500)

## Struktur Proyek
 
```
katalog-film/
├── app.js                          # Titik masuk aplikasi
├── package.json
├── .env                            # Konfigurasi lingkungan (tidak di-commit)
├── .env.example                    # Contoh konfigurasi lingkungan
├── .gitignore
├── database.sql                    # Contoh Database
├── README.md
│
├── config/
│   └── database.js                 # Connection Pool MySQL
│
├── models/
│   └── film.model.js               # Seluruh query SQL (prepared statements)
│
├── controllers/
│   └── film.controller.js          # Alur data & validasi
│
├── routes/
│   └── film.routes.js              # Definisi rute
│
├── middlewares/
│   └── error.middleware.js         # Penanganan error 404 & 500
│
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   └── pages/
│       ├── film-list.ejs           # Daftar film
│       ├── film-form-tambah.ejs    # Formulir tambah
│       ├── film-form-edit.ejs      # Formulir edit
│       └── error.ejs               # Halaman error
│
└── public/
    └── css/
        └── style.css
```

## Lisensi
 
Proyek ini dibuat untuk keperluan pembelajaran (praktikum Pemrograman Web).