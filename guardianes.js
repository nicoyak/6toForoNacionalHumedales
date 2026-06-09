document.addEventListener("DOMContentLoaded", function() {
    // 1. Lógica del menú hamburguesa
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 2. Lógica del Observer para el zoom y resaltado de la línea de tiempo
    const timelineSteps = document.querySelectorAll('.timeline-step');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    timelineSteps.forEach(step => {
        timelineObserver.observe(step);
    });

    // 3. Lógica del Lightbox (Pantalla completa para fotos y gráficos)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    // Visor para las imágenes de la galería (sin texto)
    document.querySelectorAll('.polaroid').forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightboxCaption.textContent = ''; 
            lightbox.classList.add('active');
        });
    });

    // Visor para los gráficos de resultados (hereda el título <h4>)
    document.querySelectorAll('.chart-box img').forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            // Busca el elemento <h4> hermano anterior para capturar el título
            const title = this.previousElementSibling.textContent;
            lightboxCaption.textContent = title;
            lightbox.classList.add('active');
        });
    });

    // Cerrar el visor al hacer clic en la "X"
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Cerrar el visor al hacer clic en el fondo oscuro
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            lightbox.classList.remove('active');
        }
    });
});