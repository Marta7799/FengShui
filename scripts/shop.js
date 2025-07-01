emailjs.init("uljso8O4U8lcFMz3c");

document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  let cartList = null;
  let totalEl = null;
  let checkoutButton = null;
  let bankTransferInfo = null;
  let userEmailInput = null;
  let confirmOrderButton = null;

  function generateOrderId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  function initElements() {
    cartList = document.getElementById("cart");
    totalEl = document.getElementById("total");
    checkoutButton = document.getElementById("checkout");
    bankTransferInfo = document.getElementById("bank-transfer-info");
    userEmailInput = document.getElementById("user-email");
    confirmOrderButton = document.getElementById("confirm-order");

    if (
      !cartList ||
      !totalEl ||
      !checkoutButton ||
      !bankTransferInfo ||
      !userEmailInput ||
      !confirmOrderButton
    ) {
      console.error("Brak niezbędnych elementów w DOM.");
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

    // Ukryj info o przelewie i email, bo to po zamówieniu ma się pokazać
    bankTransferInfo.style.display = "none";
    userEmailInput.value = "";
  }

  function sendCustomerEmail(email, orderId, cart, total) {
    const orderDetails = cart
      .map((item) => `${item.name} – ${item.price} zł`)
      .join("\n");

    const emailData = {
      to_email: email,
      subject: "Potwierdzenie Twojego zamówienia w sklepie White Lotus",
      order_id: orderId,
      orders: orderDetails,
      shipping: "0",
      tax: "0",
      total: total.toFixed(2),
      email: email,
    };

    return emailjs.send("service_3dv4j7k", "template_hc9wtp2", emailData);
  }

  function sendAdminEmail(email, orderId, cart, total) {
    const orderDetails = cart
      .map((item) => `${item.name} – ${item.price} zł`)
      .join("\n");

    const emailData = {
      to_email: "whitelotus.8@yahoo.com", // Twój e-mail admina
      subject: "Nowe zamówienie w sklepie White Lotus",
      order_id: orderId,
      orders: orderDetails,
      total: total.toFixed(2),
      email: email,
    };

    return emailjs.send("service_3dv4j7k", "template_8t0252c", emailData);
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

      if (!initElements()) return;

      bankTransferInfo.style.display = "block";
    }

    if (e.target && e.target.id === "confirm-order") {
      const email = userEmailInput.value.trim();
      if (!email) {
        alert("Podaj poprawny adres e-mail.");
        return;
      }

      const total = parseFloat(totalEl.textContent);
      const orderId = generateOrderId();

      Promise.all([
        sendCustomerEmail(email, orderId, cart, total),
        sendAdminEmail(email, orderId, cart, total),
      ])
        .then(() => {
          alert(
            "Dziękujemy za zamówienie! Dane do przelewu zostały wysłane na Twój e-mail."
          );
          cart.length = 0;
          renderCart();
          bankTransferInfo.style.display = "none";
        })
        .catch((err) => {
          console.error("Błąd podczas wysyłania e-maili:", err);
          alert(
            "Wystąpił błąd podczas potwierdzania zamówienia. Spróbuj ponownie."
          );
        });
    }
  });

  window.renderCart = renderCart;
});
