const container = document.getElementById("crypto-container");

let allCoins = [];

async function loadCoins() {
  container.innerHTML = "Loading...";

  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=45&page=1&sparkline=false"
    );

    if (!res.ok) throw new Error();

    const data = await res.json();

    allCoins = data;
    renderCoins(allCoins);

  } catch {
    container.innerHTML = "Error loading data";
  }
}

function createCard(coin) {
  const card = document.createElement("div");
  card.className = "card";

  const changeClass =
    coin.price_change_percentage_24h >= 0 ? "positive" : "negative";

  card.innerHTML = `
    <img src="${coin.image}">
    <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
    <p>$${coin.current_price}</p>
    <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
    <p class="${changeClass}">
      ${coin.price_change_percentage_24h.toFixed(2)}%
    </p>
  `;

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

  const filtered = allCoins.filter(coin =>
    coin.name.toLowerCase().includes(value) ||
    coin.symbol.toLowerCase().includes(value)
  );

  renderCoins(filtered);
});

document.getElementById("sort").addEventListener("change", () => {
  const sort = document.getElementById("sort").value;

  let sorted = [...allCoins];

  if (sort === "price-high") {
    sorted.sort((a, b) => b.current_price - a.current_price);
  } else if (sort === "price-low") {
    sorted.sort((a, b) => a.current_price - b.current_price);
  } else if (sort === "market-high") {
    sorted.sort((a, b) => b.market_cap - a.market_cap);
  } else if (sort === "gainers") {
    sorted.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  } else if (sort === "losers") {
    sorted.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
  }

  renderCoins(sorted);
});

const themeBtn = document.getElementById("theme-btn");

themeBtn.onclick = () => {
  document.body.classList.toggle("dark-mode");

  themeBtn.innerText = document.body.classList.contains("dark-mode")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
};

loadCoins();