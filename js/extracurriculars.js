import { $, $$ } from './utils.js';
import { renderCategoryCards } from './projects.js';

export function initExtracurriculars() {
  const branch = $('#extras-branch');
  const content = $('#extras-content');
  const grid = $('#extras-grid');
  const title = $('#extras-category-title');
  const subtitle = $('#extras-category-subtitle');
  const backBtn = $('#back-to-branch');

  if (!branch) return;

  const meta = {
    activities: { title: 'Activities', subtitle: 'Clubs, teams, and leadership' },
    research: { title: 'Research', subtitle: 'BSL2 lab — 2 years of independent investigation' },
    volunteer: { title: 'Volunteer & Community Service', subtitle: 'Giving back to my community' },
    awards: { title: 'Awards & Honors', subtitle: 'Science fair, athletics, and academic recognition' }
  };

  function showCategory(category) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    backBtn.classList.remove('back-btn--compact');
    const cards = $$('.branch-card', branch);

    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.04}s`;
      card.classList.add('branch-card--exiting');
    });

    branch.classList.add('branch-hidden');

    setTimeout(() => {
      branch.style.display = 'none';
      cards.forEach(c => {
        c.classList.remove('branch-card--exiting');
        c.style.transitionDelay = '';
      });

      content.style.display = 'block';
      void content.offsetWidth;
      content.classList.add('content-visible');

      title.textContent = meta[category].title;
      subtitle.textContent = meta[category].subtitle;
      grid.innerHTML = '';

      renderCategoryCards('extras-grid', category);

      requestAnimationFrame(() => {
        const animEls = grid.querySelectorAll('.animate-on-scroll');
        animEls.forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 100 + 100);
        });
      });
    }, 350);
  }

  let scrollCleanup = null;

  function showBranch() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    content.classList.remove('content-visible');
    if (scrollCleanup) { scrollCleanup(); scrollCleanup = null; }

    setTimeout(() => {
      content.style.display = 'none';
      branch.style.display = 'block';
      void branch.offsetWidth;
      branch.classList.remove('branch-hidden');
    }, 300);
  }

  function initBackButtonScroll() {
    const threshold = 60;
    function onScroll() {
      backBtn.classList.toggle('back-btn--compact', window.scrollY > threshold);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    scrollCleanup = () => window.removeEventListener('scroll', onScroll);
  }

  $$('.branch-card').forEach(card => {
    card.addEventListener('click', () => showCategory(card.dataset.category));
  });

  backBtn.addEventListener('click', showBranch);

  initBackButtonScroll();
}
