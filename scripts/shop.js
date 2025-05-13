document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  let cartList = null;
  let totalEl = null;
  let checkoutButton = null;

  // Funkcja inicjalizująca elementy
  function initElements() {
    cartList = document.getElementById("cart");
    totalEl = document.getElementById("total");
    checkoutButton = document.getElementById("checkout");

    // Sprawdzenie, czy elementy istnieją
    if (!cartList || !totalEl || !checkoutButton) {
      console.error(
        "Nie znaleziono elementów koszyka, sumy lub przycisku zamówienia."
      );
      return false;
    }
    return true;
  }

  // Funkcja renderująca koszyk
  function renderCart() {
    if (!initElements()) {
      return; // Zatrzymaj renderowanie, jeśli elementy nie zostały poprawnie załadowane
    }

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

    // Ukrywamy przycisk PayPal na początku
    const paypalContainer = document.getElementById("paypal-button-container");
    if (paypalContainer) {
      paypalContainer.innerHTML = "";
    }
  }

  // Obsługa kliknięć
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

      // Pokazanie przycisków PayPal po kliknięciu "Zamów"
      const total = parseFloat(totalEl.textContent);
      if (total > 0) {
        updatePayPalButton(total);
      }
    }
  });

  // Globalne udostępnienie renderCart (np. dla modal.js)
  window.renderCart = renderCart;

  // ==== PAYPAL ====
  function updatePayPalButton(total) {
    const paypalContainer = document.getElementById("paypal-button-container");
    if (!paypalContainer) return;

    paypalContainer.innerHTML = ""; // Wyczyść stare przyciski PayPal

    if (total === 0) return;

    // Dodanie przycisków PayPal
    paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total.toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            alert("Dziękujemy, " + details.payer.name.given_name + "!");
            cart.length = 0;
            renderCart();

            // Możliwość wysłania podsumowania zamówienia na e-mail
          });
        },
      })
      .render("#paypal-button-container");
  }
});
