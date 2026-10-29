// Shared behaviour for every page: mobile menu, footer year, scroll reveal.

(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");

  if (header && toggle) {
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  window.observeReveal = function (root) {
    const items = (root || document).querySelectorAll(".reveal:not(.visible)");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((el) => io.observe(el));
  };

  window.observeReveal();
})();
