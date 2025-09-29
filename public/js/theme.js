// public/js/theme.js  (reemplazar/actualizar)
(function () {
  'use strict';

  // --- Util: ¿esta página está optada por el tema de usuario? ---
  function isUserScope() {
    // se mira en <html> y en <body> por compatibilidad
    const htmlScope = document.documentElement?.dataset?.themeScope === 'usuario';
    const bodyScope = document.body?.dataset?.themeScope === 'usuario' || document.body?.classList.contains('usuario-page');
    return Boolean(htmlScope || bodyScope);
  }

  // --- 1. Obtener tema guardado ---
  function getTemaGuardado() {
    try {
      return localStorage.getItem('tema_usuario') || 'claro';
    } catch (e) {
      return 'claro';
    }
  }

  // --- 2. Aplicar tema (solo si la página está optada) ---
  function aplicarTema(tema) {
    if (!isUserScope()) return; // no tocar páginas que no sean 'usuario'
    document.documentElement.classList.remove('claro', 'oscuro');
    if (document.body) document.body.classList.remove('claro', 'oscuro');

    document.documentElement.classList.add(tema);
    if (document.body) document.body.classList.add(tema);

    try { localStorage.setItem('tema_usuario', tema); } catch (e) {}
  }

  // --- 3. Aplicar lo antes posible si la página está optada (IIFE) ---
  (function aplicarTemaInicial() {
    if (!isUserScope()) {
      // aseguramos tema claro por defecto (no forzamos clases en páginas no optadas)
      document.documentElement.classList.remove('oscuro');
      if (document.body) document.body.classList.remove('oscuro');
      return;
    }
    const tema = getTemaGuardado();
    document.documentElement.classList.add(tema);
    if (document.body) document.body.classList.add(tema);
  })();

  // --- 4. Manejar toggle y sincronizar después de DOMContentLoaded ---
  document.addEventListener('DOMContentLoaded', function () {
    if (!isUserScope()) return;

    const toggle = document.getElementById('toggleTema');

    // Forzamos consistencia (html + body)
    aplicarTema(getTemaGuardado());

    if (toggle) {
      toggle.checked = getTemaGuardado() === 'oscuro';
      toggle.addEventListener('change', function () {
        const nuevoTema = this.checked ? 'oscuro' : 'claro';
        aplicarTema(nuevoTema);
      });
    }
  });

  // Exponer por si otros scripts quieren llamar
  window.aplicarTema = aplicarTema;
})();
