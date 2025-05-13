emailjs.init("uljso8O4U8lcFMz3c");

document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  let cartList = null;
  let totalEl = null;
  let checkoutButton = null;

  function initElements() {
    cartList = document.getElementById("cart");
    totalEl = document.getElementById("total");
    checkoutButton = document.getElementById("checkout");

    if (!cartList || !totalEl || !checkoutButton) {
      console.error(
        "Nie znaleziono elementów koszyka, sumy lub przycisku zamówienia."
      );
      return false;
    }
    return true;
  }

  function renderCart() {
    if (!initElements()) return;

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

    const paypalContainer = document.getElementById("paypal-button-container");
    if (paypalContainer) {
      paypalContainer.innerHTML = "";
    }
  }

  function sendOrderEmail(cart, total) {
    const orderDetails = cart
      .map((item) => `${item.name} – ${item.price} zł`)
      .join("\n");

    const emailContent = `
  Nowe zamówienie:
  ${orderDetails}
  
  Suma: ${total.toFixed(2)} zł
    `;

    const emailData = {
      to_email: "whitelotus.8@yahoo.com",
      subject: "Nowe zamówienie z Twojego sklepu",
      message: emailContent,
    };

    console.log("Email data:", emailData);

    emailjs
      .send("service_3dv4j7k", "template_a8row8p", emailData)
      .then((response) => {
        console.log("Email wysłany!", response);
      })
      .catch((err) => {
        console.error("Błąd wysyłania e-maila", err);
      });
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

      const total = parseFloat(totalEl.textContent);
      if (total > 0) {
        updatePayPalButton(total);
      }
    }
  });

  window.renderCart = renderCart;

  function updatePayPalButton(total) {
    const paypalContainer = document.getElementById("paypal-button-container");
    if (!paypalContainer) return;

    paypalContainer.innerHTML = "";

    if (total === 0) return;

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

            sendOrderEmail(cart, total); // ⬅ Wysyłka e-maila po zatwierdzeniu płatności

            cart.length = 0;
            renderCart();
          });
        },
      })
      .render("#paypal-button-container");
  }
});
