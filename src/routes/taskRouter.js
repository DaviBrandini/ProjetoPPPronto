// Importa o módulo Router do Express para criar um roteador
const { Router } = require('express');
// Cria um novo roteador Express
const router = Router();
 
// Importa a função 'storeTask' do módulo 'taskController'
const { storeTask } = require('../controller/taskController');
 
// Define uma rota POST para o endpoint '/store/task'
// Quando uma requisição POST for feita para '/store/task', a função 'storeTask' será chamada
router.post('/store/task', storeTask);
 
// Exporta o roteador para que possa ser utilizado em outros módulos
module.exports = router;
 
// Define a rota POST
/**
 * @swagger
 * /tasks/list:
 *   get:
 *     summary: Retorna todas as tarefas
 *     responses:
 *       200:
 *         description: Uma lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/tasks/list', listTasks);
 
// Define o GET
/**
 * @swagger
 * /tasks/register:
 *   post:
 *     summary: Cadastra uma nova tarefa
 *     responses:
 *       201:
 *         description: Sucesso!
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.post('/tasks/register', storeTask);
 
/**
 * @swagger
 * /task/:id:
 *   put:
 *     summary: Atualiza uma tarefa pelo id
 *     responses:
 *       200:
 *         description: Uma lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.put('/task/:id', updateTask);
 
/**
 * @swagger
 * /task/delete:
 *   delete:
 *     summary: Remove uma tarefa pelo id
 *     responses:
 *       200:
 *         description: Uma lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.delete('/task/:id', deleteTask);
 
module.exports = router;