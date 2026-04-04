// Token kezelés
const getToken = () => localStorage.getItem("token");
const setToken = (token) => localStorage.setItem("token", token);
const removeToken = () => localStorage.removeItem("token");

// Auth funkciók
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  if (res.ok) {
    setToken(data.token);
    window.location.href = "/";
  } else {
    const err = document.getElementById("error-msg");
    err.style.display = "block";
    err.textContent = data.message;
  }
}

async function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();

  if (res.ok) {
    const success = document.getElementById("success-msg");
    success.style.display = "block";
    success.textContent = "Sikeres regisztráció! Átirányítás...";
    setTimeout(() => (window.location.href = "/auth/login"), 1500);
  } else {
    const err = document.getElementById("error-msg");
    err.style.display = "block";
    err.textContent = data.message;
  }
}

// Növények betöltése
async function loadPlants() {
  const container = document.getElementById("plants-container");
  if (!container) return;

  const res = await fetch("/api/plants");
  const plants = await res.json();

  if (plants.length === 0) {
    container.innerHTML =
      '<p class="text-muted">Nincsenek növények az adatbázisban.</p>';
    return;
  }

  container.innerHTML = plants
    .map(
      (plant) => `
    <div class="col-md-4 plant-card" data-type="${plant.type}" data-difficulty="${plant.difficulty}">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title text-success">${plant.name}</h5>
          <p class="text-muted fst-italic">${plant.latin_name || ""}</p>
          <p class="card-text">${plant.description || ""}</p>
          <span class="badge bg-success">${plant.type}</span>
          <span class="badge bg-secondary">${plant.difficulty}</span>
        </div>
        <div class="card-footer text-muted">
          💧 ${plant.watering_frequency || "N/A"} &nbsp; ☀️ ${plant.sunlight || "N/A"}
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  // Keresés és szűrés
  document.getElementById("search")?.addEventListener("input", filterPlants);
  document
    .getElementById("filter-type")
    ?.addEventListener("change", filterPlants);
  document
    .getElementById("filter-difficulty")
    ?.addEventListener("change", filterPlants);
}

function filterPlants() {
  const search = document.getElementById("search").value.toLowerCase();
  const type = document.getElementById("filter-type").value;
  const difficulty = document.getElementById("filter-difficulty").value;

  document.querySelectorAll(".plant-card").forEach((card) => {
    const name = card.querySelector(".card-title").textContent.toLowerCase();
    const cardType = card.dataset.type;
    const cardDifficulty = card.dataset.difficulty;

    const matchSearch = name.includes(search);
    const matchType = !type || cardType === type;
    const matchDifficulty = !difficulty || cardDifficulty === difficulty;

    card.style.display =
      matchSearch && matchType && matchDifficulty ? "block" : "none";
  });
}

// Termékek betöltése
async function loadProducts() {
  const container = document.getElementById("products-container");
  if (!container) return;

  const res = await fetch("/api/shop/products");
  const products = await res.json();

  if (products.length === 0) {
    container.innerHTML = '<p class="text-muted">Nincsenek termékek.</p>';
    return;
  }

  container.innerHTML = products
    .map(
      (product) => `
    <div class="col-md-4 product-card" data-category="${product.category}">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title text-success">${product.name}</h5>
          <p class="card-text">${product.description || ""}</p>
          <span class="badge bg-success">${product.category}</span>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
          <strong class="text-success">${product.price} Ft</strong>
          <span class="text-muted">Készlet: ${product.stock}</span>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  document
    .getElementById("filter-category")
    ?.addEventListener("change", filterProducts);
}

function filterProducts() {
  const category = document.getElementById("filter-category").value;
  document.querySelectorAll(".product-card").forEach((card) => {
    card.style.display =
      !category || card.dataset.category === category ? "block" : "none";
  });
}

// Wiki cikkek betöltése
async function loadWiki() {
  const container = document.getElementById("wiki-container");
  if (!container) return;

  const res = await fetch("/api/wiki");
  const articles = await res.json();

  if (articles.length === 0) {
    container.innerHTML = '<p class="text-muted">Nincsenek cikkek.</p>';
    return;
  }

  container.innerHTML = articles
    .map(
      (article) => `
    <div class="col-md-4 wiki-card" data-category="${article.category}">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title text-success">${article.title}</h5>
          <span class="badge bg-success mb-2">${article.category}</span>
          <p class="card-text">${article.content.substring(0, 100)}...</p>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  document
    .getElementById("filter-category")
    ?.addEventListener("change", filterWiki);
}

function filterWiki() {
  const category = document.getElementById("filter-category").value;
  document.querySelectorAll(".wiki-card").forEach((card) => {
    card.style.display =
      !category || card.dataset.category === category ? "block" : "none";
  });
}

// Tápanyag kalkulátor
async function calculate() {
  const plantId = document.getElementById("plantId").value;
  const potCount = document.getElementById("pot-count").value;
  const area = document.getElementById("area").value;

  const body = { plantId: parseInt(plantId) };
  if (potCount) body.pot_count = parseInt(potCount);
  if (area) body.area = parseFloat(area);

  const res = await fetch("/api/nutrients/calculate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  const resultCard = document.getElementById("result-card");
  const resultContent = document.getElementById("result-content");
  resultCard.style.display = "block";

  if (res.ok) {
    resultContent.innerHTML = `
      <table class="table">
        <tr><td>🌿 Nitrogén</td><td><strong>${data.result.nitrogen} g/l</strong></td></tr>
        <tr><td>🌿 Foszfor</td><td><strong>${data.result.phosphorus} g/l</strong></td></tr>
        <tr><td>🌿 Kálium</td><td><strong>${data.result.potassium} g/l</strong></td></tr>
        <tr><td>💧 Vízigény</td><td><strong>${data.result.watering_amount} l/hét</strong></td></tr>
        <tr><td>⚗️ pH tartomány</td><td><strong>${data.result.ph_min} – ${data.result.ph_max}</strong></td></tr>
        <tr><td>🧴 Trágyázás</td><td><strong>${data.result.fertilizing_frequency}</strong></td></tr>
      </table>
    `;
  } else {
    resultContent.innerHTML = `<p class="text-danger">${data.message}</p>`;
  }
}

// Oldalbetöltéskor
document.addEventListener("DOMContentLoaded", () => {
  loadPlants();
  loadProducts();
  loadWiki();
});
