import { $, onReady } from './utils.js';

export function initTheme() {
  const toggle = $('#theme-toggle');
  const stored = localStorage.getItem('theme');

  if (stored === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  onReady(() => {
    toggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);

      toggle.style.transform = 'rotate(360deg)';
      setTimeout(() => { toggle.style.transform = ''; }, 300);
    });
  });
}
