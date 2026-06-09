document.addEventListener("DOMContentLoaded", function() {
    // 1. Lógica del menú hamburguesa
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

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

    // 3. Lógica del Lightbox para galería
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    document.querySelectorAll('.polaroid').forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightbox.classList.add('active');
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                lightbox.classList.remove('active');
            }
        });
    }
});