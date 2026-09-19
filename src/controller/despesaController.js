import express from 'express';
import db from '../connection.js'; 
const router = express.Router();

router.delete('/api/despesas', async (req, res) => {
    const email = req.query.email;
    try {
        if (!email) {
            return res.status(400).json({ erro: "E-mail não fornecido" });
        }

        const comando = 'DELETE FROM despesas WHERE email = ?';
        
        await new Promise((resolve, reject) => {
            db.query(comando, [email], (err, resultado) => {
                if (err) reject(err);
                else resolve(resultado);
            });
        });

        return res.status(200).json({ mensagem: "Despesas apagadas com sucesso do banco de dados" });
    } catch (erro) {
        console.error("ERRO NO DELETE DE DESPESAS:", erro.message);
        return res.status(500).json({ erro: erro.message });
    }
});

export default router;