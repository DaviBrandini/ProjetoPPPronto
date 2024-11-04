// Importa a configuração da conexão com o banco de dados
const connection = require('../config/db');
// Carrega as variáveis de ambiente do arquivo .env
const dotenv = require('dotenv').config();

// Função assíncrona para armazenar uma nova tarefa no banco de dados
async function storeHistorico(request, response) {
    // Coleta os parâmetros da requisição
    // 'title' e 'description' são esperados no corpo da requisição
    const params = [
        request.body.title,
        request.body.description,
        request.body.id_user
    ];

    console.log(request.body.id_user)

    // Consulta SQL para inserir uma nova tarefa na tabela 'tasks'
    const query = "INSERT INTO historico(title, description, id_user) VALUES(?, ?, ?)";

    // Executa a consulta SQL
    connection.query(query, params, (err, results) => {
        // Verifica se a consulta foi bem-sucedida
        if (results) {
            // Se a tarefa foi inserida com sucesso, responde com status 201 e mensagem de sucesso
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso!",
                    data: results
                });
        } else {
            // Se ocorreu um erro durante a inserção, responde com status 400 e mensagem de erro
            response
                .status(400)
                .json({
                    success: false,
                    message: "Ops, deu problema!",
                    sql: err // Inclui o erro SQL na resposta para depuração
                });
        }
    });
}

async function getHistorico(request, response) {
    // Coleta os parâmetros da requisição
    // 'title' e 'description' são esperados no corpo da requisição
    const params = [
        request.params.id_user,
    ];

    // Consulta SQL para inserir uma nova tarefa na tabela 'tasks'
    const query = "SELECT * FROM historico WHERE id_user = ?"

    // Executa a consulta SQL
    connection.query(query, params, (err, results) => {
        // Verifica se a consulta foi bem-sucedida
        if (results) {
            // Se a tarefa foi inserida com sucesso, responde com status 201 e mensagem de sucesso
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso!",
                    data: results
                });
        } else {
            // Se ocorreu um erro durante a inserção, responde com status 400 e mensagem de erro
            response
                .status(400)
                .json({
                    success: false,
                    message: "Ops, deu problema!",
                    sql: err // Inclui o erro SQL na resposta para depuração
                });
        }
    });
}


// Exporta a função storeTask para que possa ser utilizada em outros módulos
module.exports = {
    storeHistorico,
    getHistorico
};

