// Canvas animation. Returns a cleanup function for unmount or preference changes.
export function startSandLogo(cv, logoSrc, quiet = false) {
    const ctx = cv.getContext('2d');
    const img = new Image();
    const started = performance.now();
    const startDelayMs = 1000;
    let raf = 0, disposed = false, complete = false, grains = [];
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const drawFinal = () => { ctx.clearRect(0, 0, cv.width, cv.height); ctx.drawImage(img, 0, 0, cv.width, cv.height); };
    const size = () => {
      if (!img.naturalWidth || disposed) return;
      const w = Math.min(cv.parentElement.clientWidth, 1000);
      const ratio = Math.min(devicePixelRatio || 1, 2);
      cv.width = Math.round(w * ratio); cv.height = Math.round(w * 243 / 1500 * ratio);
      if (complete || media.matches || quiet) { complete = true; cancelAnimationFrame(raf); drawFinal(); return; }
      const sample = document.createElement('canvas');
      sample.width = cv.width; sample.height = cv.height;
      const sc = sample.getContext('2d', { willReadFrequently: true });
      sc.drawImage(img, 0, 0, cv.width, cv.height);
      const pixels = sc.getImageData(0, 0, cv.width, cv.height).data;
      const step = Math.max(2, Math.round(ratio * (w < 600 ? 3 : 2.5)));
      grains = [];
      for (let y = 0; y < cv.height; y += step) for (let x = 0; x < cv.width; x += step) {
        const i = (y * cv.width + x) * 4;
        if (pixels[i + 3] < 45) continue;
        grains.push({ x, y, step, delay: (1 - y / cv.height) * 1800 + Math.random() * 450,
          drift: (Math.random() - .5) * cv.width * .16, phase: Math.random() * 6.28,
          color: `rgba(${pixels[i]},${pixels[i+1]},${pixels[i+2]},${pixels[i+3]/255})` });
      }
      // Start the first visible grain at the requested delay, regardless of transparent image padding.
      const firstGrainDelay = grains.reduce((min, grain) => Math.min(min, grain.delay), Infinity);
      for (const grain of grains) grain.delay -= firstGrainDelay;
    };
    const frame = now => {
      const t = now - started - startDelayMs;
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const g of grains) {
        const p = Math.min(1, Math.max(0, (t - g.delay) / 950));
        if (!p) continue;
        const loose = 1 - p, settle = Math.sin(p * Math.PI);
        ctx.fillStyle = g.color;
        ctx.fillRect(g.x + g.drift * loose + Math.sin(p * 13 + g.phase) * settle * 7,
          g.y + (cv.height - g.y) * loose - settle * 12, g.step + .5, g.step + .5);
      }
      // Blend the settled grain mosaic into the exact original texture.
      const finish = Math.min(1, Math.max(0, (t - 3200) / 550));
      if (finish) { ctx.globalAlpha = finish; ctx.drawImage(img, 0, 0, cv.width, cv.height); ctx.globalAlpha = 1; }
      if (finish === 1) { complete = true; drawFinal(); return; }
      raf = requestAnimationFrame(frame);
    };
    img.onload = () => { size(); if (!complete) raf = requestAnimationFrame(frame); };
    img.src = logoSrc;
    const ro = new ResizeObserver(size); ro.observe(cv.parentElement);
    const motion = () => { if (media.matches && img.naturalWidth) { complete = true; cancelAnimationFrame(raf); drawFinal(); } };
    media.addEventListener('change', motion);
    return () => { disposed = true; cancelAnimationFrame(raf); ro.disconnect(); media.removeEventListener('change', motion); img.onload = null; };
}
