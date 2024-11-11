// Seleciona o botão que permite visualizar a senha
let btn = document.querySelector('#verSenha')

// Seleciona o campo de nome, seu rótulo e define uma variável para controlar a validade
let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

// Seleciona o campo de e-mail, seu rótulo e define uma variável para controlar a validade
let email = document.querySelector('#email')
let labelEmail = document.querySelector('#labelEmail')
let validEmail = false

// Seleciona o campo de senha, seu rótulo e define uma variável para controlar a validade
let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

// Seleciona os elementos para exibir mensagens de erro e sucesso
let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

// Valida o campo de nome conforme o usuário digita
nome.addEventListener('keyup', () => {
  if (nome.value.length <= 2) {
    // Se o nome tiver 2 ou menos caracteres, exibe uma mensagem de erro
    labelNome.setAttribute('style', 'color: red')
    labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres'
    nome.setAttribute('style', 'border-color: red')
    validNome = false
  } else {
    // Se o nome tiver mais de 2 caracteres, exibe uma mensagem de sucesso
    labelNome.setAttribute('style', 'color: green')
    labelNome.innerHTML = 'Nome'
    nome.setAttribute('style', 'border-color: green')
    validNome = true
  }
})

// Valida o campo de e-mail conforme o usuário digita
email.addEventListener('keyup', () => {
  if (email.value.length <= 4) {
    // Se o e-mail tiver 4 ou menos caracteres, exibe uma mensagem de erro
    labelEmail.setAttribute('style', 'color: red')
    labelEmail.innerHTML = 'Email *Insira no mínimo 5 caracteres'
    email.setAttribute('style', 'border-color: red')
    validEmail = false
  } else {
    // Se o e-mail tiver mais de 4 caracteres, exibe uma mensagem de sucesso
    labelEmail.setAttribute('style', 'color: green')
    labelEmail.innerHTML = 'Email'
    email.setAttribute('style', 'border-color: green')
    validEmail = true
  }
})

// Valida o campo de senha conforme o usuário digita
senha.addEventListener('keyup', () => {
  if (senha.value.length <= 5) {
    // Se a senha tiver 5 ou menos caracteres, exibe uma mensagem de erro
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false
  } else {
    // Se a senha tiver mais de 5 caracteres, exibe uma mensagem de sucesso
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha'
    senha.setAttribute('style', 'border-color: green')
    validSenha = true
  }
})

// Função para cadastrar um novo usuário
async function cadastrar() {
  if (validNome && validEmail && validSenha) {
    // Se todos os campos forem válidos, armazena os dados no localStorage

    // Envia os dados ao servidor
    let data = { nome: nome.value, email: email.value, senha: senha.value }
    const response = await fetch('http://localhost:3000/api/user/create', {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data)
    });

    let content = await response.json();

    if (content.success) {
      // Se o cadastro for bem-sucedido, mostra uma mensagem de sucesso e redireciona para a página de login
      alert('Cadastro realizado com sucesso')
      window.location.href = 'login.html';
    } else {
      // Se ocorrer um erro no cadastro, mostra uma mensagem de erro
      alert('Erro ao cadastrar')
    }

    // Atualiza as mensagens de sucesso e erro
    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Cadastrando email...</strong>'
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''
  } else {
    // Se algum campo não for válido, mostra uma mensagem de erro
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
}

// Adiciona um evento de clique ao botão de confirmação para chamar a função de cadastro
document.getElementById('btnConfirm').addEventListener('click', cadastrar)

// Adiciona um evento de clique ao botão de visualização de senha para alternar a visibilidade da senha
btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha')

  // Alterna entre mostrar e esconder a senha
  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})
