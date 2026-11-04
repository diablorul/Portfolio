(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');

  revealItems.forEach((item) => {
    if (item.dataset.delay) item.style.setProperty('--delay', `${item.dataset.delay}ms`);
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const projectRows = document.querySelectorAll('.project-grid--figma .project-row');
  projectRows.forEach((row) => {
    row.querySelectorAll('.project.reveal').forEach((project, index) => {
      project.style.setProperty('--delay', `${index * 100}ms`);
    });
  });

  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.project-grid--figma .project').forEach((project) => {
      const visual = project.querySelector('.project-visual');
      if (!visual) return;

      let active = false;
      let targetX = 0, targetY = 0;
      let x = 0, y = 0, velocityX = 0, velocityY = 0, frame = 0;

      const animateMedia = () => {
        velocityX = (velocityX + (targetX - x) * .16) * .68;
        velocityY = (velocityY + (targetY - y) * .16) * .68;
        x += velocityX;
        y += velocityY;
        visual.style.setProperty('--media-x', `${x.toFixed(2)}px`);
        visual.style.setProperty('--media-y', `${y.toFixed(2)}px`);

        if (active || Math.abs(targetX - x) > .04 || Math.abs(targetY - y) > .04 || Math.abs(velocityX) > .04 || Math.abs(velocityY) > .04) {
          frame = requestAnimationFrame(animateMedia);
        } else {
          x = 0; y = 0; velocityX = 0; velocityY = 0;
          visual.style.removeProperty('--media-x');
          visual.style.removeProperty('--media-y');
          frame = 0;
        }
      };

      project.addEventListener('pointerenter', () => {
        active = true;
        if (!frame) frame = requestAnimationFrame(animateMedia);
      });
      project.addEventListener('pointermove', (event) => {
        const rect = visual.getBoundingClientRect();
        targetX = ((event.clientX - rect.left) / rect.width - .5) * 11;
        targetY = ((event.clientY - rect.top) / rect.height - .5) * 9;
        if (!frame) frame = requestAnimationFrame(animateMedia);
      }, { passive: true });
      project.addEventListener('pointerleave', () => {
        active = false;
        targetX = 0; targetY = 0;
        if (!frame) frame = requestAnimationFrame(animateMedia);
      });
    });
  }

  const phraseLeading = document.querySelector('#phrase-leading');
  const phraseFollowing = document.querySelector('#phrase-following');
  const phraseAmp = document.querySelector('#phrase-amp');
  const heroTitle = document.querySelector('#hero-title');
  if (phraseLeading && phraseFollowing && phraseAmp && heroTitle) {
    const phrases = [
      ['Product', 'Visual Design'],
      ['Digital', 'Visual Design'],
      ['Product', 'Interface Design'],
      ['Strategy', 'Design'],
      ['Brand', 'Digital Design'],
      ['Creative', 'Product Design'],
      ['Interface', 'Visual Design'],
      ['Concept', 'Visual Design'],
      ['Product', 'Interaction Design']
    ];
    let phraseIndex = 0;
    let accentLeading = true;
    phraseLeading.classList.add('is-accent');
    const schedulePhrase = () => setTimeout(() => {
      heroTitle.classList.add('is-swapping');
      setTimeout(() => {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        phraseLeading.textContent = phrases[phraseIndex][0];
        phraseFollowing.textContent = phrases[phraseIndex][1];
        accentLeading = !accentLeading;
        phraseLeading.classList.toggle('is-accent', accentLeading);
        phraseFollowing.classList.toggle('is-accent', !accentLeading);
        heroTitle.getBoundingClientRect();
        heroTitle.classList.remove('is-swapping');
        schedulePhrase();
      }, 620);
    }, 5000);
    schedulePhrase();
  }
  const clock = document.querySelector('#local-time');
  if (clock) {
    const updateClock = () => {
      clock.textContent = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Kyiv', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
    };
    updateClock();
    setInterval(updateClock, 60_000);
  }
})();









