// Función para abrir la web al pulsar el corazón
function openGift() {
  const heart = document.querySelector('.heart-container');
  const intro = document.getElementById('intro-screen');
  const music = document.getElementById('bg-music');
  const playBtn = document.getElementById('custom-play-btn');
  const musicCard = document.querySelector('.music-card');

  if (heart) {
    heart.classList.add('filled');
    heart.classList.add('clicked'); 
  }

  if (music) {
    music.play().then(() => {
      if (playBtn) playBtn.textContent = '⏸️ Pausa';
      if (musicCard) musicCard.classList.add('playing');
    }).catch(() => {});
  }

  if (intro) {
    setTimeout(() => {
      intro.classList.add('hidden');
    }, 700);
  }
}

// Control manual del reproductor de canción
function toggleMusic() {
  const music = document.getElementById('bg-music');
  const playBtn = document.getElementById('custom-play-btn');
  const musicCard = document.querySelector('.music-card');

  if (!music) return;

  if (music.paused) {
    music.play();
    if (playBtn) playBtn.textContent = '⏸️ Pausa';
    if (musicCard) musicCard.classList.add('playing');
  } else {
    music.pause();
    if (playBtn) playBtn.textContent = '▶️ Reproducir';
    if (musicCard) musicCard.classList.remove('playing');
  }
}

// Contador de tiempo juntos (7 de septiembre de 2025)
const startDate = new Date(2025, 8, 7); 

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (daysEl) daysEl.innerText = days;
  if (hoursEl) hoursEl.innerText = hours;
  if (minutesEl) minutesEl.innerText = minutes;
  if (secondsEl) secondsEl.innerText = seconds;
}

setInterval(updateTimer, 1000);
updateTimer();

// Lógica de carruseles con bucle infinito suave (efecto carrusel real)
const carousels = {};

function initCarousel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Total de fotos REALES (excluyendo la última copia clonada)
  const slides = container.querySelectorAll('.carousel-slide');
  const realSlidesCount = containerId === 'carousel-lugar' ? 5 : 6;

  carousels[containerId] = {
    index: 0,
    realCount: realSlidesCount,
    track: container.querySelector('.carousel-track'),
    slides: slides,
    dots: container.querySelectorAll('.dot'),
    isAnimating: false
  };
}

function showSlide(containerId, n) {
  const c = carousels[containerId];
  if (!c || c.isAnimating) return;

  const track = c.track;
  const dots = c.dots;
  
  // Si pasamos de la última real hacia adelante (hacia la copia de la 1ª)
  if (n >= c.realCount) {
    c.isAnimating = true;
    c.index = c.realCount; // Mueve a la copia de la primera foto con transición suave
    track.style.transform = `translateX(-${c.index * 100}%)`;

    // Ilumina el primer punto (dot 0) para que coincida visualmente
    dots.forEach(d => d.classList.remove('active'));
    if (dots[0]) dots[0].classList.add('active');

    // Justo al terminar la transición, teletransporta sin animación a la real (índice 0)
    setTimeout(() => {
      track.style.transition = 'none';
      c.index = 0;
      track.style.transform = `translateX(0%)`;
      
      setTimeout(() => {
        track.style.transition = ''; // Devuelve la transición normal
        c.isAnimating = false;
      }, 50);
    }, 400); // 400ms coincide con la duración de la transición CSS

  } else if (n < 0) {
    // Si estamos en la primera y damos a "atrás", salta suavemente a la copia final y de ahí a la última real
    c.isAnimating = true;
    track.style.transition = 'none';
    c.index = c.realCount; // Salta instantáneamente a la copia del final
    track.style.transform = `translateX(-${c.index * 100}%)`;

    setTimeout(() => {
      track.style.transition = ''; // Restaura la transición
      c.index = c.realCount - 1;   // Se desliza suavemente a la última foto real
      track.style.transform = `translateX(-${c.index * 100}%)`;

      dots.forEach(d => d.classList.remove('active'));
      if (dots[c.index]) dots[c.index].classList.add('active');

      setTimeout(() => {
        c.isAnimating = false;
      }, 400);
    }, 50);

  } else {
    // Navegación normal entre fotos con la misma transición suave
    c.index = n;
    track.style.transform = `translateX(-${c.index * 100}%)`;

    dots.forEach(d => d.classList.remove('active'));
    if (dots[c.index]) dots[c.index].classList.add('active');
  }
}

function moveSlide(containerId, n) {
  showSlide(containerId, carousels[containerId].index + n);
}

