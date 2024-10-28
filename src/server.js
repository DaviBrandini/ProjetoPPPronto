// Módulo de inicialização do servidor web onde nossa WebAPI estará hospedada
 
// Importa o arquivo app, que configura o servidor Express e suas rotas
const app = require('./app');
// Obtém a porta na qual o servidor deve escutar, conforme configurado no arquivo app
const port = app.get('port');
 
// Inicia o servidor Express e faz com que ele escute na porta especificada
app.listen(port, () => console.log(`Run on port ${port}!`));
// Quando o servidor estiver funcionando, uma mensagem será exibida no console indicando a porta em que o servidor está rodando
 
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
 
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API de Tarefas",
            version: "1.0.0",
            description: "API CRUD para gerenciar tarefas",
        },
        servers: [{ url: "http://localhost:3000" }],
    },
    apis: [`${__dirname}/routes/*.js`], // caminho para as rotas
};
 
 
const taskRouter = require('./routes/tasksRouter');
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(cors());
 
app.use('/api', taskRouter);
 
app.listen(port, () => console.log(`Run on port ${port}!`));