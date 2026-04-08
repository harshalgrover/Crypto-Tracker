const container = document.getElementById("crypto-container");

function getFav() {
  return JSON.parse(localStorage.getItem("fav")) || [];
}

function render() {
  const fav = getFav();

  if (fav.length === 0) {
    container.innerHTML = "No favorites yet";
    return;
  }

  container.innerHTML = "";

  fav.forEach(c => {
    const card = document.createElement("div");
    card.className = "card small-card";

    card.innerHTML = `
      <img src="${c.image}">
      <h3>${c.name}</h3>
      <p>$${c.current_price}</p>
    `;

    container.appendChild(card);
  });
}

render();