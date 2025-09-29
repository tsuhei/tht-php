<?php
require_once __DIR__ . '/../../config/config.php';
$active = 'landing'; // Variable de control de navegación activa
?>
<!DOCTYPE html>
<html lang="es" data-theme-scope="landing">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
        content="Aprende Lengua de Señas Colombiana con The Hands Talk. Un proyecto para promover la inclusión y la accesibilidad.">
    <meta name="keywords" content="lengua de señas, LSC, inclusión, accesibilidad, aprender, Colombia">
    <meta name="author" content="The Hands Talk">

    <title>The Hands Talk - Aprendizaje de Lengua de Señas</title>

    <!-- Favicon -->
    <link rel="icon" href="<?= rtrim(BASE_URL, '/') ?>/images/IconoTHTazul.svg" type="image/x-icon">

    <!-- Tipografía -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
        rel="stylesheet">

    <!-- Estilos propios de landing -->
    <link rel="stylesheet" href="css/landing.css">

    <!-- Inicialización del tema (claro/oscuro exclusivo de landing) -->
    <script>
        (function () {
            try {
                if (document.documentElement.dataset.themeScope === 'landing') {
                    var tema = localStorage.getItem('tema_landing') || 'claro';
                    document.documentElement.classList.add(tema);
                }
            } catch (e) { }
        })();
    </script>
</head>

<body data-active="<?= $active ?>">

    <!-- Header y navegación principal -->
    <header class="header">
        <nav class="navbar">
            <div class="container">
                <a class="navbar-brand" href="<?= BASE_URL ?>">
                    <img src="<?= BASE_URL ?>images/IconoTHTazul.svg" alt="Logo The Hands Talk" width="30"
                        height="30">
                    The Hands Talk
                </a>

                <div class="navbar-menu" id="navbar-menu">
                    <ul class="navbar-links">
                        <li><a class="nav-link" href="#quienes-somos">Quiénes Somos</a></li>
                        <li><a class="nav-link" href="#objetivos">Objetivos</a></li>
                        <li><a class="nav-link" href="#alcance">Alcance</a></li>
                        <li><a class="nav-link" href="#sabias-que">¿Sabías Qué?</a></li>
                        <li><a class="nav-link" href="#contacto">Contacto</a></li>
                        <li class="nav-item-cta">
                            <a class="btn btn-primary-custom" href="<?= BASE_URL ?>auth/login">Iniciar Sesión</a>
                        </li>
                        <li class="nav-item-theme">
                            <button id="theme-toggle" class="btn theme-toggle-btn" aria-label="Cambiar tema"></button>
                        </li>
                    </ul>
                </div>

                <button class="nav-toggle" id="nav-toggle" aria-label="Abrir menú">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    </header>

    <!-- Contenido principal -->
    <main>
        <!-- Sección: ¿Quiénes somos? -->
        <section id="quienes-somos" class="section-padding">
            <div class="container content-card fade-in">
                <div class="grid-container">
                    <div class="grid-item text-center">
                        <img src="<?= BASE_URL ?>images/IconoTHTazul.svg"
                            alt="Logo grande de The Hands Talk" class="img-fluid logo-section">
                    </div>
                    <div class="grid-item">
                        <h2 class="section-title">¿Quiénes somos?</h2>
                        <p>
                            Somos <strong>THT (The Hands Talk)</strong>, un proyecto cuyo objetivo principal es promover
                            la accesibilidad y la inclusión en la sociedad colombiana. Buscamos desarrollar una
                            aplicación móvil innovadora para la enseñanza de la lengua de señas, rompiendo barreras de
                            comunicación.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sección: Objetivos -->
        <section id="objetivos" class="section-padding">
            <div class="container content-card fade-in">
                <h2 class="section-title">Objetivos del Proyecto</h2>
                <ul class="list-styled">
                    <li><span class="icon">🎯</span> Facilitar el aprendizaje de la lengua de señas a personas oyentes
                        de 18 a 28 años.</li>
                    <li><span class="icon">✍️</span> Evaluar los conocimientos adquiridos mediante pruebas
                        interactivas.</li>
                    <li><span class="icon">💰</span> Generar ingresos a través de publicidad no intrusiva para mantener
                        y mejorar la aplicación.</li>
                </ul>
            </div>
        </section>

        <!-- Sección: Alcance -->
        <section id="alcance" class="section-padding">
            <div class="container content-card fade-in">
                <h2 class="section-title">Alcance del Proyecto</h2>
                <ul class="list-styled">
                    <li><span class="icon">📱</span> Diseño de una interfaz de usuario intuitiva y amigable.</li>
                    <li><span class="icon">📚</span> Creación de secciones temáticas: abecedario, números, saludos y
                        más.</li>
                    <li><span class="icon">🏆</span> Implementación de un sistema de desbloqueo de contenidos basado en
                        el progreso.</li>
                    <li><span class="icon">📢</span> Integración de un modelo de publicidad para asegurar la
                        sostenibilidad del proyecto.</li>
                </ul>
            </div>
        </section>

        <!-- Sección: ¿Sabías qué? -->
        <section id="sabias-que" class="section-padding">
            <div class="container content-card fade-in">
                <h2 class="section-title">¿Sabías Qué?</h2>
                <div class="carousel-box">
                    <img id="sabias-img" src="<?= BASE_URL ?>images/image1.jpg"
                        alt="Dato sobre la lengua de señas" class="img-fluid carousel-img">
                    <p id="sabias-text" class="carousel-text"></p>
                    <div class="carousel-buttons">
                        <button id="prev-btn" aria-label="Anterior">&#10094;</button>
                        <button id="next-btn" aria-label="Siguiente">&#10095;</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sección: Contacto -->
        <section id="contacto" class="section-padding cta-section">
            <div class="container text-center fade-in">
                <h2 class="section-title">Únete al Proyecto</h2>
                <p>¡Ayúdanos a promover la inclusión y el aprendizaje de la lengua de señas en Colombia! Tu apoyo es
                    fundamental.</p>
                <a href="mailto:contacto@thehandstalk.com" class="btn btn-cta">Contáctanos</a>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; <span id="year"></span> The Hands Talk. Todos los derechos reservados.</p>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="<?= rtrim(BASE_URL, '/') ?>/js/landing.js" defer></script>
    <script>
        document.getElementById("year").textContent = new Date().getFullYear();
    </script>
</body>
</html>
