document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest(".more-link");
    if (link) {
      e.preventDefault();
      const modalId = link.getAttribute("data-modal-id");
      openDetailModal(modalId);
      return; // ważne, żeby nie wykonać dalszych warunków
    }

    if (e.target.classList.contains("close")) {
      e.target.closest(".modal").classList.add("hidden");
      return;
    }

    const modal = e.target.closest(".modal");
    if (modal && e.target === modal) {
      modal.classList.add("hidden");
      return;
    }
  });

  function openDetailModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
      modal.classList.remove("hidden");
    }
  }
});
