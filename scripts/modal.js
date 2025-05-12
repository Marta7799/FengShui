function openModal(modalId) {
  const container = document.getElementById("modals-container");

  if (!document.getElementById(modalId)) {
    fetch(`modals/${modalId}.html`)
      .then((res) => res.text())
      .then((html) => {
        container.innerHTML += html;

        const modal = document.getElementById(modalId);
        if (modal) {
          modal.style.display = "block";
          console.log("Modal został załadowany i wyświetlony.");

          // Poczekaj aż modal się doda do DOM, a następnie uruchom renderCart
          setTimeout(() => {
            const cartList = document.getElementById("cart");
            const totalEl = document.getElementById("total");
            const checkout = document.getElementById("checkout");

            console.log("cartList:", cartList);
            console.log("totalEl:", totalEl);
            console.log("checkout:", checkout);

            if (typeof renderCart === "function") {
              renderCart();
            } else {
              console.warn("renderCart nie jest zdefiniowane.");
            }
          }, 100);
        }
      })
      .catch((err) => {
        console.error("Błąd ładowania modala:", err);
      });
  } else {
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}

window.onclick = function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(function (modal) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};
