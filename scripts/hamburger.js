function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  if (navLinks) {
    navLinks.classList.toggle('open');
  } else {
    console.error('Element #nav-links nie został znaleziony');
  }
}