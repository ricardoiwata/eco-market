// authMiddleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ecomarket'; // Use a mesma chave secreta que você usa para assinar os tokens

// Middleware para verificar se o usuário é um administrador
const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Acesso negado: Nenhum token fornecido.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }

        // Verifica se o usuário tem a função de admin
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Acesso negado: Você não é um administrador.' });
        }

        req.user = user; // Salva as informações do usuário no objeto req para uso posterior
        next(); // Chama o próximo middleware ou rota
    });
};

module.exports = verifyAdmin;