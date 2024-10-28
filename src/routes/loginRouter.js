// Importa o módulo Express para criar um roteador
const express = require('express');
// Cria um novo roteador Express
const router = express.Router();

// Importa a função 'login' do módulo 'loginController'
const { login } = require("../controller/loginController");

// Define uma rota POST para o endpoint '/login'
// Quando uma requisição POST for feita para '/login', a função 'login' será chamada
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do usuário
 *     responses:
 *       201:
 *         description: Sucesso no login!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.post('/login', login);

// Exporta o roteador para que possa ser utilizado em outros módulos
module.exports = router;