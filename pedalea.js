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
        threshold: 0.6
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
});