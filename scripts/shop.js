// Koszyk i elementy interfejsu — będą dostępne dopiero po załadowaniu modala
const cart = [];

function renderCart() {
  const cartList = document.getElementById("cart");
  const totalEl = document.getElementById("total");

  if (!cartList || !totalEl) {
    console.warn("Nie znaleziono wymaganych elementów.");
    return;
  }

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} – ${item.price} zł`;
    cartList.appendChild(li);
    total += item.price;
  });

  totalEl.textContent = total.toFixed(2);
}

document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("add-to-cart")) {
    const product = e.target.closest(".product");
    if (!product) return;

    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);
    if (!name || isNaN(price)) return;

    cart.push({ name, price });
    renderCart();
  }
});

// Obsługa przycisku "Zamów" (delegacja zdarzenia)
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "checkout") {
    if (cart.length === 0) {
      alert("Koszyk jest pusty!");
    } else {
      alert("Dziękujemy za zamówienie!");
      cart.length = 0;
      renderCart();
    }
  }
});
