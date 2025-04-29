function openModal(modalId) {
    const container = document.getElementById("modals-container");
  
    // Sprawdź, czy modal już istnieje
    if (!document.getElementById(modalId)) {
      fetch(`modals/${modalId}.html`)
        .then(res => res.text())
        .then(html => {
          container.innerHTML += html; // wstaw modal do kontenera
          document.getElementById(modalId).style.display = "block";
        })
        .catch(err => console.error("Błąd ładowania modala:", err));
    } else {
      document.getElementById(modalId).style.display = "block";
    }
  }
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }
  
  window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }