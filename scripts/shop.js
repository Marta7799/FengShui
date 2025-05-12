document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  let cartList = null;
  let totalEl = null;
  let checkoutButton = null;

  function initElements() {
    cartList = document.getElementById("cart");
    totalEl = document.getElementById("total");
    checkoutButton = document.getElementById("checkout");
  }

  function renderCart() {
    initElements();
    if (!cartList || !totalEl) {
      console.log("Nie znaleziono elementów koszyka lub sumy.");
      return;
    }

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} – ${item.price} zł`;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Usuń";
      removeBtn.classList.add("remove-item");
      removeBtn.dataset.index = index;

      li.appendChild(removeBtn);
      cartList.appendChild(li);
      total += item.price;
    });

    totalEl.textContent = total.toFixed(2);
  }

  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("add-to-cart")) {
      const product = e.target.closest(".product");
      if (!product) return;

      const name = product.dataset.name;
      const price = parseFloat(product.dataset.price);
      if (!name || isNaN(price)) return;

      cart.push({ name, price });
      renderCart();
    }

    if (e.target && e.target.classList.contains("remove-item")) {
      const index = parseInt(e.target.dataset.index);
      if (!isNaN(index)) {
        cart.splice(index, 1);
        renderCart();
      }
    }

    if (e.target && e.target.id === "checkout") {
      if (cart.length === 0) {
        alert("Koszyk jest pusty!");
        return;
      }
      alert("Dziękujemy za zamówienie!");
      cart.length = 0;
      renderCart();
    }
  });

  // Globalne udostępnienie renderCart (dla modal.js itd.)
  window.renderCart = renderCart;
});
