import { $, $$, onReady } from './utils.js';

export function initNavigation() {
  const header = $('.header');

  onReady(() => {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  });

  initNavIndicator();
}

function initNavIndicator() {
  const navLinks = $('.nav__links');
  if (!navLinks) return;

  const tabs = $$('.nav__link', navLinks).filter(l => {
    const h = l.getAttribute('href');
    return h === 'index.html' || h === 'about.html' || h === 'extracurriculars.html' || h === 'contact.html';
  });

  if (tabs.length < 2) return;

  const indicator = document.createElement('li');
  indicator.className = 'nav__indicator';
  navLinks.appendChild(indicator);

  function position(link, instant) {
    const linkRect = link.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();
    const x = linkRect.left - navRect.left;

    indicator.style.setProperty('--indicator-x', `${x}px`);
    indicator.style.setProperty('--indicator-w', `${linkRect.width}px`);
    indicator.style.setProperty('--indicator-h', `${linkRect.height}px`);

    if (instant) {
      indicator.style.transition = 'none';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          indicator.style.transition = '';
        });
      });
    }
  }

  const activeLink = navLinks.querySelector('.nav__link--active');
  if (activeLink && tabs.includes(activeLink)) {
    position(activeLink, true);
  }

  tabs.forEach(link => {
    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey) return;
      position(link, false);
    });
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const active = navLinks.querySelector('.nav__link--active');
      if (active && tabs.includes(active)) {
        position(active, true);
      }
    }, 100);
  });
}
