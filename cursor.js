(() => {
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reducedMotion) return;

  const cursor = document.createElement('div');
  cursor.className = 'site-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span class="site-cursor-label">Explore</span>';
  document.body.append(cursor);
  document.body.classList.add('has-custom-cursor');

  const interactiveSelector = 'a,button,[role="button"],input[type="submit"],.project,.case-cover';
  let pointerX = -100;
  let pointerY = -100;
  let cursorX = pointerX;
  let cursorY = pointerY;
  let target = null;
  let frame = 0;

  const scheduleFrame = () => {
    if (!frame) frame = requestAnimationFrame(animate);
  };

  const animate = () => {
    const rect = target?.getBoundingClientRect();
    let desiredX = pointerX;
    let desiredY = pointerY;

    if (rect && rect.width && rect.height) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const maxPull = 18;
      desiredX += Math.max(-maxPull, Math.min(maxPull, (centerX - pointerX) * .12));
      desiredY += Math.max(-maxPull, Math.min(maxPull, (centerY - pointerY) * .12));
    }

    const ease = target ? .46 : .42;
    cursorX += (desiredX - cursorX) * ease;
    cursorY += (desiredY - cursorY) * ease;
    const topLayerDialog = cursor.parentElement?.matches('dialog[open]') ? cursor.parentElement : null;
    const dialogRect = topLayerDialog?.getBoundingClientRect();
    cursor.style.setProperty('--cursor-x', `${(cursorX - (dialogRect?.left || 0)).toFixed(2)}px`);
    cursor.style.setProperty('--cursor-y', `${(cursorY - (dialogRect?.top || 0)).toFixed(2)}px`);
    if (Math.abs(desiredX - cursorX) > .08 || Math.abs(desiredY - cursorY) > .08) {
      frame = requestAnimationFrame(animate);
    } else {
      frame = 0;
    }
  };

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    cursor.classList.add('is-visible');
    scheduleFrame();
  }, { passive: true });

  document.addEventListener('pointerover', (event) => {
    const next = event.target instanceof Element ? event.target.closest(interactiveSelector) : null;
    if (next === target) return;
    target = next;
    cursor.classList.toggle('is-interactive', Boolean(target));
    cursor.classList.toggle('is-project', Boolean(target?.matches('.project')));
    scheduleFrame();
  });

  document.addEventListener('pointerout', (event) => {
    if (!target || !(event.target instanceof Element) || !target.contains(event.target)) return;
    if (event.relatedTarget instanceof Node && target.contains(event.relatedTarget)) return;
    target = null;
    cursor.classList.remove('is-interactive', 'is-project');
    scheduleFrame();
  });

  window.addEventListener('pointerdown', () => cursor.classList.add('is-pressed'), { passive: true });
  window.addEventListener('pointerup', () => cursor.classList.remove('is-pressed'), { passive: true });
  document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
  document.addEventListener('pointerenter', () => cursor.classList.add('is-visible'));
  window.addEventListener('scroll', scheduleFrame, { passive: true });

  const syncCursorWithTopLayer = () => {
    const openDialog = document.querySelector('dialog[open]');
    const destination = openDialog || document.body;
    if (cursor.parentElement !== destination) destination.append(cursor);
    scheduleFrame();
  };
  const topLayerObserver = new MutationObserver(syncCursorWithTopLayer);
  topLayerObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] });
})();
