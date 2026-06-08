// Configuración inicial de coordenadas y nivel de zoom
const startLat = -32.950;
const startLng = -60.650;
const startZoom = 10;

// Inicialización del motor cartográfico Leaflet
const map = L.map('map', { zoomControl: false }).setView([startLat, startLng], startZoom);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 18
}).addTo(map);

// Diseño del marcador personalizado
const cientinaIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div class='pin-cientina'></div>",
    iconSize: [30, 42],
    iconAnchor: [15, 42]
});

// Nomenclatura exacta y coordenadas actualizadas
const projects = [
    { id: 'guardianes', name: 'Guardianes del Paraná', lat: -32.836134, lng: -60.687882, panelId: 'panel-guardianes' },
    { id: 'voz24', name: 'La Voz del Río (2024)', lat: -32.897519, lng: -60.669781, panelId: 'panel-voz' },
    { id: 'voz25', name: 'La Voz del Río (2025)', lat: -32.873958, lng: -60.687878, panelId: 'panel-voz' },
    { id: 'pedalea', name: 'Pedalea ConCiencia', lat: -32.911180, lng: -60.674196, panelId: 'panel-pedalea' },
    { id: 'hackaton', name: 'Hackatón Ambiental', lat: -33.118973, lng: -60.536952, panelId: 'panel-hackaton' }
];

const sidebarList = document.getElementById('sidebar-list');

// Generación de pines cartográficos y botones de menú lateral
projects.forEach(proj => {
    const marker = L.marker([proj.lat, proj.lng], {icon: cientinaIcon}).addTo(map);
    
    marker.bindTooltip(proj.name, {
        permanent: true,
        direction: 'top',
        offset: [0, -35], 
        className: 'cientina-tooltip'
    });

    const btn = document.createElement('button');
    btn.className = 'sidebar-btn';
    btn.textContent = proj.name;
    btn.id = `btn-sidebar-${proj.id}`;
    btn.onclick = () => activateProject(proj);
    sidebarList.appendChild(btn);

    marker.on('click', () => activateProject(proj));
});

// Función de activación: centrado de cámara y despliegue del panel correspondiente
function activateProject(proj) {
    closePanels();
    
    document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-sidebar-${proj.id}`).classList.add('active');

    // Nivel de zoom adaptativo según el dispositivo
    const targetZoom = window.innerWidth <= 768 ? 13 : 14;

    // Vuelo con centrado exacto
    map.flyTo([proj.lat, proj.lng], targetZoom, {
        duration: 1.5,
        easeLinearity: 0.25
    });

    setTimeout(() => {
        document.getElementById(proj.panelId).classList.add('active');
    }, 600);
}

// Ocultamiento general de paneles
function closePanels() {
    document.querySelectorAll('.panel-info').forEach(panel => {
        panel.classList.remove('active');
    });
}

// Retorno a la visualización territorial completa
function resetMap() {
    closePanels();
    document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
    map.flyTo([startLat, startLng], startZoom, { duration: 1.5 });
}