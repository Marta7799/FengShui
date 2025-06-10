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

    if (!modal) {
      // Jeśli modala nie ma, spróbuj go załadować dynamicznie
      fetch(`modals/shopDetails/${modalId}.html`)
        .then((res) => res.text())
        .then((html) => {
          const container = document.getElementById("modals-container");
          container.insertAdjacentHTML("beforeend", html);

          // Teraz modal powinien istnieć, spróbuj go wybrać ponownie
          const loadedModal = document.getElementById(`modal-${modalId}`);
          if (loadedModal) {
            loadedModal.classList.remove("hidden");
          } else {
            console.error("Nie udało się załadować modala");
          }
        })
        .catch((err) => {
          console.error("Błąd ładowania modala:", err);
        });
    } else {
      modal.classList.remove("hidden");
    }
  }
});
// document.addEventListener("DOMContentLoaded", () => {
//   document.body.addEventListener("click", (e) => {
//     const link = e.target.closest(".more-link");
//     if (link) {
//       e.preventDefault();
//       const modalId = link.getAttribute("data-modal-id");
//       const modal = document.getElementById(`modal-${modalId}`);
//       if (modal) {
//         modal.classList.remove("hidden");
//       } else {
//         console.warn(
//           `Modal o ID modal-${modalId} nie został znaleziony w DOM.`
//         );
//       }
//       return;
//     }

//     // Zamknięcie po kliknięciu w "x"
//     if (e.target.classList.contains("close")) {
//       const parentModal = e.target.closest(".modal");
//       if (parentModal) {
//         parentModal.classList.add("hidden");
//       }
//       return;
//     }

//     // Zamknięcie po kliknięciu w tło
//     const modal = e.target.closest(".modal");
//     if (modal && e.target === modal) {
//       modal.classList.add("hidden");
//     }
//   });
// });
