import { $, $$ } from './utils.js';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const events = [
  { date: '2025-02-08', type: 'milestone', title: 'SEFH Science Fair', detail: 'Qualified for the Science and Engineering Fair of Houston with the lung cancer cytotoxicity study.' },
  { date: '2025-02-12', type: 'research', title: 'BSL2 Lab — Year 2 Begins', detail: 'Started second year of independent cancer biology research on disulfidptosis in A549 cells.' },
  { date: '2025-03-22', type: 'volunteer', title: 'UTMB Hospital Shift', detail: 'Continued hospital volunteering across League City and Clear Lake campuses.' },
  { date: '2025-04-18', type: 'event', title: 'HOSA State Competition', detail: 'Competed at the HOSA state level in biomedical debate.' },
  { date: '2025-05-03', type: 'milestone', title: 'District 2nd Place — Biology', detail: 'Won District 2nd Place in Biology & Microbiology for the lung cancer study.' },
  { date: '2025-05-24', type: 'volunteer', title: 'STEM Siblings — Final Session', detail: 'Wrapped up the semester of after-school STEM mentorship at local elementary schools.' },
  { date: '2025-08-15', type: 'event', title: 'New School Year', detail: 'Started the academic year at Clear Lake High School.' },
  { date: '2025-09-09', type: 'research', title: 'Lab Work Resumes', detail: 'Back in the BSL2 lab continuing the cytotoxicity analysis.' },
  { date: '2025-10-25', type: 'volunteer', title: 'Hospital Volunteer Returns', detail: 'Resumed weekly hospital volunteer shifts for the fall.' },
  { date: '2025-11-14', type: 'event', title: 'Patrol Leader Promotion', detail: 'Recognized as a Patrol Leader within the troop.' },
  { date: '2025-12-06', type: 'research', title: 'Data Analysis Wrap-up', detail: 'Completed data collection and began writing up Year 2 results.' },
  { date: '2026-01-18', type: 'event', title: 'Archery Season Starts', detail: 'Kicked off the spring archery season as team captain.' },
  { date: '2026-02-14', type: 'milestone', title: 'SEFH Qualifier — Year 2', detail: 'Qualified for SEFH again with the updated Year 2 lung cancer study.' },
  { date: '2026-03-07', type: 'research', title: 'SEFH Judging', detail: 'Presented the Year 2 research at the Science and Engineering Fair of Houston.' },
  { date: '2026-04-11', type: 'event', title: 'HOSA State — Spring', detail: 'Spring HOSA state competition in biomedical debate.' },
  { date: '2026-06-15', type: 'milestone', title: 'Summer Lab Start', detail: 'Planned start of a new BSL2 research direction for summer.' },
  { date: '2026-07-04', type: 'event', title: 'Eagle Scout Project Planning', detail: 'Beginning the planning and approval process for the Eagle Scout leadership service project.' },
  { date: '2026-08-01', type: 'volunteer', title: 'Summer Volunteering', detail: 'Summer hospital volunteer shifts continue through the break.' }
];

const upcoming = [
  { date: '2026-08-15', label: 'Aug 2026', title: 'Senior Year Begins', detail: 'Final year at Clear Lake High School — focus on college applications and research publication.' },
  { date: '2026-10-01', label: 'Fall 2026', title: 'Submit Research Paper', detail: 'Write and submit the Year 2 lung cancer cytotoxicity study for publication in a student science journal.' },
  { date: '2026-11-15', label: 'Nov 2026', title: 'Eagle Scout Rank', detail: 'Complete remaining merit badges and leadership service project to achieve the highest rank in Boy Scouts.' },
  { date: '2027-02-01', label: 'Spring 2027', title: 'HOSA Nationals', detail: 'Advance through state competition to qualify for the HOSA International Leadership Conference.' },
  { date: '2027-06-01', label: 'Summer 2027', title: '200+ Volunteer Hours', detail: 'Continue hospital volunteering and community service to reach 200+ total hours before senior year ends.' }
];

function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function eventForDate(key) {
  return events.find(e => e.date === key);
}

function typeColor(t) {
  return {
    milestone: 'var(--color-text)',
    research: 'var(--color-secondary)',
    volunteer: 'var(--color-accent)',
    event: 'var(--color-primary)'
  }[t] || 'var(--color-text)';
}

