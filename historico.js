// Função executada automaticamente quando a página carrega
window.onload = async function () { 
  
    // Recupera o ID do usuário do localStorage para ser usado na requisição
    let id_user = localStorage.getItem("id_user");
    
    // Faz uma requisição GET ao servidor para obter o histórico de um usuário específico com base no id_user
    const response = await fetch(`http://localhost:3000/api/get/historico/${id_user}`, {
        method: "GET"
    });
 
    // Converte a resposta do servidor para o formato JSON
    let content = await response.json();
    console.log(content); // Exibe o conteúdo da resposta no console para fins de depuração
 
    // Exibe uma mensagem de acordo com o valor de 'success' na resposta JSON
    if (content.success) {
        alert("Sucesso"); // Se a resposta for positiva, exibe "Sucesso"
    } else {
        alert('Não'); // Se a resposta for negativa, exibe "Não"
    }

    // Seleciona o elemento HTML onde o histórico de pesquisa será exibido
    const historyList = document.getElementById('search-history-list');

    // Itera sobre cada item do histórico de pesquisas contido em content.data
    content.data.forEach(element => {
        
        // Cria um novo item de lista para cada item do histórico
        const listItem = document.createElement('li');
        
        // Converte a data de criação para um objeto Date e exibe a data em formato ISO no console
        let data = new Date(element.created_at);
        console.log(data.toISOString());
        
        // Define o conteúdo do item de lista com o título e a data de criação do histórico
        listItem.textContent = `${element.title} - ${data}`;
        
        // Adiciona o item de lista ao elemento HTML para exibição
        historyList.appendChild(listItem);
    });
}

