const TAB_ORDER = ['index.html', 'about.html', 'extracurriculars.html', 'contact.html'];
const DURATIONS = [0, 350, 480, 620];

export function initTransitions() {
  const bar = createGlassBar();
  document.body.appendChild(bar);

  const main = document.querySelector('main');
  let transitioning = false;

  const savedDir = sessionStorage.getItem('pg-dir');
  if (savedDir) {
    sessionStorage.removeItem('pg-dir');
    if (main) main.classList.add(`page-enter--${savedDir}`);
    bar.classList.add(`glass-bar--enter-${savedDir}`);
  }

  document.addEventListener('click', (e) => {
    if (transitioning) return;

    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    if (
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      href.startsWith('tel') ||
      href.startsWith('#') ||
      link.hasAttribute('download')
    ) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const targetHref = href.split('#')[0] || 'index.html';
    if (currentPage === targetHref) return;

    const curIdx = TAB_ORDER.indexOf(currentPage);
    const tgtIdx = TAB_ORDER.indexOf(targetHref);
    if (curIdx === -1 || tgtIdx === -1) return;

    const dist = Math.abs(tgtIdx - curIdx);
    const forward = tgtIdx > curIdx;
    const dir = forward ? 'forward' : 'backward';
    const dur = DURATIONS[Math.min(dist, DURATIONS.length - 1)];

    e.preventDefault();
    transitioning = true;

    if (main) {
      main.style.setProperty('--exit-dur', `${dur}ms`);
      main.classList.add(`page-exit--${dir}`);
    }

    bar.style.setProperty('--bar-dur', `${dur}ms`);
    bar.classList.add(`glass-bar--exit-${dir}`);

    setTimeout(() => {
      sessionStorage.setItem('pg-dir', dir);
      window.location.href = href;
    }, dur);
  });
}

function createGlassBar() {
  const el = document.createElement('div');
  el.className = 'glass-bar';
  el.setAttribute('aria-hidden', 'true');
  return el;
}