export function initCalendar() {
  const container = $('#calendar-container');
  if (!container) return;
  const detail = $('#calendar-detail');
  if (!detail) return;

  const today = new Date();
  const todayKey = dateKey(today);
  let selectedKey = null;
  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();

  function renderDetail(key) {
    const e = eventForDate(key);
    if (!e) {
      detail.innerHTML = `
        <div class="calendar__detail-empty">
          <div class="calendar__detail-date-icon">${parseInt(key.split('-')[2], 10)}</div>
          <h4>Nothing on this day</h4>
          <p>Pick a highlighted date to see the highlight.</p>
        </div>
      `;
      return;
    }
    const d = new Date(key + 'T00:00:00');
    const formatted = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    detail.innerHTML = `
      <div class="calendar__detail-card">
        <div class="calendar__detail-type" style="background: ${typeColor(e.type)}">${e.type}</div>
        <div class="calendar__detail-date">${formatted}</div>
        <h4 class="calendar__detail-title">${e.title}</h4>
        <p class="calendar__detail-text">${e.detail}</p>
      </div>
    `;
  }

  function renderMonth(m, y) {
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    let daysHtml = '';
    for (let i = 0; i < firstDay; i++) {
      daysHtml += '<div class="mini-day mini-day--empty"></div>';
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const ev = eventForDate(key);
      const isToday = key === todayKey;
      const isSelected = key === selectedKey;
      const classes = ['mini-day'];
      if (ev) classes.push('mini-day--event');
      if (isToday) classes.push('mini-day--today');
      if (isSelected) classes.push('mini-day--selected');
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayName = dayNames[new Date(y, m, d).getDay()];
      const ariaLabel = `${dayName} ${months[m]} ${d}, ${y}${ev ? ' — ' + ev.title : ''}`;
      daysHtml += `<button class="${classes.join(' ')}" data-key="${key}" aria-label="${ariaLabel}">${d}</button>`;
    }
    return daysHtml;
  }

  function render() {
    const prevMonth = viewMonth === 0 ? { m: 11, y: viewYear - 1 } : { m: viewMonth - 1, y: viewYear };
    const nextMonth = viewMonth === 11 ? { m: 0, y: viewYear + 1 } : { m: viewMonth + 1, y: viewYear };

    container.innerHTML = `
      <div class="calendar__month-nav">
        <button class="calendar__month-btn" data-action="prev" aria-label="Previous month">
          <span class="calendar__month-arrow">&lsaquo;</span>
          <span class="calendar__month-label">${monthsShort[prevMonth.m]}</span>
        </button>
        <h3 class="calendar__month-title">${months[viewMonth]} ${viewYear}</h3>
        <button class="calendar__month-btn" data-action="next" aria-label="Next month">
          <span class="calendar__month-label">${monthsShort[nextMonth.m]}</span>
          <span class="calendar__month-arrow">&rsaquo;</span>
        </button>
      </div>
      <div class="calendar__weekdays">
        <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
      </div>
      <div class="calendar__grid">
        ${renderMonth(viewMonth, viewYear)}
      </div>
      <div class="calendar__legend">
        <span class="calendar__legend-item"><span class="calendar__legend-dot" style="background: var(--color-text)"></span>Milestone</span>
        <span class="calendar__legend-item"><span class="calendar__legend-dot" style="background: var(--color-secondary)"></span>Research</span>
        <span class="calendar__legend-item"><span class="calendar__legend-dot" style="background: var(--color-accent)"></span>Volunteer</span>
        <span class="calendar__legend-item"><span class="calendar__legend-dot" style="background: var(--color-primary)"></span>Event</span>
      </div>
    `;

    container.querySelector('[data-action="prev"]').addEventListener('click', () => {
      if (viewMonth === 0) { viewMonth = 11; viewYear--; } else { viewMonth--; }
      render();
    });
    container.querySelector('[data-action="next"]').addEventListener('click', () => {
      if (viewMonth === 11) { viewMonth = 0; viewYear++; } else { viewMonth++; }
      render();
    });

    $$('[data-key]', container).forEach(btn => {
      btn.addEventListener('click', () => {
        selectedKey = btn.dataset.key;
        render();
        renderDetail(selectedKey);
      });
    });
  }

  // Show the next upcoming event on initial load
  const nextEvent = events.find(e => new Date(e.date) >= today) || events[events.length - 1];
  selectedKey = nextEvent.date;
  viewMonth = new Date(selectedKey).getMonth();
  viewYear = new Date(selectedKey).getFullYear();
  render();
  renderDetail(selectedKey);
}
