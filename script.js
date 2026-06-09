const startLat = -32.950;
const startLng = -60.650;
const startZoom = 10;

const map = L.map('map', { zoomControl: false }).setView([startLat, startLng], startZoom);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 18
}).addTo(map);

const cientinaIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div class='pin-cientina'></div>",
    iconSize: [30, 42],
    iconAnchor: [15, 42]
});

const projects = [
    { id: 'guardianes', name: 'Guardianes del Paraná', lat: -32.836065, lng: -60.687191, panelId: 'panel-guardianes' },
    { id: 'voz24', name: 'La Voz del Río (2024)', lat: -32.897519, lng: -60.669781, panelId: 'panel-voz24' },
    { id: 'voz25', name: 'La Voz del Río (2025)', lat: -32.873958, lng: -60.687878, panelId: 'panel-voz25' },
    { id: 'pedalea', name: 'Pedalea ConCiencia', lat: -32.911180, lng: -60.674196, panelId: 'panel-pedalea' },
    { id: 'hackaton', name: 'Hackatón Ambiental', lat: -33.118973, lng: -60.536952, panelId: 'panel-hackaton' }
];

const sidebarList = document.getElementById('sidebar-list');

projects.forEach(proj => {
    const marker = L.marker([proj.lat, proj.lng], {icon: cientinaIcon}).addTo(map);
    
    marker.bindTooltip(proj.name, {
        permanent: true,
        direction: 'top',
        offset: [0, -50], // Aumentado para elevar el título respecto al pin
        interactive: true, // Permite que el texto sea clickeable
        className: 'cientina-tooltip'
    });

    const btn = document.createElement('button');
    btn.className = 'sidebar-btn';
    btn.textContent = proj.name;
    btn.id = `btn-sidebar-${proj.id}`;
    btn.onclick = () => activateProject(proj);
    sidebarList.appendChild(btn);

    // El evento click se aplica tanto al marcador como al tooltip interactivo
    marker.on('click', () => activateProject(proj));
});

function activateProject(proj) {
    closePanels();
    
    document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
    const sidebarBtn = document.getElementById(`btn-sidebar-${proj.id}`);
    if (sidebarBtn) sidebarBtn.classList.add('active');

    const targetZoom = window.innerWidth <= 768 ? 13 : 14;

    map.flyTo([proj.lat, proj.lng], targetZoom, {
        duration: 1.5,
        easeLinearity: 0.25
    });

    setTimeout(() => {
        const panel = document.getElementById(proj.panelId);
        if (panel) panel.classList.add('active');
    }, 600);
}

function closePanels() {
    document.querySelectorAll('.panel-info').forEach(panel => {
        panel.classList.remove('active');
    });
}