import { $, onReady } from './utils.js';

export function initParticles() {
  const container = $('#hero-particles');
  if (!container) return;

  const colors = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)'];
  const count = 30;

  onReady(() => {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'hero__particle';
      const size = 3 + Math.random() * 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = `${Math.random() * 30}%`;
      particle.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 200}px`);
      particle.style.animationDuration = `${8 + Math.random() * 12}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      container.appendChild(particle);
    }
  });
}
