document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.user-menu');
    const toggleBtn = document.querySelector('.menu-toggle');

    // 1. Alternar menú al hacer clic en el botón
    toggleBtn.addEventListener('click', () => {
        menu.classList.toggle('open');
    });

    // 2. Cerrar menú al hacer clic fuera (útil en móviles)
    document.addEventListener('click', e => {
        if (!menu.contains(e.target) && e.target !== toggleBtn) {
            menu.classList.remove('open');
        }
    });

    // 3. Resaltar sección activa
    const activeSection = document.body.dataset.active;
    if (activeSection) {
        menu.querySelectorAll('a[data-key]').forEach(link => {
            if (link.dataset.key === activeSection) {
                link.classList.add('active');
            }
        });
    }

    // 4. Sincronizar estado al redimensionar (desktop vs móvil)
    const media = window.matchMedia('(min-width: 768px)');
    const syncMenu = e => {
        if (e.matches) {
            menu.classList.add('open');
        } else {
            menu.classList.remove('open'); 
        }
    };
    media.addListener(syncMenu);
    syncMenu(media);
});

    // Reproducir/pausar video en hover
    document.addEventListener('DOMContentLoaded', function(){
      document.querySelectorAll('.cat-card').forEach(function(card){
        const video = card.querySelector('video');
        if (!video) return;
        card.addEventListener('mouseenter', function(){
          video.currentTime = 0;
          video.play();
        });
        card.addEventListener('mouseleave', function(){
          video.pause();
          video.currentTime = 0;
        });
      });
    });