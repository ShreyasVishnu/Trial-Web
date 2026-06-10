// Lesson 3 — three smoke tests the student wrote the spec for.
//
// Spec 1: every nav link leads to a page that has a heading (no broken nav).
// Spec 2: the theme toggle flips the theme and it survives a reload.
// Spec 3: submitting the contact form empty shows a validation error.

import { test, expect } from '@playwright/test';

const NAV_LINKS = [
  { name: 'Home', href: 'index.html', heading: /Shreyas Bishnu|Computer Vision/ },
  { name: 'About', href: 'about.html', heading: /About|Shreyas/ },
  { name: 'Extracurriculars', href: 'extracurriculars.html', heading: /Extracurriculars/ },
  { name: 'Contact', href: 'contact.html', heading: /Contact/ },
];

test.describe('Smoke tests', () => {
  test('every nav link leads to a page with a heading', async ({ page }) => {
    for (const link of NAV_LINKS) {
      await page.goto(link.href);
      // Page should have a non-empty <h1> or <h2>
      const heading = page.locator('h1, h2').first();
      await expect(heading, `${link.name} (${link.href}) has a heading`).toBeVisible();
      const text = (await heading.textContent()) ?? '';
      expect(text.trim().length, `${link.href} heading is non-empty`).toBeGreaterThan(0);
    }
  });

  test('theme toggle flips the theme and it survives a reload', async ({ page }) => {
    await page.goto('index.html');

    // Read the initial theme from <html data-theme="...">
    const initialTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme') || 'dark'
    );

    // Click the theme toggle
    await page.locator('#theme-toggle').click();

    // The new theme should be the opposite
    const newTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme') || 'dark'
    );
    expect(newTheme, 'theme changed after click').not.toBe(initialTheme);

    // Reload — the new theme should still be there
    await page.reload();
    const persistedTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme') || 'dark'
    );
    expect(persistedTheme, 'theme persisted across reload').toBe(newTheme);
  });

  test('submitting the contact form empty shows a validation error', async ({ page }) => {
    await page.goto('contact.html');

    // Submit without filling anything
    await page.locator('button.contact-form__submit').click();

    // The name field should now be marked invalid
    const nameInput = page.locator('#contact-name');
    await expect(nameInput).toHaveAttribute('aria-invalid', 'true');

    // An error message should be visible
    const errorMsg = page.locator('#contact-name-error');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText(/name/i);
  });
});
