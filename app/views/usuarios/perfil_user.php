<?php
// Variables de respaldo por si no vienen definidas
$userName = $userName ?? 'Usuario';
$active = $active ?? 'perfil';
$user = $user ?? [];

// Iniciar sesión si no está activa
if (session_status() !== PHP_SESSION_ACTIVE) {
  session_start();
}
?>
<!DOCTYPE html>
<html lang="es" data-theme-scope="usuario">

<head>
  <meta charset="UTF-8">
  <title>Perfil de Usuario</title>
  <script>
    (function () {
      try {
        if (document.documentElement.dataset.themeScope === 'usuario') {
          var tema = localStorage.getItem('tema_usuario') || 'claro';
          document.documentElement.classList.add(tema);
        }
      } catch (e) { }
    })();
  </script>
  <link rel="icon" href="<?= BASE_URL ?>images/IconoTHTazul.svg" type="image/x-icon">

  <link rel="stylesheet" href="<?= BASE_URL ?>css/main1.css">
  <link rel="stylesheet" href="<?= BASE_URL ?>css/perfil_user1.css">
  <link rel="stylesheet" href="<?= BASE_URL ?>css/flash_messages.css">
</head>

<body>
  <!-- Header -->
  <header class="user-header">
    <div class="logo">The Hands Talk</div>
    <div class="welcome-container">
      <div class="welcome-message">¡Hola, <?= htmlspecialchars($userName, ENT_QUOTES) ?>! 👋</div>
    </div>
    <button class="menu-toggle">☰</button>
  </header>

  <!-- Menú de usuario -->
  <nav class="user-menu">
    <ul>
      <li><a href="<?= BASE_URL ?>usuarios/main" data-key="main" class="<?= ($active === 'main') ? 'active' : '' ?>">Información</a></li>
      <li><a href="<?= BASE_URL ?>usuarios/categorias" data-key="cat" class="<?= ($active === 'cat') ? 'active' : '' ?>">Categorías</a></li>
      <li><a href="<?= BASE_URL ?>usuarios/test" data-key="test" class="<?= ($active === 'test') ? 'active' : '' ?>">Test</a></li>
      <li><a href="<?= BASE_URL ?>usuarios/perfil" data-key="perfil" class="<?= ($active === 'perfil') ? 'active' : '' ?>">Perfil</a></li>
    </ul>
  </nav>

  <!-- Contenido principal -->
  <main class="perfil-main">
    <!-- Mensajes flash -->
    <?php if (isset($_SESSION['flash'])): ?>
      <div class="flash-message flash-<?= htmlspecialchars($_SESSION['flash']['type']) ?>">
        <?= htmlspecialchars($_SESSION['flash']['message']) ?>
      </div>
      <?php unset($_SESSION['flash']); ?>
    <?php endif; ?>

    <!-- Encabezado -->
    <section class="perfil-header">
      <h1 id="userNameDisplay"><?= htmlspecialchars($userName, ENT_QUOTES) ?></h1>

      <!-- Form editar nombre -->
      <form id="formEditarNombre" action="<?= BASE_URL ?>usuarios/perfil/editarNombre" method="POST" class="hidden">
        <input type="text" name="nombre_usuario" id="inputNombreUsuario" value="<?= htmlspecialchars($userName, ENT_QUOTES) ?>" required>
        <button type="submit" class="btn btn-save">Guardar</button>
        <button type="button" id="cancelarEditarNombre" class="btn btn-cancel">Cancelar</button>
      </form>

      <!-- Botones -->
      <div class="perfil-actions settings-container">
        <button type="button" class="btn small-pill edit-btn" id="editNameBtn" aria-expanded="false">✏️ Editar</button>
        <button type="button" class="btn small-pill settings-btn" id="settingsBtn" aria-expanded="false" aria-haspopup="true">⚙ Ajustes</button>

        <!-- Popup ajustes -->
        <div class="settings-popup hidden" id="settingsPopup" aria-hidden="true" role="menu">
          <ul>
            <li>
              <label class="switch">
                <input type="checkbox" id="toggleTema">
                <span class="slider"></span>
                <span class="switch-label">🌙 Tema Oscuro</span>
              </label>
            </li>
            <li><button type="button" class="popup-btn" id="changePassBtn">🔑 Cambiar contraseña</button></li>
            <li>
              <form action="<?= BASE_URL ?>auth/logout" method="POST">
                <button type="submit" class="popup-btn logout-btn">🚪 Cerrar sesión</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Modal cambiar contraseña -->
    <div id="modalCambiarPassword" class="modal-overlay hidden" aria-hidden="true">
      <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalCambiarTitulo">
        <button type="button" class="modal-close" id="closeModalCambiar" aria-label="Cerrar">&times;</button>
        <h3 id="modalCambiarTitulo">Cambiar Contraseña</h3>
        <form id="formCambiarPassword" action="<?= BASE_URL ?>usuarios/perfil/cambiarPassword" method="POST">
          <label for="password_actual">Contraseña actual:</label>
          <input type="password" name="password_actual" id="password_actual" required>

          <label for="password_nueva">Nueva contraseña:</label>
          <input type="password" name="password_nueva" id="password_nueva" required>

          <label for="password_confirmar">Confirmar nueva contraseña:</label>
          <input type="password" name="password_confirmar" id="password_confirmar" required>

          <div class="modal-actions">
            <button type="submit" class="btn btn-save">Cambiar</button>
            <button type="button" id="cancelarCambiarPassword" class="btn btn-cancel">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Progreso -->
    <section class="perfil-progreso">
      <h2>Progreso de categorías</h2>
      <div class="categorias-container">
        <?php if (!empty($categoriasProgreso)): ?>
          <?php foreach ($categoriasProgreso as $cat): ?>
            <?php $icono = htmlspecialchars($cat['icono'] ?? '', ENT_QUOTES); ?>
            <div class="categoria">
              <span class="categoria-icon">
                <?php if (!empty($icono)): ?>
                  <img src="<?= BASE_URL . $icono ?>" alt="Icono <?= htmlspecialchars($cat['nom_categoria'], ENT_QUOTES) ?>">
                <?php else: ?>
                  📚
                <?php endif; ?>
              </span>
              <span class="categoria-nombre"><?= htmlspecialchars($cat['nom_categoria'], ENT_QUOTES) ?></span>
              <div class="barra-progreso">
                <div class="barra" style="width: <?= (int)($cat['progreso'] ?? 0) ?>%;"></div>
              </div>
              <span class="porcentaje"><?= (int)($cat['progreso'] ?? 0) ?>%</span>
            </div>
          <?php endforeach; ?>
        <?php else: ?>
          <p>No hay progreso disponible.</p>
        <?php endif; ?>
      </div>
    </section>
  </main>

  <!-- Scripts -->
  <script src="<?= BASE_URL ?>js/main.js" defer></script>
  <script src="<?= BASE_URL ?>js/perfil.js" defer></script>
  <script src="<?= BASE_URL ?>js/theme.js" defer></script>
</body>

</html>
