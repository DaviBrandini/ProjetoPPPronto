// Importa o módulo mysql2 para interação com o banco de dados MySQL
const mysql = require('mysql2');
// Importa e carrega variáveis de ambiente do arquivo .env
const dotenv = require('dotenv').config();

// Cria uma conexão com o banco de dados MySQL usando as variáveis de ambiente
const connection = mysql.createConnection({
    // O endereço do servidor de banco de dados MySQL, obtido das variáveis de ambiente
    host: process.env.DB_HOST,
    // O nome de usuário para acessar o banco de dados, obtido das variáveis de ambiente
    user: process.env.DB_USER,
    // A senha para o usuário do banco de dados, obtida das variáveis de ambiente
    password: process.env.DB_PASSWORD,
    // O nome do banco de dados a ser utilizado, obtido das variáveis de ambiente
    database: process.env.DB_DATABASE
});

// Conecta ao banco de dados MySQL
connection.connect(function(err) {
    // Verifica se ocorreu um erro durante a conexão
    if(err) {
        // Se houve erro, lança uma exceção para interromper a execução
        throw err;
    } else {
        // Se a conexão foi bem-sucedida, exibe uma mensagem no console
        console.log("MySql conectado!");
    }
});

// Exporta a conexão para que possa ser utilizada em outros módulos
module.exports = connection;