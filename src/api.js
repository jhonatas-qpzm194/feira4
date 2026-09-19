import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL com sucesso!');
});

app.post('/api/conta', (req, res) => {
    const { nome, email, telefone, dataMembro, plano, dataRenovacao, fotoUrl } = req.body;
    const query = 'INSERT INTO utilizadores (nome, email, telefone, data_membro, plano, data_renovacao, foto_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [nome, email, telefone, dataMembro, plano, dataRenovacao, fotoUrl], (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).send({ message: 'Salvo com sucesso!' });
    });
});

app.get('/api/conta', (req, res) => {
    const query = 'SELECT * FROM utilizadores';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(results);
    });
});

app.get('/api/transacoes', (req, res) => {
    const query = 'SELECT id, nome AS descricao, plano AS categoria, telefone AS valor, data_membro AS data FROM utilizadores';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(results);
    });
});

const PORT = process.env.PORT || 50100;
app.listen(PORT, () => {
    console.log(`API subiu com sucesso na porta ${PORT}`);
});