// Seleciona o botão de "Sign In" (Entrar) pelo seu ID
var btnSignin = document.querySelector("#signin");

// Seleciona o botão de "Sign Up" (Cadastrar) pelo seu ID
var btnSignup = document.querySelector("#signup");

// Seleciona o elemento <body> do documento
var body = document.querySelector("body");

// Adiciona um ouvinte de evento para o botão de "Sign In"
btnSignin.addEventListener("click", function () {
    // Altera a classe do elemento <body> para "sign-in-js" quando o botão de "Sign In" é clicado
    body.className = "sign-in-js";
});

// Adiciona um ouvinte de evento para o botão de "Sign Up"
btnSignup.addEventListener("click", function () {
    // Altera a classe do elemento <body> para "sign-up-js" quando o botão de "Sign Up" é clicado
    body.className = "sign-up-js";
});