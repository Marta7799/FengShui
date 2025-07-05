function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    console.log(`Zamykam modal ${modalId}`);
    modal.style.display = "none";
  } else {
    console.warn(`Modal o id ${modalId} nieznaleziony.`);
  }
}
function openModal(modalId, event) {
  if (event) event.preventDefault();
  const container = document.getElementById("modals-container");

  const showModal = () => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
      if (modalId === "qiMenModal" && typeof initQiMen === "function") {
        initQiMen();
      }
      const closeButton = modal.querySelector(".close");
      if (closeButton) {
        closeButton.onClick = () => closeModal(modalId);
      }
    }
  };

  if (!document.getElementById(modalId)) {
    fetch(`modals/${modalId}.html`)
      .then((res) => res.text())
      .then((html) => {
        container.innerHTML += html;

        // Ładuj skrypt modalny (np. qiMen)
        if (modalId === "qiMenModal") {
          const script = document.createElement("script");
          script.src = "scripts/qiMen.js";
          script.onload = () => {
            if (typeof initQiMen === "function") {
              initQiMen();
            }
            showModal(); // <- WAŻNE: po załadowaniu HTML i JS
          };
          document.body.appendChild(script);
        } else {
          showModal(); // <- dla innych modali
        }
      })
      .catch((err) => {
        console.error("Błąd ładowania modala:", err);
      });
  } else {
    showModal();
  }
}
