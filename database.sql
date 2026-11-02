-- Membuat database dengan nama db_katalog_film jika belum ada, menggunakan karakter set utf8mb4 dan collation utf8mb4_unicode_ci.
CREATE DATABASE IF NOT EXISTS db_katalog_film
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

    CREATE TABLE film (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    judul        VARCHAR(150) NOT NULL,
    sutradara    VARCHAR(100) NOT NULL,
    genre        ENUM('Action', 'Drama', 'Romance', 'Science Fiction', 'Animation') NOT NULL,
    tahun_rilis  INT NOT NULL,
    rating       DECIMAL(3,1) NOT NULL,
    sinopsis     TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO tb_film (judul, sutradara, genre, tahun_rilis, rating, sinopsis) VALUES
('Breaking Bad', 'Vince Gilligan', 'Action', 2009, 9.5,
 'Guru kimia pengidap kanker, Walter White, terjun ke bisnis narkoba bersama mantan muridnya demi menjamin masa depan keluarga, tetapi justru terjerumus dalam dunia kriminal.'),
('A Man Called Otto', 'Tomas Alfredson', 'Drama', 2022, 6.5,
 'Otto, seorang pria tua yang hidup dalam kesepian setelah kehilangan istrinya, mulai menemukan kembali arti kehidupan dan kebahagiaan melalui hubungan tak terduga dengan tetangga barunya.'),
('Spider-Man: Into the Spider-Verse', 'Bob Persichetti, Peter Ramsey, Rodney Rothman', 'Animation', 2018, 8.4,
 'Seorang remaja bernama Miles Morales menjadi Spider-Man dan harus menghadapi tantangan di dunia superhero yang penuh dengan ancaman.'),
('Ada Apa dengan Cinta?', 'Rudy Soedjarwo', 'Drama', 2002, 7.0,
 'Kisah cinta dua remaja SMA yang dipertemukan oleh kecintaan mereka pada puisi dan sastra.'),
('Interstellar', 'Christopher Nolan', 'Science Fiction', 2014, 8.7,
 'Bumi mulai tak layak huni, sehingga sekelompok astronot menembus lubang cacing untuk mencari planet baru. Perjalanan itu mempertaruhkan waktu, harapan, dan hubungan antara ayah dan putrinya.');

 ALTER TABLE tb_film AUTO_INCREMENT = 6;