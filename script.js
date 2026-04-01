const container = document.getElementById("crypto-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageNum = document.getElementById("page-num");
const themeBtn = document.getElementById("theme-btn");

let coinsData = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 30;

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeBtn.textContent = "🌙 Dark Mode";
  } else {
    themeBtn.textContent = "☀️ Light Mode";
  }
});

async function fetchCoins() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=150&page=1"
    );

    if (!res.ok) throw new Error("API error");

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid data");
    }

    coinsData = data;
    updateUI();

  } catch (err) {
    console.warn("API failed → using fallback");

    coinsData = [
      { name: "Bitcoin", current_price: 68000, market_cap: 1300000000000, image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
      { name: "Ethereum", current_price: 3800, market_cap: 450000000000, image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png" },
      { name: "Solana", current_price: 150, market_cap: 65000000000, image: "https://assets.coingecko.com/coins/images/4128/large/solana.png" },

      ...Array.from({ length: 100 }, (_, i) => ({
        name: `Demo Coin ${i + 1}`,
        current_price: Math.floor(Math.random() * 1000),
        market_cap: Math.floor(Math.random() * 1000000000),
        image: "https://via.placeholder.com/50"
      }))
    ];

    updateUI();
  }
}


function displayCoins(data) {
  container.innerHTML = "";

  data.forEach(coin => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${coin.image}" width="50">
      <h2>${coin.name}</h2>
      <p>💰 $${coin.current_price}</p>
      <p>📊 $${coin.market_cap}</p>
    `;

    container.appendChild(card);
  });
}


function updateUI() {
  const totalPages = Math.ceil(coinsData.length / ITEMS_PER_PAGE);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = coinsData.slice(start, start + ITEMS_PER_PAGE);

  displayCoins(paginatedItems);

  pageNum.innerText = `${currentPage} / ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}


prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateUI();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < Math.ceil(coinsData.length / ITEMS_PER_PAGE)) {
    currentPage++;
    updateUI();
  }
});


fetchCoins();