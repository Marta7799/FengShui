document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.getElementById("nav-links");
  const header = document.querySelector(".custom-header");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    header.classList.toggle("no-bg");
  });
});
