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
    description: 'Led the middle school archery team for 3 years. 2-time District 1st Place Champion (2023, 2024). Completed a Leadership Development Corps program led by a retired military veteran, deepening understanding of leadership principles.',
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
  },
  {
    title: 'Red Cross Club',
    tag: 'Community Service',
    description: 'Active member since 2024, supporting blood drives, disaster preparedness, and health education initiatives within the school and local community.',
    icon: '🩸'
  },
  {
    title: 'Fencing — Mixed Épée',
    tag: 'Athletics',
    description: 'Earned 3rd Place in Mixed Épée Fencing (2023). Developed discipline, strategy, and quick decision-making through competitive fencing.',
    icon: '⚔️'
  },
  {
    title: 'SSI Scuba Diving',
    tag: 'Certification',
    description: 'SSI Certified Freshwater Scuba Diver. Completed open-water training and certification through Scuba Schools International.',
    icon: '🤿'
  },
  {
    title: 'MLS Summer Immersion Program',
    tag: 'UTMB · Clinical Lab Science',
    description: 'Selected for the week-long Medical Laboratory Science Summer Immersion Program at UTMB. Hands-on training in microbiology, hematology, chemistry, blood bank, and molecular biology lab procedures.',
    icon: '🧪'
  },
  {
    title: 'Science & Engineering Fair of Houston',
    tag: 'Research · 2-time Qualifier',
    description: 'Presented independent BSL2 research at SEFH in 2025 (drug-resistant Salmonella study) and 2026 (lung cancer cytotoxicity study). Advanced through district-level competition both years.',
    icon: '🏆'
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
  },
  {
    title: 'Rat Frustration Study',
    tag: 'Behavioral Neuroscience · UTMB',
    description: 'Investigating lever-press duration as a behavioral measure of frustration in rat models of sucrose and drug reinforcement with Dr. Thomas Green at UTMB. Building on prior work showing bar-press duration is an independent behavioral construct distinct from craving.',
    icon: '🐀'
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
    title: 'Helen Hall Public Library',
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

const awards = [
  {
    title: '2nd Place — Biology & Microbiology',
    tag: 'District Science Fair · 2026',
    description: 'Won 2nd Place at the district level for the lung cancer cytotoxicity study on STS-induced stress in A549 cells. Qualified for the Science and Engineering Fair of Houston.',
    icon: '🥈'
  },
  {
    title: 'SEFH Qualifier (x2)',
    tag: 'Science Fair · 2025 & 2026',
    description: 'Qualified for the Science and Engineering Fair of Houston two consecutive years — first for the drug-resistant Salmonella study, then for the lung cancer cytotoxicity study.',
    icon: '🎯'
  },
  {
    title: '4th Place — Biology & Microbiology',
    tag: 'District Science Fair · 2025',
    description: 'Placed 4th at district level for the Ivacaftor–Pentamidine drug repurposing study against drug-resistant Salmonella Typhimurium.',
    icon: '🏅'
  },
  {
    title: 'CCISD Superintendent Scholar',
    tag: 'Academics · 2025',
    description: 'Recognized as a Superintendent Scholar by Clear Creek Independent School District for academic excellence.',
    icon: '📚'
  },
  {
    title: '2nd Place — Engineering Category',
    tag: 'District Science Fair · 2023',
    description: 'Earned 2nd Place in the Engineering category at the district science fair.',
    icon: '⚙️'
  },
  {
    title: 'Archery District Champion (x2)',
    tag: 'Athletics · 2023 & 2024',
    description: 'Two-time District 1st Place Champion in archery, demonstrating consistency, focus, and competitive performance.',
    icon: '🏹'
  },
  {
    title: 'VEX Robotics Worlds Qualifier',
    tag: 'Robotics · 2023',
    description: 'Qualified for the VEX Robotics World Championship after competing at regional and state levels.',
    icon: '🤖'
  },
  {
    title: '3rd Place — Mixed Épée Fencing',
    tag: 'Athletics · 2023',
    description: 'Earned 3rd Place in Mixed Épée Fencing, developing discipline, strategy, and competitive resilience.',
    icon: '⚔️'
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
    volunteer: { data: volunteerActivities, anim: 'card--volunteer' },
    awards: { data: awards, anim: 'card--activities' }
  };
  const cfg = map[category];
  if (cfg) renderCards(containerId, cfg.data, cfg.anim);
}

export { extracurriculars, researchProjects, volunteerActivities, awards };
