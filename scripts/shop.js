document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  const cartList = document.getElementById("cart");
  const totalEl = document.getElementById("total");
  const checkoutButton = document.getElementById("checkout");

  // Sprawdź, czy elementy są dostępne przed próbą używania
  if (!cartList || !totalEl) {
    console.log("Nie znaleziono elementów koszyka lub sumy.");
    return;
  }

  // Delegacja zdarzenia: kliknięcie w dowolny przycisk "Dodaj do koszyka"
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
  });

  // Funkcja renderująca koszyk
  function renderCart() {
    if (!cartList || !totalEl) {
      console.log("Nie znaleziono elementów koszyka lub sumy.");
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

  // Opóźnienie, aby upewnić się, że modal jest widoczny
  setTimeout(() => {
    // Sprawdź, czy elementy są dostępne, jeśli nie, to zapisz błąd
    if (!cartList || !totalEl) {
      console.log("Nie znaleziono elementów koszyka lub sumy.");
      return;
    }

    // Zainicjuj koszyk
    renderCart();
  }, 500); // Poczekaj 500 ms na załadowanie modal

  // Obsługa przycisku "Zamów"
  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Koszyk jest pusty!");
        return;
      }

      alert("Dziękujemy za zamówienie!");
      cart.length = 0;
      renderCart();
    });
  }
});
