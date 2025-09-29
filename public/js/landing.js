document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // Navegación Móvil
    // =========================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('navbar-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
        });
    }

    // =========================
    // Carrusel "¿Sabías Qué?"
    // =========================
    const sabiasData = [
        {
            img: 'public/images/image1.jpg',
            text: 'La lengua de señas NO es universal. Cada país tiene la suya. En Colombia se usa la Lengua de Señas Colombiana (LSC).'
        },
        {
            img: 'public/images/image2.jpg',
            text: 'Se estima que en Colombia hay cerca de 500,000 personas con discapacidad auditiva, para quienes la LSC es su principal lengua.'
        },
        {
            img: 'public/images/image3.jpg',
            text: 'Aprender lengua de señas mejora la memoria, la coordinación y las habilidades de comunicación no verbal.'
        }
    ];

    let currentIndex = 0;
    const sabiasImg = document.getElementById('sabias-img');
    const sabiasText = document.getElementById('sabias-text');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (sabiasImg && sabiasText && prevBtn && nextBtn) {
        const updateCarousel = (index) => {
            sabiasImg.style.opacity = 0;
            sabiasText.style.opacity = 0;

            setTimeout(() => {
                sabiasImg.src = sabiasData[index].img;
                sabiasText.textContent = sabiasData[index].text;
                sabiasImg.style.opacity = 1;
                sabiasText.style.opacity = 1;
            }, 300);
        };

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : sabiasData.length - 1;
            updateCarousel(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < sabiasData.length - 1) ? currentIndex + 1 : 0;
            updateCarousel(currentIndex);
        });

        updateCarousel(0); // Carga inicial
    }

    // =========================
    // Cambio de Tema (Claro/Oscuro)
    // =========================
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>`;
        const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/><path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162h1.234a.217.217 0 0 1 .153.372l-.998.724.387 1.162a.217.217 0 0 1-.316.242l-.998-.724-.998.724a.217.217 0 0 1-.316-.242l.387-1.162-.998-.724a.217.217 0 0 1 .153-.372h1.234l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a.796.796 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a.796.796 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/></svg>`;

        const applyTheme = (theme) => {
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(theme);
            localStorage.setItem('tema_landing', theme);
            themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
        };

        // Inicializar con el tema guardado o por defecto claro
        const savedTheme = localStorage.getItem('tema_landing') || 'light';
        applyTheme(savedTheme);

        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // =========================
    // Animación de Scroll (Fade-In)
    // =========================
    const fadeInElements = document.querySelectorAll('.fade-in');
    if (fadeInElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeInElements.forEach(el => observer.observe(el));
    }

    // =========================
    // Año dinámico en footer
    // =========================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
