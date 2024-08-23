// Módulo de inicialização do servidor web onde nossa WebAPI estará hospedada

// Importa o arquivo app, que configura o servidor Express e suas rotas
const app = require('./app');
// Obtém a porta na qual o servidor deve escutar, conforme configurado no arquivo app
const port = app.get('port');

// Inicia o servidor Express e faz com que ele escute na porta especificada
app.listen(port, () => console.log(`Run on port ${port}!`));
// Quando o servidor estiver funcionando, uma mensagem será exibida no console indicando a porta em que o servidor está rodando