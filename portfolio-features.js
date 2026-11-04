(() => {
  const dialog = document.querySelector('#about-dialog');
  document.querySelector('[data-open-about]')?.addEventListener('click', (event) => {
    event.preventDefault();
    dialog?.showModal();
  });
  dialog?.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  if (new URLSearchParams(location.search).has('about')) dialog?.showModal();
  const year = document.querySelector('#copyright-year');
  if (year) year.textContent = new Date().getFullYear();
})();
