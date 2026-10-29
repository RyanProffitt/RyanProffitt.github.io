// Builds tag filters for the posts in blog.html from each post's tag buttons.

(function () {
  const container = document.getElementById("posts");
  const filters = document.getElementById("filters");
  const posts = [...container.querySelectorAll(".post")];

  function postTags(post) {
    return [...post.querySelectorAll(".tags .tag")].map((t) => t.dataset.tag);
  }

  function setFilter(tag) {
    filters.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b.dataset.tag === tag));
    posts.forEach((post) => {
      post.hidden = tag !== "all" && !postTags(post).includes(tag);
    });
  }

  const all = [...new Set(posts.flatMap(postTags))].sort();
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

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("button.tag[data-tag]");
    if (!btn) return;
    setFilter(btn.dataset.tag);
    if (!filters.contains(btn)) filters.scrollIntoView({ block: "center" });
  });
})();
