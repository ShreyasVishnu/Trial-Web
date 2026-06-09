import { $ } from './utils.js';

const extracurriculars = [
  {
    title: 'HOSA — Future Health Professionals',
    tag: 'Health',
    description: 'Active member for 2 years. Participated in Health Education Competition. Exploring healthcare careers through competitive events and leadership development.',
    icon: '🏥'
  },
  {
    title: 'Science National Honor Society',
    tag: 'Academics',
    description: 'Member committed to academic excellence in science and promoting scientific literacy within the school community.',
    icon: '🔬'
  },
  {
    title: 'Archery Team Captain',
    tag: 'Athletics · Leadership',
    description: 'Led the middle school archery team for 3 years. 2-time District 1st Place Champion. Promoted confidence, adaptability, and a growth mindset among teammates.',
    icon: '🏹'
  },
  {
    title: 'Boy Scouts — Patrol Leader',
    tag: 'Leadership',
    description: 'Served as Patrol Leader, responsible for patrol welfare, troop planning, and mentoring younger scouts through rank advancement. Represented patrol at PLC meetings.',
    icon: '⚜️'
  },
  {
    title: 'VEX Robotics',
    tag: 'Robotics',
    description: 'Worlds VEX Robotics Qualifier (2023). Designed, built, and programmed competitive robots for regional and world-level competitions.',
    icon: '🤖'
  },
  {
    title: 'Symphony Orchestra',
    tag: 'Music',
    description: 'Performed as a member of the Clear Lake High School Symphony Orchestra, developing discipline and ensemble musicianship.',
    icon: '🎻'
  },
  {
    title: 'Indian Culture Club — Bhangra',
    tag: 'Culture',
    description: 'Bhangra dance performer for school cultural showcases in 2025 and 2026, celebrating and sharing Indian heritage.',
    icon: '💃'
  },
  {
    title: 'Badminton & Table Tennis Club',
    tag: 'Athletics',
    description: 'Active member at CLHS, participating in recreational and competitive play.',
    icon: '🏸'
  }
];

const researchProjects = [
  {
    title: 'Lung Cancer Cytotoxicity Study (Year 2)',
    tag: 'Cancer Biology · 150+ Hours',
    description: 'Examined whether silver thiosulfate (STS) induces cytotoxicity through disulfidptosis in A549 human lung cancer cells. Confirmed STS generates cytotoxic stress via an uncharacterized mechanism. Won District 2nd Place in Biology & Microbiology and qualified for the Science and Engineering Fair of Houston.',
    icon: '🧬'
  },
  {
    title: 'Drug Repurposing & Antimicrobial Study (Year 1)',
    tag: 'Microbiology · BSL2',
    description: 'Investigated Ivacaftor and Auranofin as treatments for drug-resistant Salmonella Typhimurium. Found Auranofin reduced bacterial growth ~70% at 128 µg/ml. Ivacaftor–Pentamidine combination achieved >75% growth reduction. Won District 4th Place and qualified for SEFH.',
    icon: '🦠'
  }
];

const volunteerActivities = [
  {
    title: 'UTMB Hospital Volunteer',
    tag: 'Healthcare · 25 Hours',
    description: 'Volunteered across the League City and Clear Lake campuses. Gained direct exposure to hospital operations, patient-centered environments, and the day-to-day of healthcare delivery.',
    icon: '🏥'
  },
  {
    title: 'STEM Siblings Club — Mentor',
    tag: 'Mentorship · 60+ Hours',
    description: 'Visited local elementary schools after school hours leading hands-on STEM activities and experiments. Planned age-appropriate projects to spark curiosity and enthusiasm for science in young students.',
    icon: '🧪'
  },
  {
    title: 'Houston Food Bank',
    tag: 'Community Service · 11+ Hours',
    description: 'Regular volunteer supporting community nutrition efforts through sorting, packing, and distributing food to families in need.',
    icon: '🥫'
  },
  {
    title: 'Earth Club — Environmental Cleanup',
    tag: 'Environment · 20 Hours',
    description: 'Participated in community cleanups and conservation efforts to promote environmental stewardship and sustainability.',
    icon: '🌿'
  },
  {
    title: 'Helen Hallel Public Library',
    tag: 'Community Service · 10 Hours',
    description: 'Volunteered at the local library, supporting community programs and library operations.',
    icon: '📚'
  },
  {
    title: 'Eagle Scout Service Project',
    tag: 'Service · 4 Hours',
    description: 'Assembled an educational magnetic puzzle set donated to a local elementary school as part of a fellow Scout\'s Eagle Scout service project.',
    icon: '🧩'
  }
];

function renderCards(containerId, items, animClass) {
  const container = $(`#${containerId}`);
  if (!container) return;
  container.innerHTML = items.map((item, index) => `
    <article class="card animate-on-scroll ${animClass}" style="animation-delay: ${index * 0.1}s">
      <span class="card__icon">${item.icon}</span>
      <h3 class="card__title">${item.title}</h3>
      <span class="card__tag">${item.tag}</span>
      <p class="card__text">${item.description}</p>
    </article>
  `).join('');
}

export function renderCategoryCards(containerId, category) {
  const map = {
    activities: { data: extracurriculars, anim: 'card--activities' },
    research: { data: researchProjects, anim: 'card--research' },
    volunteer: { data: volunteerActivities, anim: 'card--volunteer' }
  };
  const cfg = map[category];
  if (cfg) renderCards(containerId, cfg.data, cfg.anim);
}

export { extracurriculars, researchProjects, volunteerActivities };
