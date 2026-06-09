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
    volunteer: { title: 'Volunteer & Community Service', subtitle: 'Giving back to my community' }
  };

  function showCategory(category) {
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

  function showBranch() {
    content.classList.remove('content-visible');

    setTimeout(() => {
      content.style.display = 'none';
      branch.style.display = 'block';
      void branch.offsetWidth;
      branch.classList.remove('branch-hidden');
    }, 300);
  }

  $$('.branch-card').forEach(card => {
    card.addEventListener('click', () => showCategory(card.dataset.category));
  });

  backBtn.addEventListener('click', showBranch);
}
