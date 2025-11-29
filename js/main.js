// ============================================
// WinDoctorIA - Technical Documentation JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // === SMOOTH SCROLLING ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === SCROLL SPY (Active Navigation) ===
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    const sections = document.querySelectorAll('.doc-section');

    function updateActiveNav() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // === EXPORT TO PDF FUNCTIONALITY ===
    window.exportToPDF = function () {
        alert('Funcionalidad de exportación a PDF:\n\n' +
            '1. Usa Ctrl+P o el botón "Imprimir"\n' +
            '2. Selecciona "Guardar como PDF" como destino\n' +
            '3. Ajusta las opciones de impresión según necesites\n\n' +
            'La documentación está optimizada para impresión.');
    };

    // === PRINT OPTIMIZATION ===
    window.addEventListener('beforeprint', function () {
        // Expand all collapsed sections before printing
        console.log('Preparando documento para impresión...');
    });

    window.addEventListener('afterprint', function () {
        console.log('Impresión completada');
    });

    // === BACK TO TOP BUTTON ===
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-blue);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    `;

    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // === HIGHLIGHT CODE BLOCKS ===
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }

    // === INITIALIZE CHARTS (if Chart.js is loaded) ===
    if (typeof Chart !== 'undefined') {
        initializeCharts();
    }

    // === TABLE OF CONTENTS COLLAPSE (Mobile) ===
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && window.innerWidth < 768) {
        const toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i> Índice';
        toggleBtn.className = 'btn btn-sm btn-outline-primary mb-3 w-100';
        toggleBtn.onclick = function () {
            sidebar.classList.toggle('show');
        };
        sidebar.insertBefore(toggleBtn, sidebar.firstChild);
    }

    // === CONSOLE INFO ===
    console.log('%cWinDoctorIA - Documentación Técnica', 'font-size: 18px; font-weight: bold; color: #2563eb;');
    console.log('%cVersión 1.0.0 | Noviembre 2025', 'font-size: 12px; color: #64748b;');

});

// === INITIALIZE CHARTS FUNCTION ===
function initializeCharts() {
    // Performance Chart (if canvas exists)
    const perfCanvas = document.getElementById('performanceChart');
    if (perfCanvas) {
        new Chart(perfCanvas, {
            type: 'bar',
            data: {
                labels: ['Limpieza Temporales', 'Liberación RAM', 'Optimización Disco'],
                datasets: [{
                    label: 'Éxito (%)',
                    data: [100, 100, 100],
                    backgroundColor: 'rgba(37, 99, 235, 0.8)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    // Time Comparison Chart
    const timeCanvas = document.getElementById('timeComparisonChart');
    if (timeCanvas) {
        new Chart(timeCanvas, {
            type: 'line',
            data: {
                labels: ['Manual', 'WinDoctorIA'],
                datasets: [{
                    label: 'Tiempo (minutos)',
                    data: [45, 2],
                    backgroundColor: 'rgba(5, 150, 105, 0.2)',
                    borderColor: 'rgba(5, 150, 105, 1)',
                    borderWidth: 3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// === UTILITY FUNCTIONS ===
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// === SEARCH FUNCTIONALITY (Optional Enhancement) ===
function searchDocumentation(query) {
    const sections = document.querySelectorAll('.doc-section');
    const results = [];

    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            results.push({
                id: section.id,
                title: section.querySelector('.section-title')?.textContent || 'Sin título'
            });
        }
    });

    return results;
}
