window.onload = async function () { 
  
    let id_user = localStorage.getItem("id_user")
    
    const response = await fetch(`http://localhost:3000/api/get/historico/${id_user}`, {
        method: "GET"
    });
 
    // Recebe a resposta do servidor em formato JSON
    let content = await response.json();
    console.log (content)
 
    // Exibe uma mensagem de sucesso ou erro com base na resposta do servidor
    if (content.success) {
        alert("Sucesso");
    } else {
        alert('Não');
    }



       // Recupera o histórico de pesquisas do localStorage
      // const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

       const historyList = document.getElementById('search-history-list');

       content.data.forEach(element => {
            const listItem = document.createElement('li');
            let data = new Date(element.created_at);
            console.log(data.toISOString());
            
            listItem.textContent = `${element.title} - ${data}`;
            historyList.appendChild(listItem);

            
                // const noHistoryMessage = document.createElement('li');
                // noHistoryMessage.textContent = "Nenhuma pesquisa registrada ainda.";
                // historyList.appendChild(noHistoryMessage);
     
    
    


       });
      
} 

