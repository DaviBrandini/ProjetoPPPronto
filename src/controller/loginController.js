// Importa a configuração da conexão com o banco de dados
const connection = require('../config/db');

// Função assíncrona para realizar o login de um usuário
async function login(request, response) {
    // Obtém o email enviado na requisição
    const email = request.body.email;

    // Consulta SQL para selecionar o email e a senha do usuário
    const query = "SELECT id, email, password FROM users WHERE email = ?";

    // Executa a consulta SQL
    connection.query(query, email, (err, results) => {
        // Verifica se a consulta retornou algum resultado
        if(results.length > 0) {
            // Obtém a senha enviada na requisição
            const password = request.body.senha;
            // Obtém a senha armazenada no banco de dados
            const passwordQuery = results[0].password;
            // Compara a senha enviada com a senha armazenada
            if (password == passwordQuery) {
                // Se as senhas coincidirem, responde com sucesso
                response
                    .status(200)
                    .json({
                        success: true,
                        message: "Sucesso",
                        data: results
                    });
            } else {
                // Se as senhas não coincidirem, responde com erro de senha incorreta
                response
                    .status(400)
                    .json({
                        success: false,
                        message: "Senha incorreta",
                        data: results
                    });
            }
        } else {
            // Se nenhum resultado for encontrado para o email, responde com erro de email não cadastrado
            response
                .status(400)
                .json({
                    success: false,
                    message: "Email Não Cadastrado!",
                    data: err
                });
        }
    });
}

// Exporta a função de login para que possa ser utilizada em outros módulos
module.exports = {
    login
};