function currentSlide(containerId, n) {
  showSlide(containerId, n);
}

// Inicializamos todos los carruseles al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  initCarousel('carousel-viajes');
  initCarousel('carousel-juntos');
  initCarousel('carousel-lugar');
});

// Función para desplegar u ocultar la lista de próximos destinos
function toggleBucketList() {
  const content = document.getElementById('bucket-list-content');
  const btn = document.querySelector('.bucket-btn');
  
  if (content.classList.contains('hidden')) {
    content.classList.remove('hidden');
    btn.textContent = ' ocultar destinos 🙈';
  } else {
    content.classList.add('hidden');
    btn.textContent = '✈️ Pulsa aquí para ver nuestros próximos destinos';
  }
}

// Función para calcular la nota del test de amor
function calculateQuizScore() {
  let score = 0;
  const totalQuestions = 10;

  // Comprobamos cada pregunta del q1 al q10
  for (let i = 1; i <= totalQuestions; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && selected.value === 'correct') {
      score++;
    }
  }

  // Mostramos el resultado
  const resultDiv = document.getElementById('quiz-result');
  const scoreNum = document.getElementById('score-number');
  const scoreMsg = document.getElementById('score-message');

  scoreNum.textContent = score;

  // Mensajes personalizados según la nota
  if (score === 10) {
    scoreMsg.textContent = "¡10/10! ¡Un Sobresaliente con matrícula de honor! Me conoces a la perfección mi amor 💖👑";
  } else if (score >= 7) {
    scoreMsg.textContent = `¡Un ${score}/10! Muy buena nota, ¡se nota que prestas atención a los detalles! 🥰✨`;
  } else if (score >= 4) {
    scoreMsg.textContent = `¡Un ${score}/10! Bueno, no está mal del todo, ¡pero habrá que repasar vuestra historia juntos! 😉📖`;
  } else {
    scoreMsg.textContent = `¡Un ${score}/10! Oye, oye... ¡vaya memoria de pez tienes jajaja! Te toca invitar a algo para compensar 🍕😂`;
  }

  resultDiv.classList.remove('hidden');
  
  // Desplazamos suavemente la pantalla hacia el resultado para que lo vea
  resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Función para abrir/cerrar el minijuego al pulsar el botón
function toggleQuizGame() {
  const content = document.getElementById('quiz-game-content');
  const btn = document.querySelector('.quiz-toggle-btn');
  
  if (content.classList.contains('hidden')) {
    content.classList.remove('hidden');
    btn.textContent = '🙈 Cerrar Minijuego';
  } else {
    content.classList.add('hidden');
    btn.textContent = '🎮 Entrar al Minijuego';
  }
}

// Función para calcular la nota del minijuego
function calculateQuizScore() {
  let score = 0;
  const totalQuestions = 10;

  for (let i = 1; i <= totalQuestions; i++) {
    if (i === 9) {
      // Regla especial para la Pregunta 9: deben estar marcadas correct1 y correct2, y ninguna trampa
      const q9Checked = Array.from(document.querySelectorAll('input[name="q9"]:checked')).map(el => el.value);
      const isCorrect = q9Checked.includes('correct1') && 
                        q9Checked.includes('correct2') && 
                        q9Checked.length === 2;
      
      if (isCorrect) score++;
    } else {
      // Preguntas estándar de una sola respuesta (radio button)
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected && selected.value === 'correct') {
        score++;
      }
    }
  }

  const resultDiv = document.getElementById('quiz-result');
  const scoreNum = document.getElementById('score-number');
  const scoreMsg = document.getElementById('score-message');

  scoreNum.textContent = score;

  if (score === 10) {
    scoreMsg.textContent = "¡10/10! ¡Un Sobresaliente con matrícula de honor! Me conoces a la perfección mi amor 💖👑";
  } else if (score >= 7) {
    scoreMsg.textContent = `¡Un ${score}/10! Muy buena nota, ¡se nota que prestas atención a los detalles! 🥰✨`;
  } else if (score >= 4) {
    scoreMsg.textContent = `¡Un ${score}/10! Bueno, no está mal del todo, ¡pero habrá que repasar nuestra historia juntos! 😉📖`;
  } else {
    scoreMsg.textContent = `¡Un ${score}/10! Oye, oye... ¡vaya memoria de pez tienes jajaja! Te toca invitar a algo para compensar 🍕😂`;
  }

  resultDiv.classList.remove('hidden');
  resultDiv.scrollIntoView({ behavior: 'smooth' });
}