import { onReady, observeVisibility, animateCount, $ } from './utils.js';
import { initNavigation } from './navigation.js';
import { initTheme } from './theme.js';
import { initParticles } from './particles.js';
import { initCalendar, upcoming } from './calendar.js';
import { initExtracurriculars } from './extracurriculars.js';
import { initTransitions } from './transitions.js';

function renderGoals() {
  const container = $('#goals-container');
  if (!container) return;
  container.innerHTML = upcoming.map((goal, index) => `
    <div class="goal animate-on-scroll" style="animation-delay: ${index * 0.1}s">
      <div class="goal__deadline">${goal.label}</div>
      <h3 class="goal__title">${goal.title}</h3>
      <p class="goal__text">${goal.detail}</p>
    </div>
  `).join('');
}

function initPageAnimations() {
  const animEls = document.querySelectorAll('.animate-on-scroll');
  animEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 100 + 200);
  });
}

function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#contact-name').value.trim();
    const email = $('#contact-email').value.trim();
    const message = $('#contact-message').value.trim();
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`Message from ${name} — Shreyas Bishnu Portfolio`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:shreyasvishnu@yahoo.com?subject=${subject}&body=${body}`;
  });
}

function initHeroCounters() {
  const countEls = document.querySelectorAll('.hero__stats .stat__number');
  if (!countEls.length) return;

  observeVisibility(countEls[0]?.closest('.hero__stats'), () => {
    animateCount(countEls[0], 10, 1200);
    animateCount(countEls[1], 284, 1800);
    animateCount(countEls[2], 8, 1000);
  });
}

onReady(() => {
  initTransitions();
  initNavigation();
  initTheme();
  initParticles();
  initCalendar();
  initExtracurriculars();
  initContactForm();
  renderGoals();
  initHeroCounters();
  initPageAnimations();
});
