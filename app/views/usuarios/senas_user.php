<?php
$active    = $active    ?? 'cat';
$categoria = $categoria ?? ['nom_categoria' => 'Categoría Desconocida'];
$senas     = $senas     ?? [];
?>

<!DOCTYPE html>
<html lang="es" data-theme-scope="usuario">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="<?= BASE_URL ?>favicon.ico" type="image/x-icon">
    <title>Señas de <?= htmlspecialchars($categoria['nom_categoria'], ENT_QUOTES) ?> | The Hands Talk</title>
    <script>
        (function() {
            try {
                if (document.documentElement.dataset.themeScope === 'usuario') {
                    var tema = localStorage.getItem('tema_usuario') || 'claro';
                    document.documentElement.classList.add(tema);
                }
            } catch (e) {}
        })();
    </script>

    <link rel="icon" href="<?= BASE_URL ?>images/IconoTHTazul.svg" type="image/x-icon">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/main1.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>css/senas_user1.css">
</head>

<body data-active="<?= $active ?>" class="senas-page">

    <header class="user-header">
        <div class="logo">The Hands Talk</div>
        <div class="welcome-container">
            <div class="welcome-message">¡Hola, <?= htmlspecialchars($userName, ENT_QUOTES) ?>! 👋</div>
        </div>
        <button class="menu-toggle" aria-label="Abrir menú">☰</button>
    </header>

    <main class="main-content senas-main-content">
        <div class="header-section">
            <h2 class="section-title">Señas de la categoría: <?= htmlspecialchars($categoria['nom_categoria'], ENT_QUOTES) ?></h2>
            <a href="<?= BASE_URL ?>usuarios/categorias" class="back-btn">Volver a Categorías</a>
        </div>

        <div class="senas-container">
            <!-- Menú lateral -->
            <nav class="senas-menu" id="senasMenu">
                <div class="menu-header">
                    <h3>Señas disponibles</h3>
                    <button class="menu-toggle-btn" id="menuToggle">☰</button>
                </div>
                <div class="senas-list-container">
                    <div class="senas-list">
                        <?php foreach ($senas as $index => $sena): ?>
                            <button type="button" class="sena-btn <?= $index === 0 ? 'active' : '' ?>" data-id="<?= $sena['id'] ?>">
                                <span class="sena-icon">👐</span>
                                <?= htmlspecialchars($sena['palabra'], ENT_QUOTES) ?>
                            </button>
                        <?php endforeach; ?>
                    </div>
                </div>
            </nav>

            <!-- Contenido de la seña -->
            <section class="sena-details">
                <?php foreach ($senas as $index => $sena): ?>
                    <article class="sena-info" id="sena-<?= $sena['id'] ?>" style="display: <?= $index === 0 ? 'grid' : 'none' ?>">
                        <div class="sena-text">
                            <h3 class="sena-word"><?= htmlspecialchars($sena['palabra'], ENT_QUOTES) ?></h3>
                            <div class="sena-description">
                                <h4>Descripción</h4>
                                <p><?= htmlspecialchars($sena['descripcion'], ENT_QUOTES) ?></p>
                            </div>
                        </div>
                        <div class="sena-media-container">
                            <video autoplay loop muted playsinline
                                class="sena-video"
                                data-sena-id="<?= (int)$sena['id'] ?>"
                                data-categoria-id="<?= (int)$categoria['id'] ?>">
                                <source src="<?= BASE_URL . htmlspecialchars($sena['media_url'], ENT_QUOTES) ?>" type="video/mp4">
                                Tu navegador no soporta el elemento de video.
                            </video>
                        </div>
                    </article>
                <?php endforeach; ?>
            </section>
        </div>
    </main>

    <!-- Variables globales -->
    <input type="hidden" id="inputIdCategoria" value="<?= htmlspecialchars($categoria['id'], ENT_QUOTES) ?>">

    <script>
        window.BASE_URL = '<?= BASE_URL ?>';
        window.USER_ID = <?= $_SESSION['usuario']['id'] ?? 0 ?>;
    </script>

    <!-- Scripts -->
    <script src="<?= BASE_URL ?>js/user_menu1.js"></script>
    <script src="<?= BASE_URL ?>js/main.js" defer></script>
    <script src="<?= BASE_URL ?>js/theme.js" defer></script>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        const senaButtons = document.querySelectorAll('.sena-btn');
        const senaArticles = document.querySelectorAll('.sena-info');
        const userId = window.USER_ID;
        const categoriaId = document.getElementById('inputIdCategoria').value;

        // Cambiar de seña
        senaButtons.forEach(button => {
            button.addEventListener('click', function() {
                const senaId = this.getAttribute('data-id');

                senaButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                senaArticles.forEach(article => {
                    article.style.display = 'none';
                });

                const targetArticle = document.getElementById(`sena-${senaId}`);
                if (targetArticle) {
                    targetArticle.style.display = 'grid';

                    // 🔹 Registrar progreso automáticamente
                    registrarProgreso(userId, categoriaId, senaId);
                }
            });
        });

        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                const senasMenu = document.getElementById('senasMenu');
                senasMenu.classList.toggle('collapsed');
            });
        }

        // 🔹 Función para registrar progreso sin redirigir ni mostrar JSON
        function registrarProgreso(userId, categoriaId, senaId) {
    fetch(`${window.BASE_URL}usuarios/senas/registrarProgreso`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `id_sena=${encodeURIComponent(senaId)}&id_categoria=${encodeURIComponent(categoriaId)}`
    }).catch(err => console.error("Error registrando progreso:", err));
}
    });
    </script>

</body>
</html>
