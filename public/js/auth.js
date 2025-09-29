// public/js/auth.js
document.querySelectorAll('.switch').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const mode = btn.getAttribute('data-mode');
        document.querySelector('.container').classList.toggle('register-mode', mode === 'register');
    });
});

// Mostrar/ocultar contraseña
document.querySelectorAll('.toggle-pwd').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-target');
        const input = document.getElementById(id);
        input.type = input.type === 'password' ? 'text' : 'password';
    });
});
