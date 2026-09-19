create database feira4;
use feira4;
CREATE TABLE utilizadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(50),
    data_membro VARCHAR(100),
    plano VARCHAR(100),
    data_renovacao VARCHAR(100),
    foto_url TEXT
);
select * from utilizadores;

