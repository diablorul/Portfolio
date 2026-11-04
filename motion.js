(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = document.querySelector('.motion-track-stage');
  const intro = document.querySelector('.intro-section');
  const work = document.querySelector('.work');
  const thread = document.querySelector('.scroll-thread');
  const threadMaskPath = document.querySelector('.scroll-thread-mask-path');
  const threadArtPath = document.querySelector('.scroll-thread-art');
  const silkCanvas = document.querySelector('.motion-silk-canvas');
  const cleanup = [];
  const lineProgress = { value: 0 };
  const track = { width: 1920, height: 1974, startY: 7.693, endY: 1859.39, top: 0, scale: 1, samples: [] };
  const trackCenterline = 'M -13.805 7.693 C 182.6685 57.0639 376.777 149.373 529.738 255.727 C 682.699 374.225 794.513 493.342 820.9405 607.542 C 846.72 664.71 842.86 722.156 811.5 774.386 C 714 861 589 882 502.3865 861.246 C 458.805 850.8 424.421 829.882 406.95 801.975 C 389.48 774.07 388.925 739.169 406.22 696.514 C 442.637 653.486 481.2265 612.642 535.6855 589.484 C 590.144 566.327 660.472 560.856 753.5845 584.3245 C 1035.5 668.64 1164.58 759.52 1229.885 853.1815 C 1295.185 946.848 1296.71 1043.305 1248.5 1117.89 C 1199.375 1193.89 1148.435 1241.48 1098.45 1272.47 C 1048.475 1303.465 999.45 1317.855 954.166 1327.45 C 931.5235 1332.245 909.8155 1335.845 889.388 1339.72 C 868.961 1343.59 849.815 1347.74 832.2965 1353.645 C 797.26 1365.45 768.736 1384.265 749.5 1421.89 C 685.21 1547.64 674.085 1734.135 834.783 1850.635 C 915.1315 1920.89 1038.435 1949.635 1219.53 1956.54 C 1400.62 1963.82 1639.5 1936.51 1951 1859.39';
  let trackPathLength = 1;
  let scheduleTrackReveal = () => {};

  const positionThread = () => {
    if (!stage || !intro || !work || !thread || !threadMaskPath || !threadArtPath) return;
    threadMaskPath.setAttribute('d', trackCenterline);
    threadArtPath.setAttribute('d', trackCenterline);
    const visualFrame = intro.querySelector('.intro-visual');
    if (visualFrame) {
      const frameWidth = visualFrame.clientWidth;
      const frameRatio = window.matchMedia('(max-width: 640px)').matches ? 1.7 : 2.02;
      const expandedHeight = Math.round(frameWidth / frameRatio + 150);
      if (frameWidth && Math.abs(visualFrame.getBoundingClientRect().height - expandedHeight) > 1) {
        visualFrame.style.aspectRatio = 'auto';
        visualFrame.style.height = `${expandedHeight}px`;
      }
    }
    const stageRect = stage.getBoundingClientRect();
    const hero = stage.querySelector('.hero');
    const heroRect = hero?.getBoundingClientRect();
    const scale = thread.clientWidth / track.width;
    const startDocumentY = (heroRect?.top ?? 0) + window.scrollY + Math.max(20, window.innerHeight * .57);
    const stageDocumentTop = stageRect.top + window.scrollY;
    track.scale = scale || 1;
    track.top = startDocumentY - stageDocumentTop - track.startY * track.scale;
    thread.style.top = `${track.top}px`;
    trackPathLength = threadMaskPath.getTotalLength();
    threadMaskPath.style.strokeDasharray = `${trackPathLength}`;
    threadMaskPath.style.strokeDashoffset = `${trackPathLength * (1 - lineProgress.value)}`;
    const sampleCount = 1800;
    track.samples = Array.from({ length: sampleCount + 1 }, (_, index) => {
      const progress = index / sampleCount;
      const point = threadMaskPath.getPointAtLength(trackPathLength * progress);
      return { progress, y: point.y };
    });
    scheduleTrackReveal();
  };

  positionThread();
  requestAnimationFrame(positionThread);
  window.addEventListener('load', positionThread, { once: true });
  window.addEventListener('resize', positionThread, { passive: true });
  cleanup.push(() => window.removeEventListener('resize', positionThread));
  if ('ResizeObserver' in window && intro && work) {
    const resizeObserver = new ResizeObserver(positionThread);
    resizeObserver.observe(intro);
    resizeObserver.observe(work);
    cleanup.push(() => resizeObserver.disconnect());
  }

  const initTrackReveal = () => {
    if (!stage || !thread || !threadMaskPath || !intro || reduceMotion) return;
    const firstLine = intro.querySelector('.intro-title span');
    const lineShift = window.matchMedia('(max-width: 760px)').matches ? 24 : 62;
    let raf = 0;
    let previousFrame = 0;
    const draw = (now) => {
      raf = 0;
      const stageDocumentTop = window.scrollY + stage.getBoundingClientRect().top;
      const trackTopDocumentY = stageDocumentTop + track.top;
      const aimedDocumentY = window.scrollY + window.innerHeight * .57;
      const targetY = (aimedDocumentY - trackTopDocumentY) / track.scale;
      let targetProgress = lineProgress.value;
      let bestScore = Infinity;
      for (const sample of track.samples) {
        const score = Math.abs(sample.y - targetY) + Math.abs(sample.progress - lineProgress.value) * 120;
        if (score < bestScore) {
          bestScore = score;
          targetProgress = sample.progress;
        }
      }
      const workDocumentTop = window.scrollY + work.getBoundingClientRect().top;
      const finishStart = workDocumentTop - window.innerHeight * 1.55;
      const finishEnd = workDocumentTop - window.innerHeight * .68;
      const finishProgress = Math.max(0, Math.min(1, (window.scrollY - finishStart) / Math.max(1, finishEnd - finishStart)));
      targetProgress = Math.max(targetProgress, finishProgress);
      const elapsed = Math.min(50, Math.max(1, previousFrame ? now - previousFrame : 16));
      previousFrame = now;
      const smoothing = 1 - Math.exp(-(elapsed / 1000) / .035);
      lineProgress.value += (targetProgress - lineProgress.value) * smoothing;
      threadMaskPath.style.strokeDashoffset = `${trackPathLength * (1 - lineProgress.value)}`;
      if (firstLine) firstLine.style.transform = `translate3d(${(lineShift * lineProgress.value).toFixed(2)}px,0,0)`;
      thread.classList.add('is-ready');
      if (Math.abs(targetProgress - lineProgress.value) > .00015) raf = requestAnimationFrame(draw);
      else previousFrame = 0;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(draw); };
    scheduleTrackReveal = schedule;
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    cleanup.push(() => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    });
    schedule();
  };
  initTrackReveal();

  const initSilk = () => {
    if (!silkCanvas) return;
    const gl = silkCanvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;

    const vertexSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main(){
        v_uv = a_position * .5 + .5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;
    const fragmentSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform float u_time;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p);
        f=f*f*(3.0-2.0*f);
        return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);
      }
      float fbm(vec2 p){
        float v=0.0, a=.5;
        for(int i=0;i<5;i++){
          v += a*noise(p);
          p = mat2(1.62,-1.18,1.18,1.62)*p + 7.13;
          a *= .5;
        }
        return v;
      }
      void main(){
        vec2 uv=gl_FragCoord.xy/u_resolution.xy;
        vec2 p=(uv-.5)*vec2(u_resolution.x/u_resolution.y,1.0);
        float t=u_time*.115;
        vec2 drift=vec2(t*.62,-t*.37);
        vec2 warp=vec2(fbm(p*1.8+drift),fbm(p*1.8+vec2(4.7,-2.4)-drift*.82));
        vec2 q=p*2.45 + (warp-.5)*1.48;
        q += .18*vec2(sin(q.y*1.8+t),cos(q.x*1.55-t*.8));
        float field=fbm(q+drift*.48);
        float folds=1.0-abs(sin((field*5.4 + q.x*.48 - q.y*.32)*3.14159));
        float silk=pow(clamp(folds,0.0,1.0),10.0);
        float broad=fbm(q*.62+vec2(-t*.24,t*.31));
        vec3 c0=vec3(.020,.025,.098);
        vec3 c1=vec3(.196,.224,.945);
        vec3 c2=vec3(.349,.373,.922);
        vec3 color=mix(c0,c1,smoothstep(.28,.78,field+broad*.25)*.74);
        color=mix(color,c2,silk*.48);
        float sheen=smoothstep(.72,.97,1.0-abs(field-.57+warp.x*.12));
        color += vec3(.22,.24,.55)*sheen*.22;
        float vignette=1.0-smoothstep(.18,1.0,length((uv-.5)*vec2(.9,1.0)));
        color *= .68 + .32*vignette;
        gl_FragColor=vec4(color,1.0);
      }
    `;

    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertex || !fragment) return;
    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, 'u_resolution');
    const time = gl.getUniformLocation(program, 'u_time');
    const pixelRatio = () => Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1 : 1.5);
    const resizeCanvas = () => {
      const rect = silkCanvas.getBoundingClientRect();
      const ratio = pixelRatio();
      const width = Math.max(1, Math.round(rect.width * ratio));
      const height = Math.max(1, Math.round(rect.height * ratio));
      if (silkCanvas.width !== width || silkCanvas.height !== height) {
        silkCanvas.width = width;
        silkCanvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    let visible = false;
    let frame = 0;
    const startedAt = performance.now();
    const render = () => {
      frame = 0;
      if (!visible && !reduceMotion) return;
      resizeCanvas();
      gl.uniform2f(resolution, silkCanvas.width, silkCanvas.height);
      gl.uniform1f(time, reduceMotion ? 0 : (performance.now() - startedAt) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (visible && !reduceMotion) frame = requestAnimationFrame(render);
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && document.visibilityState === 'visible';
      if (visible && !frame) frame = requestAnimationFrame(render);
      if (!visible && frame) { cancelAnimationFrame(frame); frame = 0; }
    }, { threshold: .01 });
    visibilityObserver.observe(silkCanvas);
    const resizeObserver = new ResizeObserver(() => { resizeCanvas(); if (visible && !frame) frame = requestAnimationFrame(render); });
    resizeObserver.observe(silkCanvas);
    if (reduceMotion) requestAnimationFrame(render);
    const onVisibility = () => {
      visible = document.visibilityState === 'visible' && silkCanvas.getBoundingClientRect().bottom > 0 && silkCanvas.getBoundingClientRect().top < innerHeight;
      if (visible && !reduceMotion && !frame) frame = requestAnimationFrame(render);
      if (!visible && frame) { cancelAnimationFrame(frame); frame = 0; }
    };
    document.addEventListener('visibilitychange', onVisibility);
    cleanup.push(() => {
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      if (frame) cancelAnimationFrame(frame);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    });
  };
  initSilk();

  const initScrollMotion = () => {
    if (reduceMotion || !window.gsap || !window.ScrollTrigger || !intro || !work || !stage) return;
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const lines = [...intro.querySelectorAll('.intro-title span')];
      const movement = window.matchMedia('(max-width: 760px)').matches ? [7, 13, 9] : [18, 34, 24];
      lines.forEach((line, index) => {
        if (index === 0) return;
        gsap.to(line, {
          x: movement[index] ?? 20,
          ease: 'none',
          scrollTrigger: {
            trigger: intro,
            start: 'top 58%',
            end: 'bottom 42%',
            scrub: .7,
            invalidateOnRefresh: true
          }
        });
      });

      const paragraph = intro.querySelector('.intro-copy > p');
      const statItems = [...intro.querySelectorAll('.intro-stats > div')];
      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: intro.querySelector('.intro-detail-row'),
          start: 'top 76%',
          end: 'top 44%',
          toggleActions: 'play none none reverse'
        }
      });
      if (paragraph) introTimeline.fromTo(paragraph, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .65, ease: 'power2.out' });
      if (statItems.length) introTimeline.fromTo(statItems, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .44, stagger: .12, ease: 'power2.out' }, paragraph ? '-=.1' : 0);

      const cards = [...work.querySelectorAll('.project-grid--figma .project')];
      cards.forEach((project, index) => {
        project.classList.add('motion-managed');
        const visual = project.querySelector('.project-visual');
        const metadata = project.querySelector('.project-tags');
        const title = project.querySelector('.case-card-caption h2');
        const columnDelay = index % 2 ? 5 : 0;
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: `top ${86 - columnDelay}%`,
            end: `top ${58 - columnDelay}%`,
            scrub: .55,
            invalidateOnRefresh: true
          }
        });
        if (visual) timeline.fromTo(visual, { autoAlpha: 0, y: 36, scale: .975 }, { autoAlpha: 1, y: 0, scale: 1, duration: .72, ease: 'power2.out' });
        if (metadata) timeline.fromTo(metadata, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .34, ease: 'power2.out' }, .38);
        if (title) timeline.fromTo(title, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .34, ease: 'power2.out' }, .55);
      });

    }, document.body);
    ScrollTrigger.refresh();
    document.fonts?.ready?.then(() => {
      positionThread();
      ScrollTrigger.refresh();
    });
    cleanup.push(() => context.revert());
  };
  initScrollMotion();

  window.addEventListener('pagehide', () => cleanup.forEach((dispose) => dispose()), { once: true });
})();
