document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
const menuToggle = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");
if (menuToggle ) {
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle('is-active');
  navLinks.classList.toggle("active");
});
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
        menuToggle.classList.remove('is-active');
      navLinks.classList.remove("active");
    }
  });
});
