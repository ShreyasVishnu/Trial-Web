// Lesson 2 — Real contact form handling with Formspree + 4 states + ARIA
// SPEC (draft — student should review/refine before declaring "done"):
//
//   IDLE       — form ready; submit button enabled; no status shown
//   PENDING    — submit clicked; button disabled + text "Sending…";
//                aria-busy="true" on the button; status region is silent
//   SUCCESS    — 2xx from server; form cleared; success message shown
//                (status region with role="status", aria-live="polite");
//                button re-enabled
//   SERVER ERR — 4xx/5xx response; specific error message ("Couldn't send
//                — please try again or email me directly."); button re-enabled
//   NETWORK    — fetch threw (offline, DNS fail, timeout); DIFFERENT message
//                ("No connection — check your network and try again.");
//                button re-enabled
//
// Plus: inline validation next to each field (no alert() popups), errors
// announced via aria-describedby + aria-invalid, focus moves to the first
// invalid field on submit.

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvjnenz'; // Formspree endpoint for Shreyas Bishnu portfolio

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = form.querySelector('.contact-form__submit');
  const status = document.getElementById('contact-status');

  // --- inline error helpers ---
  const setError = (input, msg) => {
    const errId = `${input.id}-error`;
    let errEl = document.getElementById(errId);
    if (!errEl) {
      errEl = document.createElement('p');
      errEl.id = errId;
      errEl.className = 'contact-form__error';
      input.setAttribute('aria-describedby', errId);
      input.insertAdjacentElement('afterend', errEl);
    }
    if (msg) {
      errEl.textContent = msg;
      input.setAttribute('aria-invalid', 'true');
      errEl.removeAttribute('hidden');
    } else {
      errEl.textContent = '';
      input.removeAttribute('aria-invalid');
      errEl.setAttribute('hidden', '');
    }
  };

  const clearAllErrors = () => {
    setError(nameInput, '');
    setError(emailInput, '');
    setError(messageInput, '');
  };

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validate = () => {
    clearAllErrors();
    let firstInvalid = null;
    if (!nameInput.value.trim()) {
      setError(nameInput, 'Please enter your name.');
      firstInvalid = firstInvalid || nameInput;
    }
    if (!emailInput.value.trim()) {
      setError(emailInput, 'Please enter your email.');
      firstInvalid = firstInvalid || emailInput;
    } else if (!isValidEmail(emailInput.value.trim())) {
      setError(emailInput, 'That email doesn’t look right.');
      firstInvalid = firstInvalid || emailInput;
    }
    if (!messageInput.value.trim()) {
      setError(messageInput, 'Please write a message.');
      firstInvalid = firstInvalid || messageInput;
    }
    return firstInvalid;
  };

  // clear a field's error as the user types
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener('input', () => setError(input, ''));
  });

  // --- submit handler ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstInvalid = validate();
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // PENDING
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'contact-form__status';

    const payload = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        // SUCCESS
        form.reset();
        status.textContent = 'Message sent — I’ll get back to you soon.';
        status.classList.add('contact-form__status--success');
      } else {
        // SERVER ERROR (4xx / 5xx)
        let detail = '';
        try {
          const data = await res.json();
          if (data && data.errors && data.errors.length) {
            detail = ` (${data.errors.map((er) => er.message).join(', ')})`;
          }
        } catch (_) { /* response wasn't JSON; ignore */ }
        status.textContent =
          `Couldn’t send your message${detail ? ' — ' + detail : ' — please try again, or email me directly.'}`;
        status.classList.add('contact-form__status--error');
      }
    } catch (err) {
      // NETWORK ERROR — different message on purpose
      status.textContent =
        'No connection — check your network and try again.';
      status.classList.add('contact-form__status--error');
    } finally {
      // re-enable in both error branches and success
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.textContent = originalLabel;
    }
  });
}
