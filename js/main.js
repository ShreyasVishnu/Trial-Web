import { onReady, observeVisibility, animateCount, $ } from './utils.js';
import { initNavigation } from './navigation.js';
import { initTheme } from './theme.js';
import { initParticles } from './particles.js';
import { initExtracurriculars } from './extracurriculars.js';
import { initTransitions } from './transitions.js';
import { highlights, upcoming, typeLabel } from './calendar.js';

function renderHighlights() {
  const container = $('#highlights-container');
  if (!container) return;

  const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'short' });
  const items = highlights.map((h, i) => {
    const d = new Date(h.date + 'T00:00:00');
    const month = monthFmt.format(d).toUpperCase();
    const day = d.getDate();
    const year = d.getFullYear();
    return `
      <article class="highlight" style="--delay:${i * 0.05}s">
        <div class="highlight__date">
          <span class="highlight__month">${month}</span>
          <span class="highlight__day">${day}</span>
          <span class="highlight__year">${year}</span>
        </div>
        <div class="highlight__body">
          <span class="highlight__tag highlight__tag--${h.type}">${typeLabel(h.type)}</span>
          <h3 class="highlight__title">${h.title}</h3>
          <p class="highlight__detail">${h.detail}</p>
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = `<div class="timeline">${items}</div>`;
}

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

function initSideDial() {
  const dial = $('.side-dial');
  if (!dial) return;

  const dots = $$('.side-dial__dot', dial);
  const targets = dots
    .map(dot => {
      const id = dot.dataset.target;
      const el = id ? document.getElementById(id) : null;
      return el ? { dot, el } : null;
    })
    .filter(Boolean);

  if (!targets.length) return;

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const id = dot.dataset.target;
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      const headerOffset = (document.querySelector('.header')?.offsetHeight || 0) + 16;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const match = targets.find(t => t.el === entry.target);
      if (!match) return;
      if (entry.isIntersecting) {
        dots.forEach(d => d.classList.remove('side-dial__dot--active'));
        match.dot.classList.add('side-dial__dot--active');
      }
    });
  }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });

  targets.forEach(t => observer.observe(t.el));
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
  initExtracurriculars();
  initContactForm();
  renderHighlights();
  renderGoals();
  initSideDial();
  initHeroCounters();
  initPageAnimations();
});
