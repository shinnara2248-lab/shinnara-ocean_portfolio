// Scroll-driven beach-to-ocean transition.
export function startDiveTransition(stage, quiet = false) {
    const hero = stage.firstElementChild;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0, progress = null, previousTime = 0;
    const update = now => {
      raf = 0;
      // The visual transition follows the hero's height, independently of its compact layout spacer.
      // Dividing by the short sticky spacer made a small wheel movement lift the whole ocean at once.
      const distance = Math.max(1, hero.offsetHeight * .95);
      const raw = Math.min(1, Math.max(0, -stage.getBoundingClientRect().top / distance));
      const target = raw * raw * (3 - 2 * raw);
      const dt = Math.min(40, previousTime ? now - previousTime : 16.7);
      previousTime = now;
      if (progress === null || reduced.matches || quiet) progress = target;
      else progress += (target - progress) * (1 - Math.exp(-dt / 115));
      const settled = Math.abs(target - progress) < .0002;
      if (settled) progress = target;
      stage.style.setProperty('--dive', progress);
      stage.style.setProperty('--wave-rise', `${-progress * hero.offsetHeight * .68}px`);
      if (!settled) raf = requestAnimationFrame(update);
    };
    const schedule = () => {
      if (!raf) { previousTime = 0; raf = requestAnimationFrame(update); }
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', schedule);
    };
}
