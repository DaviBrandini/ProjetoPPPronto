// Seleciona o ícone de olho para mostrar/ocultar a senha
let btn = document.querySelector('.fa-eye');

// Adiciona um evento de clique ao ícone de olho
btn.addEventListener('click', () => {
  // Seleciona o campo de entrada de senha
  let inputSenha = document.querySelector('#senha');
  
  // Verifica o tipo atual do campo de senha e alterna entre 'password' e 'text'
  if (inputSenha.getAttribute('type') == 'password') {
    // Se o tipo for 'password', muda para 'text' para mostrar a senha
    inputSenha.setAttribute('type', 'text');
  } else {
    // Se o tipo for 'text', muda para 'password' para ocultar a senha
    inputSenha.setAttribute('type', 'password');
  }
});

// Função assíncrona para realizar o login
async function entrar() {
  // Obtém os valores dos campos de e-mail e senha
  let email = document.querySelector('#email').value;
  let senha = document.querySelector('#senha').value;
  
  // Cria um objeto com os dados de login
  let data = { email, senha };
  
  // Faz uma solicitação POST para o servidor de login
  const response = await fetch('http://localhost:3000/api/login', {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data) // Converte os dados para JSON
  });

  // Converte a resposta do servidor para JSON
  let content = await response.json();
  
  // Verifica se o login foi bem-sucedido
  if (content.success) {
    // Armazena o token de autenticação no localStorage
    localStorage.setItem('id_user', content.data[0].id);
   

    // Exibe uma mensagem de sucesso
    alert('Login realizado com sucesso');

    // Redireciona para a página principal
    window.location.href = 'inicio.html';
  } else {
    // Exibe uma mensagem de falha no login
    alert('Falha no login');
  }
}

