import { Router } from "express";
import db from "../repository/connection.js";

const endpoints = Router();

// Rota GET para buscar os dados da conta
endpoints.get('/api/conta', async (req, resp) => {
    try {
        const query = 'SELECT nome, email, telefone, data_membro AS dataMembro, plano, data_renovacao AS dataRenovacao, foto_url AS fotoUrl FROM utilizadores LIMIT 1';
        const [linhas] = await db.query(query);

        if (linhas.length === 0) {
            resp.status(404).send({ erro: "Utilizador não encontrado" });
            return;
        }

        resp.send(linhas[0]);
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});

// Rota POST para registar um novo utilizador
endpoints.post('/api/conta', async (req, resp) => {
    try {
        const { nome, email, telefone, dataMembro, plano, dataRenovacao, fotoUrl } = req.body;

        const query = `
            INSERT INTO utilizadores (nome, email, telefone, data_membro, plano, data_renovacao, foto_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [resultado] = await db.query(query, [
            nome, 
            email, 
            telefone, 
            dataMembro, 
            plano, 
            dataRenovacao, 
            fotoUrl
        ]);

        resp.status(201).send({
            mensagem: "Utilizador cadastrado com sucesso!",
            id: resultado.insertId
        });
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});

export default endpoints;