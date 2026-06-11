import { $, $$, onReady } from './utils.js';

const TAB_ORDER = ['index.html', 'about.html', 'extracurriculars.html', 'contact.html'];
const DURATIONS = [0, 400, 520, 640];

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

  const main = document.querySelector('main');
  let navigating = false;

  function position(link) {
    const linkRect = link.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();
    const x = linkRect.left - navRect.left;

    indicator.style.setProperty('--indicator-x', `${x}px`);
    indicator.style.setProperty('--indicator-w', `${linkRect.width}px`);
  }

  function positionInstant(link) {
    indicator.style.transition = 'none';
    position(link);
    indicator.offsetHeight;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        indicator.style.transition = '';
      });
    });
  }

  function setActive(link) {
    tabs.forEach(t => t.classList.remove('nav__link--active'));
    link.classList.add('nav__link--active');
  }

  const activeLink = navLinks.querySelector('.nav__link--active');
  if (activeLink && tabs.includes(activeLink)) {
    positionInstant(activeLink);
  }

  tabs.forEach(link => {
    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      if (navigating) return;
      const href = link.getAttribute('href');
      if (!href) return;

      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const targetHref = href.split('#')[0] || 'index.html';

      setActive(link);
      position(link);

      if (currentPage === targetHref) return;

      navigating = true;

      const curIdx = TAB_ORDER.indexOf(currentPage);
      const tgtIdx = TAB_ORDER.indexOf(targetHref);
      if (curIdx === -1 || tgtIdx === -1) return;

      const dist = Math.abs(tgtIdx - curIdx);
      const forward = tgtIdx > curIdx;
      const dir = forward ? 'forward' : 'backward';
      const dur = DURATIONS[Math.min(dist, DURATIONS.length - 1)];

      if (main) {
        main.style.setProperty('--enter-dur', `${dur}ms`);
        main.style.setProperty('--exit-dur', `${dur}ms`);
        main.classList.add(`page-exit--${dir}`);
      }

      setTimeout(() => {
        sessionStorage.setItem('pg-dir', dir);
        window.location.href = href;
      }, dur);
    });
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const active = navLinks.querySelector('.nav__link--active');
      if (active && tabs.includes(active)) {
        position(active);
      }
    }, 100);
  });
}
