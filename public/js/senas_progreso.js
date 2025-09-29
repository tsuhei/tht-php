document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.sena-video');
    const baseUrl = window.BASE_URL || '/';
    const userId = window.USER_ID || 0;

    console.log('senas_progreso.js cargado. Videos encontrados:', videos.length, 'User ID:', userId);

    if (!videos.length || userId === 0) {
        console.warn('No videos o userId inválido. Saliendo.');
        return;
    }

    const registrarProgreso = async (senaId, categoriaId) => {
        const key = `progress_sent_${userId}_${categoriaId}_${senaId}`;
        if (localStorage.getItem(key)) {
            console.log(`Seña ${senaId} ya registrada (localStorage). Saltando.`);
            return;
        }

        console.log(`Intentando registrar seña ${senaId} en categoría ${categoriaId}...`);

        const formData = new FormData();
        formData.append('id_sena', senaId);
        formData.append('id_categoria', categoriaId);

        try {
            const url = `${baseUrl}usuarios/senas/registrarProgreso`;
            console.log('Enviando fetch a:', url);

            const res = await fetch(url, {
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            });

            console.log('Respuesta fetch:', res.status, res.statusText);

            if (!res.ok) {
                console.error('Error al registrar progreso:', res.status, res.statusText);
                return;
            }

            // Intentar leer JSON, pero si no hay, ignorar
            let json = null;
            try {
                json = await res.json();
            } catch (parseErr) {
                console.warn('La respuesta no es JSON (esto es esperado si tu backend solo guarda en BD).');
            }

            localStorage.setItem(key, '1');
            window.dispatchEvent(new CustomEvent('progresoRegistrado', {
                detail: { senaId, categoriaId, porcentaje: json?.porcentaje ?? null }
            }));

            console.log('Progreso registrado exitosamente:', senaId, json?.porcentaje ?? 'sin porcentaje');
        } catch (err) {
            console.error('Fetch error completo:', err);
        }
    };

    videos.forEach(video => {
        console.log('Configurando video:', video.dataset.senaId, video.dataset.categoriaId);

        video.addEventListener('playing', function () {
            if (!this.dataset.progressRegistered) {
                console.log('Evento playing en video', this.dataset.senaId);
                this.dataset.progressRegistered = 'true';
                registrarProgreso(this.dataset.senaId, this.dataset.categoriaId);
            }
        });

        video.addEventListener('timeupdate', function () {
            if (this.currentTime > 1 && !this.dataset.progressRegistered) {
                console.log('Evento timeupdate >1s en video', this.dataset.senaId, 'Tiempo:', this.currentTime);
                this.dataset.progressRegistered = 'true';
                registrarProgreso(this.dataset.senaId, this.dataset.categoriaId);
            }
        });
    });

    // Exponer global para fallback
    window.registrarProgresoGlobal = registrarProgreso;
});

document.addEventListener('DOMContentLoaded', () => {
    const barra = document.querySelector('.progress-bar');   // <div class="progress-bar"></div>
    const porcentajeTexto = document.querySelector('.progress-percent'); // <span class="progress-percent"></span>

    window.addEventListener('progresoRegistrado', e => {
        const porcentaje = e.detail.porcentaje;
        if (porcentaje !== null) {
            if (barra) barra.style.width = `${porcentaje}%`;
            if (porcentajeTexto) porcentajeTexto.textContent = `${porcentaje}%`;
            console.log('🔄 Barra actualizada a', porcentaje + '%');
        }
    });
});

