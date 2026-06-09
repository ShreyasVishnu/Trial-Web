export const highlights = [
  { date: '2026-03-07', type: 'research', title: 'SEFH Judging', detail: 'Presented the Year 2 lung cancer cytotoxicity study at the Science and Engineering Fair of Houston.' },
  { date: '2026-02-14', type: 'milestone', title: 'SEFH Qualifier — Year 2', detail: 'Qualified for SEFH again with the updated Year 2 lung cancer study.' },
  { date: '2026-01-18', type: 'event', title: 'Archery Season Starts', detail: 'Kicked off the spring archery season as team captain.' },
  { date: '2025-12-06', type: 'research', title: 'Data Analysis Wrap-up', detail: 'Completed data collection and began writing up Year 2 results.' },
  { date: '2025-11-14', type: 'event', title: 'Patrol Leader Promotion', detail: 'Recognized as a Patrol Leader within the troop.' },
  { date: '2025-10-25', type: 'volunteer', title: 'Hospital Volunteer Returns', detail: 'Resumed weekly hospital volunteer shifts for the fall.' },
  { date: '2025-09-09', type: 'research', title: 'Lab Work Resumes', detail: 'Back in the BSL2 lab continuing the cytotoxicity analysis.' },
  { date: '2025-08-15', type: 'event', title: 'New School Year', detail: 'Started the academic year at Clear Lake High School.' },
  { date: '2025-05-03', type: 'milestone', title: 'District 2nd Place — Biology', detail: 'Won District 2nd Place in Biology & Microbiology for the lung cancer study.' },
  { date: '2025-05-24', type: 'volunteer', title: 'STEM Siblings — Final Session', detail: 'Wrapped up the semester of after-school STEM mentorship at local elementary schools.' },
  { date: '2025-04-18', type: 'event', title: 'HOSA State Competition', detail: 'Competed at the HOSA state level in biomedical debate.' },
  { date: '2025-03-22', type: 'volunteer', title: 'UTMB Hospital Shift', detail: 'Continued hospital volunteering across League City and Clear Lake campuses.' },
  { date: '2025-02-12', type: 'research', title: 'BSL2 Lab — Year 2 Begins', detail: 'Started second year of independent cancer biology research on disulfidptosis in A549 cells.' },
  { date: '2025-02-08', type: 'milestone', title: 'SEFH Science Fair', detail: 'Qualified for the Science and Engineering Fair of Houston with the lung cancer cytotoxicity study.' }
];

export const upcoming = [
  { date: '2026-08-15', label: 'Aug 2026', title: 'Senior Year Begins', detail: 'Final year at Clear Lake High School — focus on college applications and research publication.' },
  { date: '2026-10-01', label: 'Fall 2026', title: 'Submit Research Paper', detail: 'Write and submit the Year 2 lung cancer cytotoxicity study for publication in a student science journal.' },
  { date: '2026-11-15', label: 'Nov 2026', title: 'Eagle Scout Rank', detail: 'Complete remaining merit badges and leadership service project to achieve the highest rank in Boy Scouts.' },
  { date: '2027-02-01', label: 'Spring 2027', title: 'HOSA Nationals', detail: 'Advance through state competition to qualify for the HOSA International Leadership Conference.' },
  { date: '2027-06-01', label: 'Summer 2027', title: '200+ Volunteer Hours', detail: 'Continue hospital volunteering and community service to reach 200+ total hours before senior year ends.' }
];

export function typeLabel(t) {
  return {
    milestone: 'Milestone',
    research: 'Research',
    volunteer: 'Volunteer',
    event: 'Event'
  }[t] || t;
}
