const container = document.getElementById("crypto-container");

let allCoins = [];
let currentCoins = [];

async function loadCoins() {
  container.innerHTML = "Loading...";

  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=45&page=1&sparkline=false"
    );

    const data = await res.json();

    allCoins = data;
    currentCoins = data;

    renderCoins(currentCoins);

  } catch {
    container.innerHTML = "Error loading data";
  }
}

function getFav() {
  return JSON.parse(localStorage.getItem("fav")) || [];
}

function saveFav(data) {
  localStorage.setItem("fav", JSON.stringify(data));
}

function toggleFav(coin) {
  let fav = getFav();

  const exists = fav.find(c => c.id === coin.id);

  if (exists) {
    fav = fav.filter(c => c.id !== coin.id);
  } else {
    fav.push(coin);
  }

  saveFav(fav);
  renderCoins(currentCoins);
}

function createCard(coin) {
  const fav = getFav();
  const isFav = fav.find(c => c.id === coin.id);

  const card = document.createElement("div");
  card.className = "card";

  const changeClass =
    coin.price_change_percentage_24h >= 0 ? "positive" : "negative";

  card.innerHTML = `
    <div class="star">${isFav ? "⭐" : "☆"}</div>
    <img src="${coin.image}">
    <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
    <p>$${coin.current_price}</p>
    <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
    <p class="${changeClass}">
      ${coin.price_change_percentage_24h.toFixed(2)}%
    </p>
  `;

  card.querySelector(".star").onclick = () => toggleFav(coin);

  return card;
}

function renderCoins(coins) {
  container.innerHTML = "";

  if (coins.length === 0) {
    container.innerHTML = "No results";
    return;
  }

  coins.forEach(coin => {
    container.appendChild(createCard(coin));
  });
}

document.getElementById("search").addEventListener("input", () => {
  const value = document.getElementById("search").value.toLowerCase();

  currentCoins = allCoins.filter(coin =>
    coin.name.toLowerCase().includes(value) ||
    coin.symbol.toLowerCase().includes(value)
  );

  renderCoins(currentCoins);
});

document.getElementById("filter").addEventListener("change", () => {
  const type = document.getElementById("filter").value;

  let filtered = [...allCoins];

  if (type === "cheap") {
    filtered = filtered.filter(c => c.current_price < 100);
  } else if (type === "expensive") {
    filtered = filtered.filter(c => c.current_price > 1000);
  } else if (type === "market") {
    filtered.sort((a, b) => b.market_cap - a.market_cap);
  } else if (type === "gainers") {
    filtered.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  } else if (type === "losers") {
    filtered.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
  }

  currentCoins = filtered;
  renderCoins(currentCoins);
});

document.getElementById("sort").addEventListener("change", () => {
  const sort = document.getElementById("sort").value;

  let sorted = [...currentCoins];

  if (sort === "price-high") {
    sorted.sort((a, b) => b.current_price - a.current_price);
  } else if (sort === "price-low") {
    sorted.sort((a, b) => a.current_price - b.current_price);
  } else if (sort === "market-high") {
    sorted.sort((a, b) => b.market_cap - a.market_cap);
  }

  currentCoins = sorted;
  renderCoins(currentCoins);
});

const themeBtn = document.getElementById("theme-btn");

themeBtn.onclick = () => {
  document.body.classList.toggle("dark-mode");

  themeBtn.innerText = document.body.classList.contains("dark-mode")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
};

loadCoins();