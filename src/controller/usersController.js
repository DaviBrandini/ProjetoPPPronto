// Importa a configuração da conexão com o banco de dados
const connection = require('../config/db');

// Função assíncrona para armazenar um novo usuário no banco de dados
async function storeUser(request, response) {
    // Recupera os dados do formulário enviados na requisição
    // 'nome', 'email', e 'senha' são esperados no corpo da requisição
    const params = [
        request.body.nome,
        request.body.email,
        request.body.senha
    ];
   
    // Comando SQL para inserir um novo usuário na tabela 'users'
    // Os valores serão substituídos pelos parâmetros fornecidos
    const query = "INSERT INTO users(name, email, password) VALUES(?, ?, ?)";

    // Executa a consulta SQL
    connection.query(query, params, (err, results) => {
        // Exibe erros e resultados no console para depuração
        console.log(err, results);
        
        // Verifica se a consulta foi bem-sucedida
        if (results) {
            // Se a inserção foi realizada com sucesso, responde com status 200 e mensagem de sucesso
            response
                .status(200)
                .json({
                    success: true,
                    message: "Cadastro Realizado Com Sucesso!",
                    data: results // Inclui os resultados da inserção na resposta
                });
        } else {
            // Se ocorreu um erro durante a inserção, responde com status 400 e mensagem de erro
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem sucesso!",
                    data: err // Inclui o erro na resposta para depuração
                });
        }
    });
}

// Exporta a função storeUser para que possa ser utilizada em outros módulos
module.exports = {
    storeUser
};