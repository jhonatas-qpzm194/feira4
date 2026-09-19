import express from 'express';
import db from '../connection.js'; 
const router = express.Router();

router.delete('/api/receitas', async (req, res) => {
    const email = req.query.email;
    try {
        if (!email) {
            return res.status(400).json({ erro: "E-mail não fornecido" });
        }

        const comando = 'DELETE FROM receitas WHERE email = ?';
        
        await new Promise((resolve, reject) => {
            db.query(comando, [email], (err, resultado) => {
                if (err) reject(err);
                else resolve(resultado);
            });
        });

        return res.status(200).json({ mensagem: "Receitas apagadas com sucesso do banco de dados" });
    } catch (erro) {
        console.error("ERRO NO DELETE DE RECEITAS:", erro.message);
        return res.status(500).json({ erro: erro.message });
    }
});

export default router;