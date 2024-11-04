// Importa o módulo Router do Express para criar um roteador
const { Router } = require('express');
// Cria um novo roteador Express
const router = Router();
 
// Importa a função 'storeTask' do módulo 'taskController'
const { storeHistorico, getHistorico } = require('../controller/historicoController');
 
// Define uma rota POST para o endpoint '/store/task'
// Quando uma requisição POST for feita para '/store/task', a função 'storeTask' será chamada
router.post('/store/historico', storeHistorico);
router.get("/get/historico/:id_user", getHistorico)
 
// Exporta o roteador para que possa ser utilizado em outros módulos
module.exports = router;
