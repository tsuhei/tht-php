// MultipleFiles/test_logic.js

document.addEventListener('DOMContentLoaded', () => {
    let currentQuestionIndex = 0;
    let userAnswers = []; // Almacena { pregunta_id, respuesta_elegida_id }
    let score = 0; // Este score es solo para visualización inmediata, el real se calcula en el backend

    const questionDisplay = document.getElementById('question-display');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const progressBar = document.querySelector('.progress-bar');
    const feedbackModal = document.getElementById('feedback-modal');
    const modalScore = document.getElementById('modal-score');
    const modalPercentage = document.getElementById('modal-percentage');
    const modalMessage = document.getElementById('modal-message');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    function displayQuestion(index) {
        if (index >= preguntasData.length) {
            finishTest();
            return;
        }

        const question = preguntasData[index];
        questionDisplay.innerHTML = `
        <div class="question-card">
            <h3>${question.texto_pregunta}</h3>
            <div class="options-grid">
                ${question.opciones.map(option => `
                    <div class="option-card" data-sena-id="${option.sena_id}" data-correcta="${option.correcta ? 'true' : 'false'}">
                        <video muted loop playsinline>
                            <source src="${baseUrl}${option.video_url}" type="video/mp4">
                            Tu navegador no soporta el video.
                        </video>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

        // Actualizar progreso y texto
        const progress = ((index) / preguntasData.length) * 100;
        progressBar.style.width = `${progress}%`;
        document.getElementById("progress-text").textContent = `Pregunta ${index + 1} de ${preguntasData.length}`;

        attachOptionListeners();
        nextQuestionBtn.style.display = 'none';
    }


    function attachOptionListeners() {
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', handleOptionClick);
            // Hover effects
            const video = card.querySelector('video');
            card.addEventListener('mouseenter', () => {
                if (video) video.play();
            });
            card.addEventListener('mouseleave', () => {
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
        });
    }

    function handleOptionClick(event) {
        const clickedCard = event.currentTarget;
        const isCorrect = clickedCard.dataset.correcta === 'true';
        const senaId = parseInt(clickedCard.dataset.senaId); // ID de la seña elegida

        // Desactivar clics en todas las opciones después de una selección
        document.querySelectorAll('.option-card').forEach(card => {
            card.removeEventListener('click', handleOptionClick);
            card.style.pointerEvents = 'none'; // Evitar más clics
        });

        // Marcar la respuesta del usuario
        if (isCorrect) {
            clickedCard.classList.add('correct');
            // score++; // No incrementar aquí, el score real viene del backend
        } else {
            clickedCard.classList.add('incorrect');
            // Mostrar la respuesta correcta si el usuario se equivocó
            document.querySelectorAll('.option-card').forEach(card => {
                if (card.dataset.correcta === 'true') {
                    card.classList.add('correct');
                }
            });
        }

        // Guardar la respuesta del usuario);
        userAnswers.push({
            pregunta_id: preguntasData[currentQuestionIndex].id_pregunta,
            respuesta_elegida_id: senaId
        });


        nextQuestionBtn.style.display = 'block'; // Mostrar el botón "Siguiente"
    }

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    });

    function finishTest() {
        // Actualizar barra de progreso al 100%
        progressBar.style.width = '100%';

        // Enviar resultados al servidor
        fetch(`${baseUrl}usuarios/test/enviarResultado`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                respuestas: JSON.stringify(userAnswers),
                test_id: testId,
                categoria_id: categoriaId
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    modalScore.textContent = `Respuestas correctas: ${data.score} de ${data.total}`;
                    modalPercentage.textContent = `Porcentaje de acierto: ${data.percentage}%`;
                    modalMessage.textContent = data.message;
                    feedbackModal.classList.remove('hidden');
                } else {
                    alert('Error al enviar el resultado: ' + data.message);
                    window.location.href = `${baseUrl}usuarios/test`; // Redirigir en caso de error
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Ocurrió un error al finalizar el test.');
                window.location.href = `${baseUrl}usuarios/test`; // Redirigir en caso de error
            });
    }

    modalCloseBtn.addEventListener('click', () => {
        feedbackModal.classList.add('hidden');
        window.location.href = `${baseUrl}usuarios/test`; // Redirigir a la vista de selección de tests
    });

    // Iniciar el test mostrando la primera pregunta
    displayQuestion(currentQuestionIndex);
});
