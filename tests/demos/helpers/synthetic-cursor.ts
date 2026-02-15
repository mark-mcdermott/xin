/**
 * Synthetic cursor — injected into the Electron page DOM so it appears
 * in Playwright's video recording. Provides smooth animation and click feedback.
 */

/** Script to inject the cursor element into the page */
export const CURSOR_INJECT_SCRIPT = `
(() => {
  if (document.getElementById('__demo-cursor')) return;

  const container = document.createElement('div');
  container.id = '__demo-cursor';
  container.style.cssText = [
    'position: fixed',
    'top: 0',
    'left: 0',
    'width: 24px',
    'height: 24px',
    'z-index: 999999',
    'pointer-events: none',
    'transform: translate(-40px, -40px)',
  ].join(';');

  // macOS-style pointer arrow
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '24');
  svg.setAttribute('height', '24');
  svg.style.filter = 'drop-shadow(1px 2px 2px rgba(0,0,0,0.35))';

  const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  arrow.setAttribute('d', 'M 2 2 L 2 19 L 7.5 13.5 L 12.5 21 L 15.5 19.5 L 10.5 12 L 18 12 Z');
  arrow.setAttribute('fill', 'white');
  arrow.setAttribute('stroke', 'black');
  arrow.setAttribute('stroke-width', '1.5');
  arrow.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(arrow);
  container.appendChild(svg);

  // Click ripple (hidden until triggered)
  const ripple = document.createElement('div');
  ripple.id = '__demo-cursor-ripple';
  ripple.style.cssText = [
    'position: absolute',
    'top: 3px',
    'left: 3px',
    'width: 0',
    'height: 0',
    'border-radius: 50%',
    'background: rgba(59, 130, 246, 0.35)',
    'transform: translate(-50%, -50%)',
    'pointer-events: none',
    'opacity: 0',
  ].join(';');
  container.appendChild(ripple);

  document.body.appendChild(container);
})();
`;

/**
 * Build a script that animates the cursor from its current position
 * to (tx, ty) using easeOutBack for a natural feel.
 */
export function buildMoveScript(tx: number, ty: number, durationMs: number): string {
  return `
    new Promise(resolve => {
      const cursor = document.getElementById('__demo-cursor');
      if (!cursor) { resolve(undefined); return; }

      const style = cursor.style;
      const match = style.transform.match(/translate\\(([\\d.e+-]+)px,\\s*([\\d.e+-]+)px\\)/);
      const sx = match ? parseFloat(match[1]) : 0;
      const sy = match ? parseFloat(match[2]) : 0;
      const dx = ${tx} - sx;
      const dy = ${ty} - sy;
      const duration = ${durationMs};
      const start = performance.now();

      function easeOutBack(t) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      }

      function frame(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutBack(progress);
        const x = sx + dx * eased;
        const y = sy + dy * eased;
        style.transform = 'translate(' + x + 'px, ' + y + 'px)';

        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          // Settle to exact target
          style.transform = 'translate(${tx}px, ${ty}px)';
          resolve(undefined);
        }
      }
      requestAnimationFrame(frame);
    });
  `;
}

/** Script that plays the click ripple animation */
export const CLICK_RIPPLE_SCRIPT = `
  new Promise(resolve => {
    const ripple = document.getElementById('__demo-cursor-ripple');
    if (!ripple) { resolve(undefined); return; }

    // Reset
    ripple.style.transition = 'none';
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    ripple.style.opacity = '0.6';
    ripple.offsetHeight; // force reflow

    // Animate out
    ripple.style.transition = 'all 300ms ease-out';
    ripple.style.width = '40px';
    ripple.style.height = '40px';
    ripple.style.opacity = '0';
    setTimeout(() => resolve(undefined), 300);
  });
`;
