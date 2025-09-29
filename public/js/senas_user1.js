document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los botones de señas
    const senaButtons = document.querySelectorAll('.sena-btn');
    const senaArticles = document.querySelectorAll('.sena-info');
    
    // Agregar evento click a cada botón
    senaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const senaId = this.getAttribute('data-id');
            
            // Remover clase active de todos los botones
            senaButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Ocultar todos los artículos de señas
            senaArticles.forEach(article => {
                article.style.display = 'none';
            });
            
            // Mostrar el artículo correspondiente a la seña seleccionada
            const targetArticle = document.getElementById(`sena-${senaId}`);
            if (targetArticle) {
                targetArticle.style.display = 'flex';
            }
        });
    });
    
    // Toggle para el menú en dispositivos móviles
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const senasMenu = document.getElementById('senasMenu');
            senasMenu.classList.toggle('collapsed');
        });
    }
});