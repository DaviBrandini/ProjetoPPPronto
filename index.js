// Variáveis globais para o mapa, geocoder e array de marcadores
let map;
let geocoder;
let markers = []; // Armazena os marcadores no mapa

// Função para inicializar o mapa do Google Maps
function initMap() {
    // Define as coordenadas de Porto Alegre como ponto inicial
    const portoAlegre = { lat: -30.0346, lng: -51.2177 };

    // Inicializa o mapa centrado em Porto Alegre
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: portoAlegre,
    });

    // Inicializa o Geocoder
    geocoder = new google.maps.Geocoder();
}

// Função para geocodificar o endereço pesquisado e mover o mapa
function geocodeAddress() {
    // Obtém o valor do campo de entrada com o ID "title"
    const address = document.getElementById("title").value;

    // Faz a geocodificação do endereço
    geocoder.geocode({ address: address }, function(results, status) {
        if (status === 'OK') {
            // Centraliza o mapa no resultado da geocodificação (primeiro resultado)
            map.setCenter(results[0].geometry.location);

            // Adiciona um marcador no local geocodificado
            const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
            });

            // Armazena o marcador no array de marcadores
            markers.push(marker);

            // Atualiza a mensagem para exibir o endereço completo
            document.getElementById('messages').innerText = `Endereço encontrado: ${results[0].formatted_address}`;

            // Cria o conteúdo estilizado do InfoWindow
            const infoWindowContent = `
                <div style="font-family: Arial, sans-serif; color: #333; padding: 10px;">
                    <h4 style="margin: 0; font-size: 16px; color: #007BFF;">Coordenadas Encontradas</h4>
                    <p style="margin: 5px 0 0; font-size: 14px;">
                        <strong>Latitude:</strong> ${results[0].geometry.location.lat()}<br>
                        <strong>Longitude:</strong> ${results[0].geometry.location.lng()}
                    </p>
                    <div style="margin-top: 10px;">
                        <img src="https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png" style="vertical-align: middle; width: 20px; height: 20px;">
                        <span style="font-size: 12px; color: #777;">Clique no marcador para ver mais detalhes.</span>
                    </div>
                </div>
            `;

            // Adiciona um InfoWindow que exibe a latitude e longitude estilizadas quando o marcador for clicado
            const infoWindow = new google.maps.InfoWindow({
                content: infoWindowContent,
            });

            // Evento de clique no marcador para abrir o InfoWindow
            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
        } else {
            // Exibe uma mensagem de erro caso o endereço não seja encontrado
            alert('Geocodificação falhou: ' + status);
        }
    });
}

// Expondo a função initMap globalmente para que o Google Maps possa chamá-la
window.initMap = initMap;

// Adiciona um evento de clique ao botão de envio
document.getElementById('handleSubmit').addEventListener('click', function(event) {
    // Previne o comportamento padrão do botão
    event.preventDefault();
    
    // Chama a função para geocodificar o endereço e mover o mapa
    geocodeAddress();
});

// Função para alternar a visibilidade da sidebar
function toggleSidebar() {
    // Obtém o elemento com o ID "sidebar"
    const sidebar = document.getElementById('sidebar');
    // Alterna a classe 'open' na sidebar para mostrar ou esconder a sidebar
    sidebar.classList.toggle('open');
}

// Adiciona um evento de clique ao botão de logout
document.getElementById('logout-button').addEventListener('click', function() {
    // Remover dados do usuário do armazenamento local/session
    localStorage.removeItem('user'); // Caso esteja armazenando dados de login no localStorage
    sessionStorage.removeItem('user'); // Ou sessionStorage

    // Redirecionar para a página de login
    window.location.href = 'login.html';
});
