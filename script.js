(function () {
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');

  let stars = [];
  let width = 0;
  let height = 0;
  let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let animationId = null;

  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    .matches;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initStars();
  }

  function initStars() {
    const density = 0.0015; // stars per pixel
    const targetCount = Math.floor(width * height * density);

    stars = new Array(targetCount).fill(0).map(() => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const base = 0.2 + Math.random() * 0.8; // base opacity
      const radius = Math.random() < 0.85 ? Math.random() * 1.2 + 0.4 : Math.random() * 2.2 + 1.2;
      const speed = 0.6 + Math.random() * 1.4; // twinkle speed
      const phase = Math.random() * Math.PI * 2;
      return { x, y, base, radius, speed, phase };
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // subtle gradient glow at horizon
    const grad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.8,
      height * 0.05,
      width * 0.5,
      height * 1.0,
      height * 0.7
    );
    grad.addColorStop(0, 'rgba(80,100,180,0.06)');
    grad.addColorStop(1, 'rgba(10,15,30,0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // draw stars
    for (const s of stars) {
      const t = performance.now() / 1000;
      const twinkle = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
      const alpha = s.base * (0.35 + 0.65 * twinkle);

      // slight color variation
      const hue = 210 + Math.sin((s.x + s.y) * 0.002) * 10; // around blueish
      ctx.fillStyle = `hsla(${hue}, 70%, 80%, ${alpha})`;

      // soft circle
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();

      // occasional sparkle
      if (twinkle > 0.95 && s.radius > 1.2) {
        ctx.globalAlpha = alpha * 0.6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  function start() {
    resize();
    if (!prefersReduce) {
      draw();
    } else {
      // one static frame for reduced motion
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        ctx.fillStyle = `hsla(210, 70%, 80%, ${s.base})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  window.addEventListener('resize', () => {
    resize();
  });

  window.addEventListener('visibilitychange', () => {
    if (document.hidden && animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    } else if (!document.hidden && !prefersReduce) {
      draw();
    }
  });

  start();
})();
