# 🚀 Crypto Tracker

A simple and interactive Crypto Tracker web app that allows users to view live cryptocurrency data, search coins, sort them, apply filters, and mark favorites.

---

## ✨ Features

* 🔍 Search cryptocurrencies by name or symbol
* 📊 Sort coins by:

  * Price (High → Low / Low → High)
  * Market Cap
* 🎛️ Filter coins:

  * Cheap coins (< $100)
  * Expensive coins (> $1000)
  * High market cap
  * Top gainers / losers
* ⭐ Add/remove coins to Favorites
* ⭐ Favorites stored using localStorage
* 🌙 Dark mode toggle
* 📱 Responsive design

---

## 🛠️ Tech Stack

* HTML
* CSS
* JavaScript (Vanilla JS)
* CoinGecko API

---

## 📂 Project Structure

```
crypto-tracker/
│
├── index.html
├── favorites.html
├── style.css
├── script.js
└── favorites.js
```

---

## ⚙️ How to Run

1. Download or clone the repository
2. Open the folder in VS Code
3. Install **Live Server** extension
4. Right-click `index.html` → Open with Live Server

---

## 🌐 API Used

* CoinGecko API
  https://www.coingecko.com/en/api

---

## 💡 How It Works

* Data is fetched from CoinGecko API
* Coins are rendered dynamically using JavaScript
* Favorites are stored in browser localStorage
* Filtering, sorting, and searching are handled on the frontend

---

