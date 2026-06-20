// Raw Thoughts® — Variation A (Editorial). Static, dependency-free.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- Live New York clock --------------------------------------
(function clock() {
  const els = document.querySelectorAll("[data-clock]");
  if (!els.length) return;
  const tick = () => {
    const s = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
      hour12: false,
    });
    els.forEach((el) => (el.textContent = s));
  };
  tick();
  setInterval(tick, 1000);
})();

// ---- Reveal on scroll -----------------------------------------
(function reveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => io.observe(el));
})();

// ---- Assemble mailto links at runtime (anti-harvest) ----------
// The full address never appears in the HTML source; bots that scrape
// static markup (or don't run JS) never see a `user@domain` string.
(function mailto() {
  document.querySelectorAll("[data-mailto]").forEach((el) => {
    const addr = el.dataset.user + "@" + el.dataset.domain;
    const subject = el.dataset.subject
      ? "?subject=" + encodeURIComponent(el.dataset.subject)
      : "";
    el.setAttribute("href", "mailto:" + addr + subject);
  });
})();

// ---- Magnetic buttons -----------------------------------------
(function magnetic() {
  if (reduce) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.28}px, ${y * 0.42}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0,0)";
    });
  });
})();

// ---- Lerp'd custom cursor -------------------------------------
(function cursor() {
  const cur = document.getElementById("cursor");
  if (!cur || reduce || window.matchMedia("(pointer: coarse)").matches) return;

  let mx = window.innerWidth / 2,
    my = window.innerHeight / 2,
    cx = mx,
    cy = my,
    cscale = 1,
    tscale = 1;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  document.querySelectorAll("a, button, [data-magnetic], .gtile").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      tscale = 2.5;
      cur.style.opacity = "0.3";
    });
    el.addEventListener("mouseleave", () => {
      tscale = 1;
      cur.style.opacity = "0.55";
    });
  });

  (function loop() {
    cx += (mx - cx) * 0.2;
    cy += (my - cy) * 0.2;
    cscale += (tscale - cscale) * 0.18;
    cur.style.transform = `translate(${cx}px, ${cy}px) scale(${cscale})`;
    requestAnimationFrame(loop);
  })();
})();
