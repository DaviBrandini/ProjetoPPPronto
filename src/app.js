// Importa o pacote express, que é utilizado para criar o servidor e gerenciar rotas
const express = require('express');
// Importa o pacote cors, que lida com políticas de Cross-Origin Resource Sharing (CORS)
const cors = require('cors');
// Importa o pacote dotenv para gerenciar variáveis de ambiente a partir do arquivo .env
const dotenv = require('dotenv').config();
// Importa o módulo path para manipulação de caminhos de arquivos e diretórios
const path = require('path');
// Importa o módulo fs para manipulação de sistemas de arquivos (não utilizado neste trecho, mas pode ser útil para operações de I/O)
// Importa o pacote express-fileupload para lidar com uploads de arquivos
const fileUpload = require('express-fileupload');

// Importa os roteadores definidos para gerenciar usuários, login e tarefas
const usersRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const taskRouter = require('./routes/taskRouter');

// Instancia o aplicativo Express na variável app
const app = express();

// Define a porta do servidor. Usa o valor da variável de ambiente PORT se estiver definida ou assume a porta 3000
app.set('port', process.env.PORT || 3000);

// Middleware para parsear o corpo das requisições como JSON
app.use(express.json());
// Middleware para habilitar CORS (Cross-Origin Resource Sharing) para todas as rotas
app.use(cors());
// Middleware para permitir o upload de arquivos
app.use(fileUpload());

// Serve arquivos estáticos (como imagens, documentos) a partir do diretório 'uploads'
// A URL '/uploads' será mapeada para o diretório 'uploads' na raiz do projeto
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

// Configura as rotas baseadas nos roteadores importados
// Todas as rotas que começam com '/api' serão gerenciadas pelos roteadores
app.use('/api', usersRouter); // Rotas relacionadas a usuários
app.use('/api', loginRouter); // Rotas relacionadas ao login
app.use('/api', taskRouter);  // Rotas relacionadas a tarefas

// Exporta o aplicativo Express para ser utilizado em outros módulos, como em um arquivo de inicialização do servidor
module.exports = app;