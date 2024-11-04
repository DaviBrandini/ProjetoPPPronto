// Variáveis globais para o mapa, geocoder e array de marcadores
let map;
let geocoder;
let markers = []; // Armazena os marcadores no mapa




// Array de pontos turísticos com nome, latitude e longitude
const pontosTuristicos = [
    {
        nome: "Parque Farroupilha (Redenção)",
        lat: -30.0423,
        lng: -51.2159,
        descricao: "Um dos maiores e mais conhecidos parques da cidade, ideal para passeios e atividades ao ar livre."
    },
    {
        nome: "Mercado Público de Porto Alegre",
        lat: -30.0277,
        lng: -51.2275,
        descricao: "Um centro de compras histórico, famoso por sua arquitetura e variedade de produtos."
    },
    {
        nome: "Usina do Gasômetro",
        lat: -30.0346,
        lng: -51.2413,
        descricao: "Um centro cultural localizado às margens do Guaíba, oferecendo uma bela vista do pôr do sol."
    },
    {
        nome: "Jardim Botânico de Porto Alegre",
        lat: -30.0561,
        lng: -51.1762,
        descricao: "Um belo jardim botânico com uma grande variedade de plantas e trilhas para caminhada."
    }
];

// Função para inicializar o mapa do Google Maps
function initMap() {
    const portoAlegre = { lat: -30.0346, lng: -51.2177 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: portoAlegre,
    });
    geocoder = new google.maps.Geocoder();
    addTouristSpots();
}

// Função para adicionar os pontos turísticos como pins no mapa
function addTouristSpots() {
    pontosTuristicos.forEach(ponto => {
        const marker = new google.maps.Marker({
            position: { lat: ponto.lat, lng: ponto.lng },
            map: map,
            title: ponto.nome,
        });
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <h4>${ponto.nome}</h4>
                <p>${ponto.descricao}</p>
                <p><b>Latitude:</b> ${ponto.lat}</p>
                <p><b>Longitude:</b> ${ponto.lng}</p>
            `,
        });
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
        markers.push(marker);
    });
}

// Função para geocodificar o endereço pesquisado e mover o mapa
function geocodeAddress() {
    const address = document.getElementById("title").value;
    geocoder.geocode({ address: address }, function(results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
            });
            markers.push(marker);
            document.getElementById('messages').innerText = `Endereço encontrado: ${results[0].formatted_address}`;
            const infoWindowContent = `
                <div style="font-family: Arial, sans-serif; color: #333; padding: 10px;">
                    <h4 style="margin: 0; font-size: 16px; color: #007BFF;">Coordenadas Encontradas</h4>
                    <p style="margin: 5px 0 0; font-size: 14px;">
                        <strong>Latitude:</strong> ${results[0].geometry.location.lat()}<br>
                        <strong>Longitude:</strong> ${results[0].geometry.location.lng()}
                    </p>
                </div>
            `;
            const infoWindow = new google.maps.InfoWindow({
                content: infoWindowContent,
            });
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });

            // Salva a pesquisa no histórico do usuário
            saveSearchHistory(address, results[0].geometry.location.lat(), results[0].geometry.location.lng());
        } else {
            alert('Geocodificação falhou: ' + status);
        }
    });
}

// Função para salvar o histórico de pesquisas no localStorage
function saveSearchHistory(address, lat, lng) {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const newEntry = {
        address,
        lat,
        lng,
        date: new Date().toLocaleString()
    };
    searchHistory.push(newEntry);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Função para carregar o histórico de pesquisas
function loadSearchHistory() {
    const historyContainer = document.getElementById('history-list');
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    if (searchHistory.length === 0) {
        historyContainer.innerHTML = "<p>Não há histórico de pesquisas.</p>";
        return;
    }

    const historyHTML = searchHistory.reverse().map(entry => `
        <li>
            <p><strong>Endereço:</strong> ${entry.address}</p>
            <p><strong>Latitude:</strong> ${entry.lat}</p>
            <p><strong>Longitude:</strong> ${entry.lng}</p>
            <p><strong>Data:</strong> ${entry.date}</p>
        </li>
    `).join('');

    historyContainer.innerHTML = `<ul>${historyHTML}</ul>`;
}

// Expondo a função initMap globalmente para que o Google Maps possa chamá-la
window.initMap = initMap;

// Adiciona um evento de clique ao botão de envio
document.getElementById('handleSubmit').addEventListener('click', function(event) {
    event.preventDefault();
    geocodeAddress();
});

// Função para alternar a visibilidade da sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Adiciona um evento de clique ao botão de logout
document.getElementById('logout-button').addEventListener('click', function() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    window.location.href = 'login.html';
});


let button = document.getElementById("handleSubmit");
button.onclick = async function() {
    // Obtém o valor do campo de entrada com o ID "title"
    let title = document.getElementById("title").value;
    let id_user = localStorage.getItem("id_user")

    // Cria um objeto com o valor do título
    let data = { title, id_user };
 
    // Envia uma solicitação POST para o servidor para armazenar a tarefa
    const response = await fetch('http://localhost:3000/api/store/historico', {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    });
 
    // Recebe a resposta do servidor em formato JSON
    let content = await response.json();
    //console.log (content)
 
    // Exibe uma mensagem de sucesso ou erro com base na resposta do servidor
    if (content.success) {
        alert("Sucesso");
    } else {
        alert('Não');
    }





}