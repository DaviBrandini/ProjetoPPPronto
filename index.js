// Função para inicializar o mapa do Google Maps
function initMap() {
    // Define as coordenadas de Porto Alegre
    const portoAlegre = { lat: -30.0346, lng: -51.2177 };

    // Cria um novo mapa com o centro em Porto Alegre e nível de zoom 12
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: portoAlegre,
    });

    // Adiciona um marcador no centro de Porto Alegre
    const marker = new google.maps.Marker({
        position: portoAlegre,
        map: map,
    });
}

// Expondo a função initMap globalmente para que o Google Maps possa chamá-la
window.initMap = initMap;

// Obtém o botão de envio por seu ID
let button = document.getElementById("handleSubmit");

// Adiciona um evento de clique ao botão
button.onclick = async function() {
    // Obtém o valor do campo de entrada com o ID "title"
    let title = document.getElementById("title").value;

    // Cria um objeto com o valor do título
    let data = { title };

    // Envia uma solicitação POST para o servidor para armazenar a tarefa
    const response = await fetch('http://localhost:3000/api/store/task', {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    });

    // Recebe a resposta do servidor em formato JSON
    let content = await response.json();

    // Exibe uma mensagem de sucesso ou erro com base na resposta do servidor
    if (content.success) {
        alert("Sucesso");
    } else {
        alert('Não');
    }
}

// Função para inicializar o mapa com pontos turísticos
function initMap() {
    // Inicializa o mapa com nível de zoom 13 e centro em Porto Alegre
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: -30.0346, lng: -51.2177 }
    });

    // Define uma lista de pontos turísticos com suas coordenadas e títulos
    const spots = [
        { position: { lat: -30.0366, lng: -51.2177 }, title: 'Parque Farroupilha (Redenção)' },
        { position: { lat: -30.0277, lng: -51.2287 }, title: 'Mercado Público de Porto Alegre' },
        { position: { lat: -30.0343, lng: -51.2428 }, title: 'Usina do Gasômetro' },
        { position: { lat: -30.0561, lng: -51.1763 }, title: 'Jardim Botânico de Porto Alegre' }
    ];

    // Adiciona um marcador para cada ponto turístico
    spots.forEach(spot => {
        const marker = new google.maps.Marker({
            position: spot.position,
            map: map,
            title: spot.title
        });

        // Cria uma janela de informação com um botão para mostrar mais informações
        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${spot.title}</h3><p><button onclick="showMoreInfo('${spot.title.toLowerCase().replace(/ /g, '-')})">Mais informações</button></p>`
        });

        // Adiciona um evento de clique ao marcador para abrir a janela de informação
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Função para mostrar mais informações sobre um ponto turístico
function showMoreInfo(spotId) {
    // Exibe um alerta com mais informações sobre o ponto turístico
    alert(`Mais informações sobre ${spotId.replace(/-/g, ' ')}`);
}

// Adiciona um evento de clique ao botão de envio
document.getElementById('handleSubmit').addEventListener('click', function(event) {
    // Previne o comportamento padrão do formulário
    event.preventDefault();
    // Obtém o valor do campo de entrada com o ID "title"
    const address = document.getElementById('title').value;
    // Atualiza o conteúdo do elemento com o ID "messages" para mostrar o endereço enviado
    document.getElementById('messages').innerText = `Endereço enviado: ${address}`;
});

// Função para alternar a visibilidade da sidebar
function toggleSidebar() {
    // Obtém o elemento com o ID "sidebar"
    const sidebar = document.getElementById('sidebar');
    // Alterna a classe 'open' na sidebar para mostrar ou esconder a sidebar
    sidebar.classList.toggle('open');
}
