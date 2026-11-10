// Update background opacity from document scroll depth.
export function startDeepSea(deep) {
    const sea = document.getElementById('sea');
    const page = document.getElementById('page');
    let raf = 0, seaTop = 0, range = 1;
    const measure = () => { seaTop = sea.offsetTop; range = Math.max(1, page.clientHeight - window.innerHeight); schedule(); };
    const update = () => {
      raf = 0;
      const entry = Math.min(1, Math.max(0, (window.scrollY - seaTop * .35) / Math.max(1, seaTop * .65)));
      const depth = Math.min(1, window.scrollY / range);
      deep.style.opacity = (entry * (.35 + depth * .65)).toFixed(3);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    const ro = new ResizeObserver(measure); ro.observe(page);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
    };
}
