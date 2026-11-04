(() => {
  const screen = document.querySelector('#site-preloader');
  const percentLabel = document.querySelector('#preloader-percent');
  const progressRing = document.querySelector('#preloader-ring-progress');
  const innerProgressRing = document.querySelector('#preloader-ring-progress-inner');
  if (!screen || !percentLabel || !progressRing || !innerProgressRing) return;

  const cameFromCasePage = (() => {
    try {
      return new URL(document.referrer).pathname.toLowerCase().endsWith('/case.html');
    } catch {
      return false;
    }
  })();
  const skipForThisVisit = new URLSearchParams(window.location.search).has('skipPreloader') || cameFromCasePage;
  if (skipForThisVisit) {
    screen.remove();
    return;
  }

  const visitKey = 'portfolio-preloader-seen';
  let hasSeenPreloader = false;
  try {
    hasSeenPreloader = sessionStorage.getItem(visitKey) === '1';
    if (!hasSeenPreloader) sessionStorage.setItem(visitKey, '1');
  } catch {
    // The preloader still works if browser storage is unavailable.
  }

  if (hasSeenPreloader) {
    screen.remove();
    return;
  }

  document.body.classList.add('is-preloading');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tickDuration = reducedMotion ? 4 : 32;
  const outerCircumference = 2 * Math.PI * 126;
  const innerCircumference = 2 * Math.PI * 102;
  let progress = 0;
  progressRing.style.strokeDasharray = `${outerCircumference}`;
  innerProgressRing.style.strokeDasharray = `${innerCircumference}`;
  percentLabel.textContent = '0%';

  const progressTimer = window.setInterval(() => {
    progress = Math.min(100, progress + 1);
    percentLabel.textContent = `${progress}%`;
    progressRing.style.strokeDashoffset = `${outerCircumference * (1 - progress / 100)}`;
    innerProgressRing.style.strokeDashoffset = `${innerCircumference * (1 - progress / 100)}`;
    if (progress < 100) return;

    window.clearInterval(progressTimer);
    screen.setAttribute('aria-label', 'Portfolio loaded');
    screen.classList.add('is-opening');
    window.setTimeout(() => {
      screen.remove();
      document.body.classList.remove('is-preloading');
    }, reducedMotion ? 100 : 800);
  }, tickDuration);
})();
