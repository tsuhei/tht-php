document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos ---
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsPopup = document.getElementById('settingsPopup');
    const editNameBtn = document.getElementById('editNameBtn');
    const formEditarNombre = document.getElementById('formEditarNombre');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const cancelarEditarNombre = document.getElementById('cancelarEditarNombre');
    const inputNombreUsuario = document.getElementById('inputNombreUsuario');
    const changePassBtn = document.getElementById('changePassBtn');
    const modalCambiar = document.getElementById('modalCambiarPassword');
    const cancelarCambiarPassword = document.getElementById('cancelarCambiarPassword');
    const closeModalCambiar = document.getElementById('closeModalCambiar');
    const selectTema = document.getElementById('selectTema');

    // --- Flash ---
    const flashMessage = document.querySelector('.flash-message');
    if (flashMessage) {
        setTimeout(() => {
            flashMessage.style.opacity = '0';
            flashMessage.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => flashMessage.remove(), 500);
        }, 4000);
    }

    // --- Ajustes ---
    const toggleSettings = () => {
        const isShown = settingsPopup.classList.contains('show');
        settingsPopup.classList.toggle('show', !isShown);
        settingsPopup.classList.toggle('hidden', isShown);
        settingsPopup.setAttribute('aria-hidden', isShown);
        settingsBtn.setAttribute('aria-expanded', !isShown);
    };

    settingsBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSettings();
        formEditarNombre.classList.add('hidden');
        editNameBtn.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', (e) => {
        if (!settingsBtn.contains(e.target) && !settingsPopup.contains(e.target)) {
            settingsPopup.classList.add('hidden');
            settingsPopup.classList.remove('show');
        }
    });

    // --- Editar nombre ---
    editNameBtn?.addEventListener('click', () => {
        const expanded = editNameBtn.getAttribute('aria-expanded') === 'true';
        if (expanded) {
            formEditarNombre.classList.add('hidden');
            editNameBtn.setAttribute('aria-expanded', 'false');
        } else {
            formEditarNombre.classList.remove('hidden');
            editNameBtn.setAttribute('aria-expanded', 'true');
            inputNombreUsuario.focus();
            inputNombreUsuario.select();
            settingsPopup.classList.add('hidden');
        }
    });

    cancelarEditarNombre?.addEventListener('click', () => {
        formEditarNombre.classList.add('hidden');
        editNameBtn.setAttribute('aria-expanded', 'false');
        inputNombreUsuario.value = userNameDisplay.textContent.trim();
    });

    formEditarNombre?.addEventListener('submit', () => {
        const nuevo = inputNombreUsuario.value.trim();
        if (nuevo) userNameDisplay.textContent = nuevo;
    });

    // --- Cambiar contraseña ---
    changePassBtn?.addEventListener('click', () => {
        modalCambiar.classList.remove('hidden');
        modalCambiar.setAttribute('aria-hidden', 'false');
    });

    closeModalCambiar?.addEventListener('click', () => {
        modalCambiar.classList.add('hidden');
        modalCambiar.setAttribute('aria-hidden', 'true');
    });

    cancelarCambiarPassword?.addEventListener('click', () => {
        modalCambiar.classList.add('hidden');
        modalCambiar.setAttribute('aria-hidden', 'true');
        ['password_actual', 'password_nueva', 'password_confirmar'].forEach(id => {
            document.getElementById(id).value = '';
        });
    });

    // --- Tema ---
    const aplicarTema = (tema) => {
        document.documentElement.classList.remove('claro', 'oscuro');
        document.documentElement.classList.add(tema);
        document.body.classList.remove('claro', 'oscuro');
        document.body.classList.add(tema);
        localStorage.setItem('tema_usuario', tema);
    };

    const temaGuardado = localStorage.getItem('tema_usuario') || 'claro';
    aplicarTema(temaGuardado);

    if (selectTema) {
        selectTema.value = temaGuardado;
        selectTema.addEventListener('change', () => aplicarTema(selectTema.value));
    }
});
