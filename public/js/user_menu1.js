document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.sena-btn');
    const details = document.querySelectorAll('.sena-info');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase active de todos los botones
            buttons.forEach(btn => btn.classList.remove('active'));
            // Ocultar todos los detalles y pausar videos
            details.forEach(detail => {
                detail.style.display = 'none';
                const video = detail.querySelector('video');
                if (video) {
                    video.pause();
                    video.currentTime = 0; // Reiniciar video
                }
            });

            // Activar botón clickeado
            button.classList.add('active');
            // Mostrar detalle correspondiente y reproducir video
            const id = button.getAttribute('data-id');
            const detail = document.getElementById('sena-' + id);
            if (detail) {
                detail.style.display = 'grid';
                const video = detail.querySelector('video');
                if (video) {
                    video.play();
                }
            }
        });
    });

    // Asegurarse de que la primera seña se muestre y reproduzca al cargar la página
    if (buttons.length > 0) {
        buttons[0].click(); // Simula un clic en el primer botón
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.sena-btn');
    const formRegistrarProgreso = document.getElementById('formRegistrarProgreso');
    const inputIdSena = document.getElementById('inputIdSena');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            inputIdSena.value = id;
            formRegistrarProgreso.submit();
        });
    });
});

