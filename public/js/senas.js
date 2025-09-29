// public/js/senas.js

document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = window.BASE_URL; // Asegúrate de que BASE_URL esté definida en la vista

    // Modal de creación/edición
    const modalForm = document.getElementById('modal-form');
    const closeButton = modalForm.querySelector('.close');

    // Abrir modal si los parámetros 'create' o 'edit' están en la URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('create') || urlParams.has('edit')) {
        modalForm.classList.remove('hidden');
        modalForm.classList.add('open');
    }

    // Cerrar modal al hacer clic en la 'x'
    closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        modalForm.classList.add('hidden');
        modalForm.classList.remove('open');
        // Opcional: limpiar la URL para que el modal no se abra al recargar
        window.history.replaceState({}, document.title, window.location.pathname);
    });

    // Cerrar modal al hacer clic fuera del contenido
    modalForm.addEventListener('click', (e) => {
        if (e.target === modalForm) {
            modalForm.classList.add('hidden');
            modalForm.classList.remove('open');
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    });

    // Modal de confirmación de eliminación
    const deleteModal = document.getElementById('modal-delete');
    const deleteCloseButton = deleteModal.querySelector('.close-delete');
    const deleteCancelButton = deleteModal.querySelector('.btn-secondary');
    const deleteConfirmButton = deleteModal.querySelector('.confirm-delete');
    const deleteMessage = document.getElementById('modal-delete-message');

    let currentDeleteForm = null; // Para guardar la referencia al formulario de eliminación

    document.querySelectorAll('.form-delete').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir el envío por defecto del formulario
            currentDeleteForm = form; // Guardar la referencia al formulario actual

            const senaName = form.dataset.name; // Obtener el nombre de la seña del atributo data-name
            deleteMessage.textContent = `¿Estás seguro de que quieres eliminar la seña "${senaName}"?`;

            deleteModal.classList.remove('hidden');
            deleteModal.classList.add('open');
        });
    });

    // Cerrar modal de eliminación
    const closeDeleteModal = () => {
        deleteModal.classList.add('hidden');
        deleteModal.classList.remove('open');
        currentDeleteForm = null; // Limpiar la referencia
    };

    deleteCloseButton.addEventListener('click', closeDeleteModal);
    deleteCancelButton.addEventListener('click', closeDeleteModal);
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal.querySelector('.modal-backdrop')) {
            closeDeleteModal();
        }
    });

    // Confirmar eliminación
    deleteConfirmButton.addEventListener('click', () => {
        if (currentDeleteForm) {
            currentDeleteForm.submit(); // Enviar el formulario real
        }
    });
});
