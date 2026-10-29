// Builds tag filters for the project cards in projects.html from each card's tags.

(function () {
  const container = document.getElementById("projects");
  const filters = document.getElementById("filters");
  const cards = [...container.querySelectorAll(".card")];

  function cardTags(card) {
    return [...card.querySelectorAll(".tags .tag")].map((t) => t.textContent.trim().toLowerCase());
  }

  const all = [...new Set(cards.flatMap(cardTags))].sort();
  if (all.length < 2) return;

  ["all", ...all].forEach((t, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = i === 0 ? "tag active" : "tag";
    btn.dataset.tag = t;
    btn.textContent = t;
    filters.appendChild(btn);
  });
  filters.hidden = false;

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tag]");
    if (!btn) return;
    filters.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
    const tag = btn.dataset.tag;
    cards.forEach((card) => {
      card.hidden = tag !== "all" && !cardTags(card).includes(tag);
    });
  });
})();
