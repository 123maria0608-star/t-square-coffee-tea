(function () {
  const businessName = window.businessDemoName || document.title;

  document.querySelectorAll('[data-open-modal]').forEach((button) => {
    button.addEventListener('click', () => {
      const modal = document.getElementById(button.dataset.openModal);
      if (modal) modal.classList.add('open');
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (modal) modal.classList.remove('open');
    });
  });

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.classList.remove('open');
    });
  });

  document.querySelectorAll('.modal form').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const status = form.querySelector('.status');
      const payload = { business: businessName, request_type: form.dataset.requestType };
      new FormData(form).forEach((value, key) => {
        payload[key] = value;
      });
      status.textContent = 'Sending...';
      try {
        const response = await fetch('https://formspree.io/f/mjgpndvy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('Formspree request failed');
        status.textContent = 'Update sent successfully.';
        form.reset();
      } catch (error) {
        status.textContent = 'Could not send update right now.';
      }
    });
  });
})();
