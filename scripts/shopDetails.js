// Funkcja otwierająca modal na podstawie id
function openDetailModal(modalId) {
  const modal = document.getElementById(`modal-${modalId}`);
  if (modal) {
    modal.classList.remove("hidden");
  }
}

// Dodaj event listener do każdego close-button, aby zamykać modal
document.querySelectorAll(".modal .close").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".modal").classList.add("hidden");
  });
});

// Zamknij modal po kliknięciu poza zawartością modal-content
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
