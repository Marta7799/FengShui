function openModal(modalId) {
  const container = document.getElementById("modals-container");

  // Sprawdź, czy modal już istnieje
  if (!document.getElementById(modalId)) {
    fetch(`modals/${modalId}.html`)
      .then((res) => res.text())
      .then((html) => {
        // Wstaw modal do kontenera
        container.innerHTML += html;

        // Po załadowaniu modala, znajdź go w DOM-ie
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.style.display = "block"; // Ustaw modal na widoczny

          // Dodaj nasłuchiwanie na zamknięcie modala po załadowaniu
          const closeButton = modal.querySelector(".close");
          if (closeButton) {
            closeButton.addEventListener("click", function () {
              closeModal(modalId);
            });
          }
        }
      })
      .catch((err) => console.error("Błąd ładowania modala:", err));
  } else {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block"; // Ustaw modal na widoczny, jeśli już istnieje
    }
  }
}

// Funkcja zamykająca modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none"; // Ukryj modal
  }
}

// Zamykanie modala po kliknięciu poza modalem
window.onclick = function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(function (modal) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};
