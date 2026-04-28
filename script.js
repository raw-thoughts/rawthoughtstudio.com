// subtle parallax: orbs drift toward the cursor
const orbs = document.querySelector(".orbs");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (orbs && !reduce) {
  let tx = 0, ty = 0, cx = 0, cy = 0;

  window.addEventListener("pointermove", (e) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    tx = nx * 24;
    ty = ny * 18;
  }, { passive: true });

  const tick = () => {
    cx += (tx - cx) * 0.04;
    cy += (ty - cy) * 0.04;
    orbs.style.setProperty("--mx", cx.toFixed(2) + "px");
    orbs.style.setProperty("--my", cy.toFixed(2) + "px");
    requestAnimationFrame(tick);
  };
  tick();
}
