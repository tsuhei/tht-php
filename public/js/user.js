document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = window.BASE_URL.replace(/\/+$/, '') + '/';
    const modalForm = document.getElementById('modal-form');
    const form = document.getElementById('user-form');
    let deleteId = null;

    // Nuevo Usuario
    document.getElementById('add-user-btn').addEventListener('click', () => {
        form.reset();
        form.action = `${baseUrl}admin/users/store`;
        form.querySelector('#u-pass').required = true;
        form.querySelector('#u-rol').selectedIndex = 0;
        modalForm.classList.remove('hidden');
        form.querySelector('#u-nom').focus();
    });

    // Editar Usuario
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const { id, idrol, usuario, correo } = btn.dataset;
            form.reset();
            form.action = `${baseUrl}admin/users/update/${id}`;
            form.querySelector('#u-id').value = id;
            form.querySelector('#u-rol').value = idrol;
            form.querySelector('#u-nom').value = nom || '';
            form.querySelector('#u-correo').value = correo || '';
            const passInput = form.querySelector('#u-pass');
            passInput.required = false;
            passInput.value = '';
            passInput.placeholder = 'Deja vacío para no cambiar';
            modalForm.classList.remove('hidden');
            form.querySelector('#u-nom').focus();
        });
    });

    // Cerrar modal (botón X o click fuera)
    document.querySelectorAll('.close').forEach(el =>
        el.addEventListener('click', e => {
            e.preventDefault();
            modalForm.classList.add('hidden');
        })
    );
    window.addEventListener('click', e => {
        if (e.target === modalForm) modalForm.classList.add('hidden');
    });

    // Eliminar usuario
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            deleteId = btn.dataset.id;
            document.getElementById('del-id').value = deleteId;
            document.getElementById('modal-delete').classList.remove('hidden');
        });
    });
    document.querySelectorAll('.close-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('modal-delete').classList.add('hidden');
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
  // 1) Capturamos elementos
  const modal       = document.getElementById('modal-delete');
  const backdrop    = modal.querySelector('.modal-backdrop');
  const closeBtn    = modal.querySelector('.modal-close');
  const cancelBtn   = modal.querySelector('.modal-cancel');
  const confirmBtn  = modal.querySelector('.modal-confirm');
  const messageEl   = document.getElementById('modal-delete-message');
  let currentForm;  // guardamos el form que quiere borrar

  // 2) Función para abrir modal con datos dinámicos
  function openModal(form) {
    currentForm = form;
    const username = form.dataset.username;
    messageEl.textContent = `¿Seguro que deseas eliminar a “${username}”?`;
    modal.classList.remove('hidden');
  }

  // 3) Asociar evento submit a cada form.form-delete
  document.querySelectorAll('form.form-delete').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();       // cancelamos el envío
      openModal(form);          // abrimos nuestro modal
    });
  });

  // 4) Funciones de cerrado
  function closeModal() {
    modal.classList.add('hidden');
    currentForm = null;
  }
  [backdrop, closeBtn, cancelBtn].forEach(el =>
    el.addEventListener('click', closeModal)
  );

  // 5) Confirmar eliminación: ahora sí enviamos el form original
  confirmBtn.addEventListener('click', () => {
    if (currentForm) {
      currentForm.submit();
    }
  });
});

