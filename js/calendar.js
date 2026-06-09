import { $, onReady } from './utils.js';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function initCalendar() {
  const container = $('#calendar-container');
  if (!container) return;

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  function render() {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();

    let daysHtml = '';
    for (let i = 0; i < firstDay; i++) {
      daysHtml += '<div class="calendar__day calendar__day--empty"></div>';
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
      daysHtml += `<div class="calendar__day ${isToday ? 'calendar__day--today' : ''}">${d}</div>`;
    }

    container.innerHTML = `
      <div class="calendar__header">
        <button class="calendar__nav calendar__nav--prev" aria-label="Previous month">&lsaquo;</button>
        <h3 class="calendar__month">${months[currentMonth]} ${currentYear}</h3>
        <button class="calendar__nav calendar__nav--next" aria-label="Next month">&rsaquo;</button>
      </div>
      <div class="calendar__weekdays">
        ${days.map(d => `<div class="calendar__weekday">${d}</div>`).join('')}
      </div>
      <div class="calendar__grid">
        ${daysHtml}
      </div>
    `;

    container.querySelector('.calendar__nav--prev').addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) { currentMonth = 11; currentYear--; }
      render();
    });

    container.querySelector('.calendar__nav--next').addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) { currentMonth = 0; currentYear++; }
      render();
    });
  }

  render();
}
