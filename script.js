// Particle Grid Canvas Background
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const nodes = [];
for (let i = 0; i < 40; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  });
}

function drawNodes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  nodes.forEach(n => {
    n.x += n.vx;
    n.y += n.vy;

    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

    ctx.beginPath();
    ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 242, 254, 0.4)";
    ctx.fill();
  });

  requestAnimationFrame(drawNodes);
}
drawNodes();

// Search & Tab Filtering Logic
const searchInput = document.getElementById("repo-search");
const tabBtns = document.querySelectorAll(".tab-btn");
const cards = document.querySelectorAll(".repo-card");

let activeCategory = "all";

function filterRepos() {
  const query = searchInput.value.toLowerCase().trim();

  cards.forEach(card => {
    const category = card.getAttribute("data-category");
    const name = card.querySelector(".repo-name").textContent.toLowerCase();
    const desc = card.querySelector(".repo-desc").textContent.toLowerCase();
    const tags = Array.from(card.querySelectorAll(".repo-tags span")).map(s => s.textContent.toLowerCase()).join(" ");

    const matchesCategory = activeCategory === "all" || category === activeCategory;
    const matchesSearch = !query || name.includes(query) || desc.includes(query) || tags.includes(query);

    if (matchesCategory && matchesSearch) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", filterRepos);

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.getAttribute("data-category");
    filterRepos();
  });
});
